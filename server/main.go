package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/ChimeraCoder/anaconda"
	"github.com/PuerkitoBio/goquery"
)

var client Client

type Program struct {
	Title       string   `json:"title"`
	Schedule    Schedule `json:"schedule"`
	Description string   `json:"description"`
	Genre       Genre    `json:"genre"`
	Station     string   `json:"station"`
}

type Schedule struct {
	Begin time.Time `json:"begin"`
	Until time.Time `json:"begin"`
}

type Genre struct {
	Category    string `json:"category"`
	SubCategory string `json:"subcategory"`
}

func tweetTimelineHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/dashboard" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "POST":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		defer r.Body.Close()
		log.Println("hello from golang in post method")
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&client.UserData)
		if err != nil {
			log.Fatal("decoder error")
			panic(err)
		}
		log.Println(client.UserData["id_str"])
		w.Header().Set("Server", "A Go Web Server")
		w.WriteHeader(200)
	case "GET":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		defer r.Body.Close()
		log.Println("hello from golang in get method in dashboard")
		encoder := json.NewEncoder(w)
		encoder.Encode(getTimeline(client.UserData["id_str"]))
		w.Header().Set("Server", "A Go Web Server")
	default:
		fmt.Fprintf(w, "Sorry, only POST methods are supported.")
	}
}

func programsHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/dashboard/programs" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "GET":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		defer r.Body.Close()
		log.Println("hello from golang in get method in dashboard programs")
		encoder := json.NewEncoder(w)
		// log.Println(client.UserData["id_str"])
		// encoder.Encode(getTVPrograms(client.UserData["id_str"]))
		encoder.Encode(getTVPrograms("千鳥"))
		w.Header().Set("Server", "A Go Web Server")
	}
}

func main() {
	fs := http.FileServer(http.Dir("../dist"))
	api := anaconda.NewTwitterApiWithCredentials("973805197523906560-p5UX08QTzbYsIlbudD9MlqL7GyYaoal", "YDNsHJ8dpDXIEUAQotqH4SsE6wwlGt0V2GFbDZKKToM7f", "q7sRsAMlYGfFubENPogmgM4S0", "s3wUvTHeVJAiC8fjYCgDALi2yegrNd3ZvakXe5zGjUO3uKdXWY")

	client = Client{TwitterAPI: api}
	http.Handle("/", fs)
	http.Handle("/search", &client)
	http.HandleFunc("/dashboard", tweetTimelineHandler)
	http.HandleFunc("/dashboard/programs", programsHandler)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func getTimeline(idStr string) *[]anaconda.Tweet {
	queryMap := url.Values{}
	queryMap.Set("user_id", idStr)
	twieets, err := client.TwitterAPI.GetUserTimeline(queryMap)
	if err != nil {
		log.Println("error")
	}
	return &twieets
}

func getTVPrograms(key string) *[]Program {
	doc, err := goquery.NewDocument("https://tv.yahoo.co.jp/search/?q=" + key)
	if err != nil {
		fmt.Print("document not found. ")
		os.Exit(1)
	}

	programs := []Program{}
	doc.Find(".programlist li").Each(func(i int, s *goquery.Selection) {
		program := Program{}
		year := 2019
		var month time.Month
		var day, bhour, uhour, bmin, umin int
		loc, err := time.LoadLocation("Asia/Tokyo")
		if err != nil {
			log.Fatal(err)
		}
		s.Find(".leftarea p").Each(func(i int, se *goquery.Selection) {
			a := se.Find("em").Text()
			if strings.Contains(a, "/") {
				d := strings.Split(a, "/")
				m, err := strconv.Atoi(d[0])
				if err != nil {
					log.Fatal(err)
				}
				month = time.Month(m)
				da, err := strconv.Atoi(d[1])
				if err != nil {
					log.Fatal(err)
				}
				day = da
			} else if strings.Contains(a, "～") {
				schedule := strings.Split(a, "～")

				bt := strings.Split(schedule[0], ":")

				bh, err := strconv.Atoi(bt[0])
				if err != nil {
					log.Fatal(err)
				}
				bhour = bh

				bm, err := strconv.Atoi(bt[1])
				if err != nil {
					log.Fatal(err)
				}
				bmin = bm

				ut := strings.Split(schedule[1], ":")
				uh, err := strconv.Atoi(ut[0])
				if err != nil {
					log.Fatal(err)
				}
				uhour = uh

				um, err := strconv.Atoi(ut[1])
				if err != nil {
					log.Fatal(err)
				}
				umin = um
			}
			program.Schedule.Begin = time.Date(year, month, day, bhour, bmin, 0, 0, loc)
			program.Schedule.Until = time.Date(year, month, day, uhour, umin, 0, 0, loc)
		})
		s.Find(".rightarea > p").Each(func(i int, se *goquery.Selection) {
			switch i {
			case 0:
				program.Title = se.Find("a").Text()
			case 1:
				se.Find("span").Each(func(i int, sel *goquery.Selection) {
					if i == 0 {
						program.Station = sel.Text()
					} else if i == 1 {
						a := strings.Split(sel.Text(), "：")
						b := strings.Split(a[1], " - ")
						program.Genre.Category = b[0]
						program.Genre.SubCategory = b[1]
					}
				})
			case 2:
				program.Description = se.Text()
			}
		})
		programs = append(programs, program)
	})
	return &programs
}

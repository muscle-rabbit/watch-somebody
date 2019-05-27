package api

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
)

type program struct {
	Title       string   `json:"title"`
	Schedule    schedule `json:"schedule"`
	Description string   `json:"description"`
	Genre       genre    `json:"genre"`
	Station     string   `json:"station"`
}

type schedule struct {
	Begin time.Time `json:"begin"`
	Until time.Time `json:"until"`
}

type genre struct {
	Category    string `json:"category"`
	SubCategory string `json:"subcategory"`
}

func (api *Api) GetTVPrograms(key string) *[]program {
	fmt.Println("hello from programs method and key is: ", key)
	doc, err := goquery.NewDocument("https://tv.yahoo.co.jp/search/?q=" + key)
	if err != nil {
		fmt.Print("document not found. ")
		os.Exit(1)
	}

	programs := []program{}
	doc.Find(".programlist li").Each(func(i int, s *goquery.Selection) {
		program := program{}
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
	fmt.Println("this is programs", programs)
	return &programs
}

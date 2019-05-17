package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"

	"github.com/ChimeraCoder/anaconda"
)

var client Client

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
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

func main() {
	fs := http.FileServer(http.Dir("../dist"))
	api := anaconda.NewTwitterApiWithCredentials("973805197523906560-p5UX08QTzbYsIlbudD9MlqL7GyYaoal", "YDNsHJ8dpDXIEUAQotqH4SsE6wwlGt0V2GFbDZKKToM7f", "q7sRsAMlYGfFubENPogmgM4S0", "s3wUvTHeVJAiC8fjYCgDALi2yegrNd3ZvakXe5zGjUO3uKdXWY")

	client = Client{TwitterAPI: api}
	http.Handle("/", fs)
	http.Handle("/search", &client)
	http.HandleFunc("/dashboard", dashboardHandler)

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

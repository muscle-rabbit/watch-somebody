package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/ChimeraCoder/anaconda"
)

var client Client

func postHandler(w http.ResponseWriter, r *http.Request) {
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
		var v map[string]string
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&v)
		if err != nil {
			panic(err)
		}
	}
	fmt.Fprintf(w, "Sorry, only POST methods are supported.")
}

func main() {
	fs := http.FileServer(http.Dir("../dist"))
	api := anaconda.NewTwitterApiWithCredentials("973805197523906560-p5UX08QTzbYsIlbudD9MlqL7GyYaoal", "YDNsHJ8dpDXIEUAQotqH4SsE6wwlGt0V2GFbDZKKToM7f", "q7sRsAMlYGfFubENPogmgM4S0", "s3wUvTHeVJAiC8fjYCgDALi2yegrNd3ZvakXe5zGjUO3uKdXWY")

	client = Client{TwitterAPI: api}
	http.Handle("/", fs)
	http.Handle("/dashboard", &client)
	// http.HandleFunc("/dashboard", postHandler)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

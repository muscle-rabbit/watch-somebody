package main

import (
	"log"
	"net/http"

	"github.com/ChimeraCoder/anaconda"
)

var client Client

func main() {
	fs := http.FileServer(http.Dir("../dist"))
	api := anaconda.NewTwitterApiWithCredentials("973805197523906560-p5UX08QTzbYsIlbudD9MlqL7GyYaoal", "YDNsHJ8dpDXIEUAQotqH4SsE6wwlGt0V2GFbDZKKToM7f", "q7sRsAMlYGfFubENPogmgM4S0", "s3wUvTHeVJAiC8fjYCgDALi2yegrNd3ZvakXe5zGjUO3uKdXWY")

	client = Client{TwitterAPI: api}
	http.Handle("/", fs)
	http.Handle("/search", &client)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

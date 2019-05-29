package api

import (
	"log"
	"net/url"

	"github.com/PuerkitoBio/goquery"
)

type News struct {
	Header   Header `json:"header"`
	Contents string `json:"contents"`
}

type Header struct {
	Title   string `json:"title"`
	Updated string `json:"updated"`
	Link    string `json:"link"`
}

func (api *Api) GetNews(query string) *[]News {
	queryEscape := url.QueryEscape(query)
	url := "https://news.google.com/news/?hl=ja&ned=us&ie=UTF-8&oe=UTF-8&output=atom&num=30&hl=ja&gl=JP&ceid=JP:ja&q=" + queryEscape
	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	newsList := []News{}
	doc.Find("entry").Each(func(i int, s *goquery.Selection) {
		if i >= 30 {
			return
		}
		news := News{}
		link, exists := s.Find("link").Attr("href")
		if exists {
			news.Header.Link = link
		}
		news.Header.Title = s.Find("title").Text()
		news.Header.Updated = s.Find("updated").Text()
		news.Contents = s.Find("content").Text()
		newsList = append(newsList, news)
	})
	return &newsList
}

package api

import (
	"log"
	"net/url"

	"github.com/ChimeraCoder/anaconda"
)

func (api *Api) GetTimeline(screenName string) *[]anaconda.Tweet {
	queryMap := url.Values{}
	queryMap.Set("screen_name", screenName)
	twieets, err := api.Twitter.GetUserTimeline(queryMap)
	if err != nil {
		log.Println("error")
	}
	return &twieets
}

func (api *Api) GetUsers(query string) *[]anaconda.User {
	users, err := api.Twitter.GetUserSearch(query, nil)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
	return &users
}

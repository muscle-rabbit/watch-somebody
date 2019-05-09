package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/ChimeraCoder/anaconda"
)

type Client struct {
	// http.Client
	TwitterAPI *anaconda.TwitterApi
	UserData   map[string]string
}

func (*Client) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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
			log.Fatal("decoder error")
			panic(err)
		}
		// client.UserData["target"] = v["target"]
		// log.Println(v["target"])

		getTargetTwitterID(v["target"])

	}
	fmt.Fprintf(w, "Sorry, only POST methods are supported.")
}

func getTargetTwitterID(target string) {
	var verifiedUserIDs []int64
	users, err := client.TwitterAPI.GetUserSearch(target, nil)
	if err != nil {
		log.Fatal("twitter eror")
		panic(err)
	}

	for _, user := range users {
		if user.Verified == true {
			verifiedUserIDs = append(verifiedUserIDs, user.Id)
		}
	}

	for _, id := range verifiedUserIDs {
		log.Println(id)
	}
	// value := gjson.Get(strings(json))

}

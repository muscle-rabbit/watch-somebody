package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/ChimeraCoder/anaconda"
	"github.com/gorilla/mux"
	"github.com/shinyamizuno1008/watch-somebody/server/database"
	"github.com/shinyamizuno1008/watch-somebody/server/env"
)

func main() {
	api := anaconda.NewTwitterApiWithCredentials(env.Keys.Access_token, env.Keys.Access_token_secret, env.Keys.Consumer_key, env.Keys.Consumer_secret)
	db, err := sql.Open("mysql", "root:shinbee1@/watch_somebody")
	r := mux.NewRouter()

	if err != nil {
		panic(err.Error()) // Just for example purpose. You should use proper error handling instead of panic
	}
	defer db.Close()
	Handler := database.NewHandler(db, api)
	s := r.PathPrefix("/page").Subrouter()
	s.HandleFunc("/search/", Handler.SearchHandler)
	s.HandleFunc("/dashboard/fetch/{fetch}/", Handler.DashboardHandler)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../dist")))
	http.Handle("/", r)

	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

package main

import (
	"database/sql"
	"net/http"

	"github.com/ChimeraCoder/anaconda"
	"github.com/gorilla/mux"
	"github.com/shinyamizuno1008/watch-somebody/server/DB"
	"github.com/shinyamizuno1008/watch-somebody/server/env"
	"google.golang.org/appengine"
)

func main() {
	api := anaconda.NewTwitterApiWithCredentials(env.Keys.Access_token, env.Keys.Access_token_secret, env.Keys.Consumer_key, env.Keys.Consumer_secret)
	db, err := sql.Open("mysql", env.DBUserInfo.User+":"+env.DBUserInfo.Password+"@/watch_somebody")
	r := mux.NewRouter()

	if err != nil {
		panic(err.Error()) // Just for example purpose. You should use proper error handling instead of panic
	}
	defer db.Close()
	Handler := DB.NewHandler(db, api)
	s := r.PathPrefix("/page").Subrouter()
	s.HandleFunc("/search/", Handler.SearchHandler)
	s.HandleFunc("/dashboard/fetch/{fetch}/", Handler.DashboardHandler)
	r.HandleFunc("/livness_check/", Handler.HealthChecker)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	http.Handle("/", r)

	appengine.Main()
}

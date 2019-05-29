package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/ChimeraCoder/anaconda"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/shinyamizuno1008/watch-somebody/server/api"
)

type Handler struct {
	DB  *DB
	Api *api.Api
}

type client struct {
	userData map[string]string
}

func NewHandler(db *sql.DB, tapi *anaconda.TwitterApi) *Handler {
	return &Handler{DB: &DB{db}, Api: &api.Api{Twitter: tapi}}
}

func (h *Handler) SearchHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/page/search/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "POST":
		userData := map[string]string{}
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		defer r.Body.Close()
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&userData)

		if err != nil {
			log.Fatal("decoder error")
			panic(err)
		}
		h.DB.SetTarget(userData["query"])
		w.Header().Set("Server", "A Go Web Server")
		w.WriteHeader(200)
	case "GET":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		defer r.Body.Close()
		v := r.URL.Query()
		encoder := json.NewEncoder(w)
		encoder.Encode(h.Api.GetUsers(v["q"][0]))
		w.Header().Set("Server", "A Go Web Server")
	default:
		fmt.Fprintf(w, "Sorry, only POST and GET methods are supported.")
	}
}

func (h *Handler) DashboardHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello from dashboardhandler")
	vars := mux.Vars(r)
	fetch := vars["fetch"]
	switch {
	case fetch == "timeline":
		h.TimelineHandler(w, r)
	case fetch == "programs":
		h.ProgramHandler(w, r)
	case fetch == "news":
		h.NewsHanlder(w, r)
	}
}

func (h *Handler) TimelineHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello from timelinehandler")
	if r.URL.Path != "/page/dashboard/fetch/timeline/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "GET":
		log.Println("hello from golang in get method")
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		defer r.Body.Close()
		v := r.URL.Query()
		h.Api.GetTimeline(v["q"][0])
		encoder := json.NewEncoder(w)
		if err := encoder.Encode(h.Api.GetTimeline(v["q"][0])); err != nil {
			log.Fatal(err)
			panic(err)
		}
		log.Println("hello from golang in get method at the end of line.")
		w.Header().Set("Server", "A Go Web Server")
	default:
		fmt.Fprintf(w, "Sorry, only GET methods are supported.")
	}
}

func (h *Handler) ProgramHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/page/dashboard/fetch/programs/" {
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
		v := r.URL.Query()
		encoder := json.NewEncoder(w)
		if err := encoder.Encode(h.Api.GetTVPrograms(v["q"][0])); err != nil {
			log.Fatal(err)
			panic(err)
		}
		w.Header().Set("Server", "A Go Web Server")
	}
}

func (h *Handler) NewsHanlder(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/page/dashboard/fetch/news/" {
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
		v := r.URL.Query()
		encoder := json.NewEncoder(w)
		news := h.Api.GetNews(v["q"][0])
		if err := encoder.Encode(news); err != nil {
			log.Fatal(err)
			panic(err)
		}
		w.Header().Set("Server", "A Go Web Server")
	}
}

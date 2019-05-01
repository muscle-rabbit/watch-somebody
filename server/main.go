package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

func echo(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	switch r.Method {
	case "POST":
		if err := r.ParseForm(); err != nil {
			fmt.Fprintf(w, "ParseForm() err: %v", err)
			return
		}
		fmt.Fprintf(w, "Post from website! r.PostFrom = %v\n", r.PostForm)
		name := r.FormValue("name")
		address := r.FormValue("address")
		fmt.Fprintf(w, "Name = %s\n", name)
		fmt.Fprintf(w, "Address = %s\n", address)
	}
	fmt.Fprintf(w, "Sorry, only POST methods are supported.")
}

func handler(w http.ResponseWriter, r *http.Request) {
	temple := template.Must(template.ParseFiles("../dist/index.html"))
	temple.Execute(w, nil)
}

func main() {
	fs := http.FileServer(http.Dir("../dist"))
	http.Handle("/", fs)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

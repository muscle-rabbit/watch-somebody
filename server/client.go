package main

import "net/http"

type client struct {
	*http.Client
	userData map[string]string
}

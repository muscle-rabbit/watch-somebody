package main

import (
	"net/http"
)

type client struct {
	http.Client
	userData map[string]interface{}
}

func GetClient(target string) client {
	return &client{userData["target"]: target}
}

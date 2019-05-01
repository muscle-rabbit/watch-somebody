package main

import (
	"log"
	"net/http"
	"net/url"

	"github.com/garyburd/go-oauth/oauth"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	c := getConnect()
	callbackURL := "http://localhost:8080/auth/twitter/callback"
	v := url.Values{}
	v.Set("oauth_token", "")
	tc, err := c.RequestTemporaryCredentials(client, callbackURL, v)
	if err != nil {
		log.Fatal(err)
	}
	c.AuthorizationURL(tc, v)
}

func getConnect() *oauth.Client {
	return &oauth.Client{
		TemporaryCredentialRequestURI: "https://api.twitter.com/oauth/request_token",
		ResourceOwnerAuthorizationURI: "https://api.twitter.com/oauth/authorize",
		TokenRequestURI:               "https://api.twitter.com/oauth/access_token",
		Credentials: oauth.Credentials{
			Token:  "q7sRsAMlYGfFubENPogmgM4S0",
			Secret: "s3wUvTHeVJAiC8fjYCgDALi2yegrNd3ZvakXe5zGjUO3uKdXWY",
		},
	}
}

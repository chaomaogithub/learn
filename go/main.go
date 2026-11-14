package main

import (
	"fmt"
	"net/http"
	"log"
	"github.com/chaomaogithub/learn/go/serverconfig"
)

func main() {
	// load configuration
	config, err := serverconfig.loadConfig()
	if err != nil {
		log.Fatalf("Error loading configuration: %v", err)
	}

	// set up yhe HTP server
	mux := http.NewServeMux()

	// set up routes
	mux.

	// server instance
	serverAddr := fmt.Sprintf(":%s", config.ServerPort)
	server := &http.Server{
		Addr: serverAddr,
		Handler: mux,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Server failed %v", err)
	}
}
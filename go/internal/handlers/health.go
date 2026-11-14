package handlers

import (
	"encoding/json"
	"net/http"
)


func (h *Handler) HealthHandler(w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		response := map[string]string{
			"message": "Server is healthy",
		}
		json.NewEncoder(w).Encode(response)
	}
}
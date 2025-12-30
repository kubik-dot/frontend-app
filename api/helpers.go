package helpers

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"
)

type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func HandleError(w http.ResponseWriter, err error, code int) {
	errorResponse := ErrorResponse{
		Code:    code,
		Message: err.Error(),
	}

	jsonError, jsonErr := json.Marshal(errorResponse)
	if jsonErr != nil {
		log.Printf("failed to marshal error response: %v", jsonErr)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_, writeErr := w.Write(jsonError)
	if writeErr != nil {
		log.Printf("failed to write error response: %v", writeErr)
	}
}

func ValidateRequest(w http.ResponseWriter, r *http.Request, expectedMethod string) bool {
	if r.Method != expectedMethod {
		HandleError(w, errors.New("invalid request method"), http.StatusBadRequest)
		return false
	}

	return true
}

func GetRequestTimeout() time.Duration {
	return 10 * time.Second
}

func LogRequest(r *http.Request) {
	log.Printf("request from %s, method: %s, path: %s", r.RemoteAddr, r.Method, r.URL.Path)
}
package models

import "time"

type Ticket struct {
	ID              int       `json:"id"`
	Title           string    `json:"title"`
	Description     string    `json:"description"`
	Priority        string    `json:"priority"`
	Status          string    `json:"status"`
	CreatedAt       time.Time `json:"created_at"`
	Requester_name  string    `json:"requester_name"`
	Requester_email string    `json:"requester_email"`
}

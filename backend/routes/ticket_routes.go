package routes

import (
	"net/http"

	"helpdesk-api/handlers"
)

func RegisterRoutes(
	mux *http.ServeMux,
	ticketHandler *handlers.TicketHandler,
) {
	mux.HandleFunc("POST /tickets", ticketHandler.CreateTicket)
	mux.HandleFunc("GET /tickets", ticketHandler.ReadAllTickets)
	mux.HandleFunc("GET /tickets/{id}", ticketHandler.ReadTicketById)
	mux.HandleFunc("PATCH /tickets/{id}/status", ticketHandler.UpdateTicketStatus)
	mux.HandleFunc("PATCH /tickets/{id}", ticketHandler.UpdateTicketDetails)
	mux.HandleFunc("DELETE /tickets/{id}", ticketHandler.DeleteTicket)
}

package handlers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"

	"helpdesk-api/models"
	"helpdesk-api/service"
)

type TicketHandler struct {
	service *service.TicketService
}

func NewTicketHandler(ticketService *service.TicketService) *TicketHandler {
	return &TicketHandler{service: ticketService}
}

func (h *TicketHandler) CreateTicket(w http.ResponseWriter, r *http.Request) {
	var ticket models.Ticket

	if err := json.NewDecoder(r.Body).Decode(&ticket); err != nil {
		http.Error(w, "Format JSON tidak valid", http.StatusBadRequest)
		return
	}

	if err := h.service.CreateTicket(r.Context(), ticket); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusCreated, map[string]string{
		"message": "Tiket berhasil dibuat",
	})
}

func (h *TicketHandler) ReadAllTickets(w http.ResponseWriter, r *http.Request) {
	tickets, err := h.service.ReadAllTickets(r.Context())
	if err != nil {
		log.Println("Error mengambil tiket:", err)
		http.Error(w, "Gagal mengambil tiket", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, tickets)
}

func (h *TicketHandler) ReadTicketById(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(w, r)
	if !ok {
		return
	}

	ticket, err := h.service.ReadTicketById(r.Context(), id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			http.Error(w, "Tiket tidak ditemukan", http.StatusNotFound)
			return
		}

		if err.Error() == "ID tiket tidak valid" {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		http.Error(w, "Gagal mengambil tiket", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, ticket)
}

func (h *TicketHandler) UpdateTicketStatus(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(w, r)
	if !ok {
		return
	}

	var input struct {
		Status string `json:"status"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Format JSON tidak valid", http.StatusBadRequest)
		return
	}

	err := h.service.UpdateTicketStatus(r.Context(), id, input.Status)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"status":  "success",
		"message": "Status tiket berhasil diperbarui",
	})
}

func (h *TicketHandler) UpdateTicketDetails(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(w, r)
	if !ok {
		return
	}

	var input struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Priority    string `json:"priority"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Format JSON tidak valid", http.StatusBadRequest)
		return
	}

	ticket := models.Ticket{
		ID:          id,
		Title:       input.Title,
		Description: input.Description,
		Priority:    input.Priority,
	}

	err := h.service.UpdateTicketDetails(r.Context(), ticket)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"status":  "success",
		"message": "Detail tiket berhasil diperbarui",
	})
}

func (h *TicketHandler) DeleteTicket(w http.ResponseWriter, r *http.Request) {
	id, ok := parseID(w, r)
	if !ok {
		return
	}

	err := h.service.DeleteTicket(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"status":  "success",
		"message": "Tiket berhasil dihapus",
	})
}

func parseID(w http.ResponseWriter, r *http.Request) (int, bool) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil || id <= 0 {
		http.Error(w, "ID tiket tidak valid", http.StatusBadRequest)
		return 0, false
	}

	return id, true
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

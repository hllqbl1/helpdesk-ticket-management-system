package service

import (
	"context"
	"errors"
	"net/mail"
	"strings"
	"unicode/utf8"

	"helpdesk-api/models"
	"helpdesk-api/repositories"
)

type TicketService struct {
	repo repositories.TicketRepository
}

func NewTicketService(repo repositories.TicketRepository) *TicketService {
	return &TicketService{repo: repo}
}

func (s *TicketService) CreateTicket(
	ctx context.Context,
	ticket models.Ticket,
) error {
	ticket.Requester_name = strings.TrimSpace(ticket.Requester_name)

	nameLength := utf8.RuneCountInString(ticket.Requester_name)
	if nameLength < 2 || nameLength > 100 {
		return errors.New("nama harus terdiri dari 2-100 karakter")
	}

	ticket.Requester_email = strings.TrimSpace(ticket.Requester_email)

	emailLength := utf8.RuneCountInString(ticket.Requester_email)
	if emailLength < 5 || emailLength > 150 {
		return errors.New("email harus terdiri dari 5-150 karakter")
	}

	_, err := mail.ParseAddress(ticket.Requester_email)
	if err != nil {
		return errors.New("format email tidak valid")
	}

	ticket.Title = strings.TrimSpace(ticket.Title)

	titleLength := utf8.RuneCountInString(ticket.Title)
	if titleLength < 5 || titleLength > 150 {
		return errors.New("judul harus terdiri dari 5-150 karakter")
	}

	ticket.Description = strings.TrimSpace(ticket.Description)
	if ticket.Description == "" {
		return errors.New("deskripsi tidak boleh kosong")
	}

	ticket.Priority = "low"

	// Status tiket baru selalu open.
	ticket.Status = "open"

	return s.repo.CreateTicket(ctx, ticket)
}

func (s *TicketService) ReadAllTickets(
	ctx context.Context,
) ([]models.Ticket, error) {
	return s.repo.ReadAllTickets(ctx)
}

func (s *TicketService) ReadTicketById(
	ctx context.Context,
	id int,
) (models.Ticket, error) {
	if id <= 0 {
		return models.Ticket{}, errors.New("ID tiket tidak valid")
	}

	return s.repo.ReadTicketById(ctx, id)
}

func (s *TicketService) UpdateTicketStatus(
	ctx context.Context,
	id int,
	status string,
) error {
	if id <= 0 {
		return errors.New("ID tiket tidak valid")
	}

	status = strings.TrimSpace(status)

	if status != "open" &&
		status != "in_progress" &&
		status != "resolved" {
		return errors.New("status tidak valid")
	}

	return s.repo.UpdateTicketStatus(ctx, id, status)
}

func (s *TicketService) UpdateTicketDetails(
	ctx context.Context,
	ticket models.Ticket,
) error {
	if ticket.ID <= 0 {
		return errors.New("ID tiket tidak valid")
	}

	ticket.Title = strings.TrimSpace(ticket.Title)

	titleLength := utf8.RuneCountInString(ticket.Title)
	if titleLength < 5 || titleLength > 150 {
		return errors.New("judul harus terdiri dari 5-150 karakter")
	}

	ticket.Description = strings.TrimSpace(ticket.Description)
	if ticket.Description == "" {
		return errors.New("deskripsi tidak boleh kosong")
	}

	ticket.Priority = strings.TrimSpace(ticket.Priority)
	if ticket.Priority != "low" &&
		ticket.Priority != "medium" &&
		ticket.Priority != "high" {
		return errors.New("priority tidak valid")
	}

	return s.repo.UpdateTicketDetails(ctx, ticket)
}

func (s *TicketService) DeleteTicket(
	ctx context.Context,
	id int,
) error {
	if id <= 0 {
		return errors.New("ID tiket tidak valid")
	}

	return s.repo.DeleteTicket(ctx, id)
}

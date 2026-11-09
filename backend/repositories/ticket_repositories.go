package repositories

import (
	"context"
	"database/sql"
	"log"

	"helpdesk-api/models"
)

type TicketRepository interface {
	CreateTicket(ctx context.Context, ticket models.Ticket) error
	ReadAllTickets(ctx context.Context) ([]models.Ticket, error)
	ReadTicketById(ctx context.Context, id int) (models.Ticket, error)
	UpdateTicketStatus(ctx context.Context, id int, status string) error
	UpdateTicketDetails(ctx context.Context, ticket models.Ticket) error
	DeleteTicket(ctx context.Context, id int) error
}

type ticketRepository struct {
	db *sql.DB
}

func NewTicketRepository(db *sql.DB) *ticketRepository {
	return &ticketRepository{db: db}
}

func (r *ticketRepository) CreateTicket(
	ctx context.Context,
	ticket models.Ticket,
) error {
	log.Println("1. Mulai INSERT tiket")

	query := `
        INSERT INTO tickets
        (requester_name, requester_email, title, description, priority, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `

	_, err := r.db.ExecContext(
		ctx,
		query,
		ticket.Requester_name,
		ticket.Requester_email,
		ticket.Title,
		ticket.Description,
		ticket.Priority,
		ticket.Status,
	)

	if err != nil {
		log.Println("2. INSERT gagal:", err)
		return err
	}

	log.Println("3. INSERT berhasil")
	return nil
}

func (r *ticketRepository) ReadAllTickets(
	ctx context.Context,
) ([]models.Ticket, error) {
	query := `
		SELECT id, requester_name, requester_email, title,
		       description, priority, status, created_at
		FROM tickets
		ORDER BY id DESC
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	tickets := []models.Ticket{}

	for rows.Next() {
		var ticket models.Ticket

		err := rows.Scan(
			&ticket.ID,
			&ticket.Requester_name,
			&ticket.Requester_email,
			&ticket.Title,
			&ticket.Description,
			&ticket.Priority,
			&ticket.Status,
			&ticket.CreatedAt,
		)
		if err != nil {
			return nil, err
		}

		tickets = append(tickets, ticket)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tickets, nil
}

func (r *ticketRepository) ReadTicketById(
	ctx context.Context,
	id int,
) (models.Ticket, error) {
	var ticket models.Ticket

	query := `
		SELECT id, requester_name, requester_email, title,
		       description, priority, status, created_at
		FROM tickets
		WHERE id = ?
	`

	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&ticket.ID,
		&ticket.Requester_name,
		&ticket.Requester_email,
		&ticket.Title,
		&ticket.Description,
		&ticket.Priority,
		&ticket.Status,
		&ticket.CreatedAt,
	)

	if err != nil {
		return models.Ticket{}, err
	}

	return ticket, nil
}

func (r *ticketRepository) UpdateTicketStatus(
	ctx context.Context,
	id int,
	status string,
) error {
	query := `UPDATE tickets SET status = ? WHERE id = ?`

	_, err := r.db.ExecContext(ctx, query, status, id)
	return err
}

func (r *ticketRepository) UpdateTicketDetails(
	ctx context.Context,
	ticket models.Ticket,
) error {
	query := `
		UPDATE tickets
		SET title = ?, description = ?, priority = ?
		WHERE id = ?
	`

	_, err := r.db.ExecContext(
		ctx,
		query,
		ticket.Title,
		ticket.Description,
		ticket.Priority,
		ticket.ID,
	)
	return err
}

func (r *ticketRepository) DeleteTicket(
	ctx context.Context,
	id int,
) error {
	query := `DELETE FROM tickets WHERE id = ?`

	_, err := r.db.ExecContext(ctx, query, id)
	return err
}

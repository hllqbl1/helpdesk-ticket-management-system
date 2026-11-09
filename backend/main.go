package main

import (
	"log"
	"net/http"

	"helpdesk-api/database"
	"helpdesk-api/handlers"
	"helpdesk-api/middleware"
	"helpdesk-api/repositories"
	"helpdesk-api/routes"
	"helpdesk-api/service"
)

func main() {
	// 1. Koneksi database
	db, err := database.KonekDatabase()
	if err != nil {
		log.Fatal("Gagal koneksi database: ", err)
	}
	defer db.Close()

	log.Println("Koneksi database berhasil")

	// 2. Membuat repository
	repo := repositories.NewTicketRepository(db)

	// 3. Membuat service
	ticketService := service.NewTicketService(repo)

	// 4. Membuat handler
	ticketHandler := handlers.NewTicketHandler(ticketService)

	// 5. Membuat ServeMux
	mux := http.NewServeMux()

	// 6. Mendaftarkan routes
	routes.RegisterRoutes(mux, ticketHandler)

	// 7. Menerapkan middleware CORS
	handler := middleware.CORS(mux)

	// 8. Menjalankan server
	log.Println("Server berjalan di http://localhost:8080")

	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal("Server berhenti: ", err)
	}
}
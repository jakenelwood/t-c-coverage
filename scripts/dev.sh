#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to display help
show_help() {
    echo -e "${YELLOW}Development Script for Twin Cities Coverage${NC}"
    echo ""
    echo "Usage: ./dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       - Start all services (frontend and backend)"
    echo "  stop        - Stop all services"
    echo "  restart     - Restart all services"
    echo "  init        - Initialize database with sample data"
    echo "  clean       - Clean up generated files and dependencies"
    echo "  help        - Show this help message"
}

# Function to start services
start_services() {
    echo -e "${GREEN}Starting services...${NC}"
    
    # Start backend
    docker-compose up -d
    
    # Start frontend
    npm run dev &
    
    echo -e "${GREEN}Services started!${NC}"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:8000"
}

# Function to stop services
stop_services() {
    echo -e "${YELLOW}Stopping services...${NC}"
    
    # Stop backend
    docker-compose down
    
    # Stop frontend (find and kill the process)
    pkill -f "npm run dev"
    
    echo -e "${GREEN}Services stopped!${NC}"
}

# Function to restart services
restart_services() {
    stop_services
    start_services
}

# Function to initialize database
init_db() {
    echo -e "${GREEN}Initializing database...${NC}"
    python scripts/init_db.py
    echo -e "${GREEN}Database initialized!${NC}"
}

# Function to clean up
clean_up() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    
    # Remove node_modules
    rm -rf node_modules
    
    # Remove .next directory
    rm -rf .next
    
    # Remove output directory
    rm -rf output
    
    # Stop and remove containers
    docker-compose down -v
    
    echo -e "${GREEN}Cleanup complete!${NC}"
}

# Main script logic
case "$1" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    init)
        init_db
        ;;
    clean)
        clean_up
        ;;
    help|*)
        show_help
        ;;
esac 
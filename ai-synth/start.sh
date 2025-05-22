#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create it based on .env.example"
  exit 1
fi

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Start the development server
npm run dev 
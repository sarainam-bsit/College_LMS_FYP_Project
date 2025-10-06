#!/bin/bash

# Update package manager
apt-get update -y

# Install Python and pip
apt-get install -y python3 python3-pip

# Move to backend folder
cd backend_lms

# Install requirements
pip3 install -r requirements.txt

# Apply migrations
python3 manage.py migrate

# Collect static files
python3 manage.py collectstatic --noinput

# Run server
python3 manage.py runserver 0.0.0.0:8000

#!/bin/bash

# Go to backend folder
cd backend_lms

# Install dependencies
pip3 install -r requirements.txt

# Run migrations
python3 manage.py migrate

# Collect static files
python3 manage.py collectstatic --noinput

# Run Django server
python3 manage.py runserver 0.0.0.0:$PORT

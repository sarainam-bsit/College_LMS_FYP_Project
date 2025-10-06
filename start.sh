#!/bin/bash

# Backend folder me jao
cd backend_lms

# Python dependencies install karo
pip install -r requirements.txt

# Database migrations run karo
python manage.py migrate

# Static files collect karo (optional)
python manage.py collectstatic --noinput

# Django server start karo Railway port pe
python manage.py runserver 0.0.0.0:$PORT

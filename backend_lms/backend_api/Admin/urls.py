from django.urls import path
from .views import admin_login, verify_otp, resend_otp

urlpatterns = [
    path('login/', admin_login, name='admin-login'),
    path('verify-otp/', verify_otp, name='admin-verify-otp'),
    path('resend-otp/', resend_otp, name='admin-resend-otp'),
]

from django.urls import path
from .views import admin_login, verify_otp, resend_otp, admin_reset_password, admin_forget_password

urlpatterns = [
    path('login/', admin_login, name='admin-login'),
    path('verify-otp/', verify_otp, name='admin-verify-otp'),
    path('resend-otp/', resend_otp, name='admin-resend-otp'),
    path('admin_forget_password/', admin_forget_password, name='admin_forget_password'),
    path('admin_reset_password/', admin_reset_password, name='admin_reset_password'),
]


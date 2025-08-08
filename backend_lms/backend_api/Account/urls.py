from django.urls import path
# from .views import StudentRegisterView 
from . import views
urlpatterns = [
    path('register_api/', views.student_register, name='student_register'),
    path('verify_OTP_api/', views.verify_otp, name='verify_OTP'),
    path('Login_api/', views.login_view, name='Login'),
    
]
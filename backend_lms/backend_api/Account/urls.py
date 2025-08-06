from django.urls import path
# from .views import StudentRegisterView 
from . import views
urlpatterns = [
    path('register_api/', views.student_register, name='student_register'),
    path('verify_OTP/', views.verify_OTP, name='verify_OTP'),
    path('Login/', views.Login, name='Login'),
    
]
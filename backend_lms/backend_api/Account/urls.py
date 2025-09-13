from django.urls import path, include
# from .views import StudentRegisterView 
from rest_framework.routers import DefaultRouter
from . import views
from .views import StudentListAPIView, TeacherViewSet, StudentProfileViewSet, TeacherProfileViewSet, StaffViewSet
router = DefaultRouter()
router.register('studentprofile', StudentProfileViewSet, basename='studentprofile')
router.register('teacherprofile', TeacherProfileViewSet, basename='teacherprofile')
router.register('teacherstaff', StaffViewSet, basename='teacherstaff')

urlpatterns = [
    path('', include(router.urls)),
    path('register_api/', views.student_register, name='student_register'),
    path('verify_OTP_api/', views.verify_otp, name='verify_OTP_api'),
    path('Login_api/', views.login_view, name='Login_api'),
    path('forget_password/', views.forget_password, name='forget_password'),
    path('reset_password/', views.reset_password, name='reset_password'),
    path('students/', StudentListAPIView.as_view(), name='student-list'),
    path('teachers/', TeacherViewSet.as_view(), name='student-list'),
    path("teachers/department/<int:department_id>/", views.get_teachers_by_department, name="teachers-by-department"),   
]
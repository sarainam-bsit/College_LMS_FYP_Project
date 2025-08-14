from django.contrib import admin
from .models import Course
from django.urls import path
from django.http import JsonResponse
from Departments.models import CourseCategories
from django.core.exceptions import ValidationError
# Register your models here.
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ( 'C_Department', 'C_Code', 'C_Title', 'C_Category', 'Teacher')

    
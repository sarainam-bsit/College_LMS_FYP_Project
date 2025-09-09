from django.contrib import admin
from .models import Course


# Register your models here.
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'C_Code', 'C_Title', 'C_Category', 'Teacher')

    
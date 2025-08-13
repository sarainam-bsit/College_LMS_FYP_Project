from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from django.contrib import messages
from .models import Student, Teacher
from admin_extra_buttons.mixins import ExtraButtonsMixin
from admin_extra_buttons.decorators import button

@admin.register(Student)
class StudentAdmin(ExtraButtonsMixin, ImportExportModelAdmin):
    list_display = (
        'id',
        'Student_Name', 
        'Student_Email',
        'Department', 
        'Course_Category', 
        'Reg_No', 
        'Is_Passed', 
        'Is_Registered'
    )
    list_filter = ('Department', 'Course_Category', 'Is_Passed', 'Is_Registered')
    search_fields = ('Student_Name', 'Reg_No')
    
  
@admin.register(Teacher)
class TeacherAdmin(ExtraButtonsMixin, ImportExportModelAdmin):
    list_display = (
        'id',
        'Role', 
        'Teacher_Name',
        'Teacher_Email', 
        'Department',
        
    )
    list_filter = ('Department', 'Teacher_Name')
    search_fields = ('Department', 'Teacher_Name')
    
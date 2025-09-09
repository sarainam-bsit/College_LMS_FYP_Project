from django.contrib import admin
from django.db import models
from .models import Department, CourseCategories
from Account.models import Student, Teacher
from django.core.exceptions import ValidationError
from django.forms import Textarea

# class StudentInline(admin.TabularInline):
#     model = Student
#     fk_name = "Department"
#     fields = ('Student_Name',)
#     extra = 0
# class TeacherInline(admin.TabularInline):
#     model = Teacher
#     fk_name = "Department"
#     fields = ('Teacher_Name',)
#     extra = 0

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'Department_Name', 'Discription', 'teacher_count', 'HOD', 'list_teachers', 'student_count', 'list_students')  # methods yahan add karo
    list_filter = ('Department_Name',)
    search_fields = ('Department_Name', 'HOD')
    # inlines = [StudentInline, TeacherInline] 
    # formfield_overrides = {
    #     models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':40})},
    # }
    
   
    

    def teacher_count(self, obj):
        return obj.teachers.count()
    teacher_count.short_description = 'Number of Teachers'

    def list_teachers(self, obj):
        return ", ".join([t.Teacher_Name for t in obj.teachers.all()])
    list_teachers.short_description = 'Teachers'
    
    def student_count(self, obj):
        categories = CourseCategories.objects.filter(Related_Department=obj)
        return Student.objects.filter(Course_Category__in=categories).count()
    student_count.short_description = 'Number of Students'

    def list_students(self, obj):
        categories = CourseCategories.objects.filter(Related_Department=obj)
        students = Student.objects.filter(Course_Category__in=categories)
        return ", ".join([s.Student_Name for s in students])
    list_students.short_description = 'Students'
    
@admin.register(CourseCategories)
class CourseCategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'Category_Type', 'Category_Name','Related_Department')  # methods yahan add karo

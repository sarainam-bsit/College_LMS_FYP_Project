from django.contrib import admin
from .models import Grade, StudentGradeHistory

# Grade admin
@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ['id', 'Student', 'Course', 'Course_Obtained_Marks', 'Sessional_Obtained_Marks', 'Total_Obtained', 'grade', 'status']



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
        'Program', 
        'Semester', 
        'Reg_No', 
        'Is_Passed', 
        'Is_Registered'
    )
    list_filter = ('Program', 'Semester', 'Is_Passed', 'Is_Registered')
    search_fields = ('Student_Name', 'Reg_No')
    
    @button(label='Promote All Passed Students', change_list=True)
    def promote_all_passed(self, request):
        students = Student.objects.filter(Is_Passed=True).exclude(Semester = '8')
        promoted = 0
        for student in students:
            student.promote_to_next_semester()
            promoted += 1
        if promoted:
            messages.success(request, f"{promoted} student(s) promoted successfully.")
        else:
            messages.warning(request, "No students were promoted (check if they are passed or they are in last semester).")
@admin.register(Teacher)
class TeacherAdmin(ExtraButtonsMixin, ImportExportModelAdmin):
    list_display = (
        'id',
        'Role', 
        'Teacher_Name',
        'Teacher_Email', 
        
    )

    
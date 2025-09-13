from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from admin_extra_buttons.mixins import ExtraButtonsMixin
from .models import Student, Teacher
from Courses.models import CourseCategories

@admin.register(Student)
class StudentAdmin(ExtraButtonsMixin, ImportExportModelAdmin):
    list_display = (
        'id',
        'Student_Name',
        'Student_Email',
        'Course_Category',
        'Reg_No',
        'Fee_Status',
        'Is_Registered',
        'Status',
        'Degree_Status'
    )
    list_filter = ('Course_Category', 'Is_Registered', 'Status', 'Degree_Status')
    search_fields = ('Student_Name', 'Reg_No', 'Degree_Status' )
    actions = ["promote_students"] 

    @admin.action(description="Promote Selected Students")
    def promote_students(modeladmin, request, queryset):
        for student in queryset:
            if not student.Course_Category:
                continue  # skip students without a category

        # 1. If student is passing → promote to next category within same department
            if student.Status == "Pass" or student.Status == "Fail" or student.Status == "Supply":
                next_category = CourseCategories.objects.filter(
                    Related_Department=student.Course_Category.Related_Department,
                    id__gt=student.Course_Category.id
                ).order_by("id").first()

                if next_category:
                    student.Course_Category = next_category
                    student.Status = ""
                    student.Fee_Status = False
                    student.Supply_Courses = '[]'
                    student.Degree_Status = "Running"
                else:
                # Last semester → Degree Complete
                    student.Course_Category = None
                    student.Status = ""
                    student.Fee_Status = False
                    student.Supply_Courses = '[]'
                    student.Degree_Status = "Complete"

                student.save()

        # 2. If student is in last semester (e.g., Semester 8 / Part 2) → Degree Complete
            elif student.Course_Category.Category_Name in ["Semester 8", "Part 2"]:
                student.Course_Category = None
                student.Status = ""
                student.Fee_Status = False
                student.Degree_Status = "Complete"
                student.save()


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

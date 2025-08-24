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
    search_fields = ('Student_Name', 'Reg_No')
    actions = ["promote_students"] 

    @admin.action(description="Promote Selected Students")
    def promote_students(modeladmin, request, queryset):
        for student in queryset:
            # 1. Agar supply courses hain → promote to next semester, status blank
            if student.Status == "Supply" and student.Supply_Courses:
                if student.Course_Category:
                    next_category = CourseCategories.objects.filter(
                        id__gt=student.Course_Category.id
                    ).order_by("id").first()
                    if next_category:
                        student.Course_Category = next_category
                        student.Status = ""  # next semester, signal update karega grades/status
                        student.Degree_Status = "Running"
                    else:
                        # Last semester ho aur courses supply me hain → Degree running, category blank
                        student.Course_Category = None
                        student.Status = ""
                        student.Degree_Status = "Running"
                student.save()
                continue

            # 2. Agar last semester/Part2 hai aur supply courses khali hain → Degree complete
            if student.Course_Category and student.Course_Category.Category_Name in ["Semester 8", "Part 2"]:
                if not student.Supply_Courses:
                    student.Course_Category = None
                    student.Degree_Status = "Complete"
                    student.Status = ""
                    student.save()
                    continue
                else:
                    # Agar supply courses hain last semester me → Degree running
                    student.Degree_Status = "Running"
                    student.Status = "Supply"
                    student.save()
                    continue

            # 3. Agar student pass hai aur next semester available hai → promote
            if student.Status == "Pass":
                if student.Course_Category:
                    next_category = CourseCategories.objects.filter(
                        id__gt=student.Course_Category.id
                    ).order_by("id").first()
                    if next_category:
                        student.Course_Category = next_category
                        student.Status = ""
                        student.Degree_Status = "Running"
                    else:
                        # Last semester complete → Degree complete
                        student.Course_Category = None
                        student.Degree_Status = "Complete"
                        student.Status = ""
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

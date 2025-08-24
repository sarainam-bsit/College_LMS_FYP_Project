from django.contrib import admin
from .models import Timetable

@admin.register(Timetable)
class TimeTableAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_department', 'get_category', 'Course', 'Teacher', 'Day')

    # Department ka naam
    def get_department(self, obj):
        return obj.Course.C_Category.Related_Department.Department_Name if obj.Course and obj.Course.C_Category and obj.Course.C_Category.Related_Department else "-"
    get_department.short_description = 'Department'

    # Category ka naam
    def get_category(self, obj):
        return obj.Course.C_Category.Category_Name if obj.Course and obj.Course.C_Category else "-"
    get_category.short_description = 'Category'

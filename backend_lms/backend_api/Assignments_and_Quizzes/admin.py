from django.contrib import admin
from .models import CourseTask
# # Register your models here.
class CourseTaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_course_code', 'Task_type', 'Title', 'Link', 'Created_at', 'Ended_at')

    def get_course_code(self, obj):
        return f"{obj.Course.C_Code} ({obj.Course.C_Category})"
    get_course_code.short_description = 'Course Info'

admin.site.register(CourseTask, CourseTaskAdmin)
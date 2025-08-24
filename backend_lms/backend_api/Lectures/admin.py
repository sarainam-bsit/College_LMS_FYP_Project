from django.contrib import admin
from .models import Lecture
# # Register your models here.
class LectureAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_course_code', 'Title', 'Date', 'Time')

    def get_course_code(self, obj):
        return obj.Lec_course.C_Code
    get_course_code.short_description = 'Course Code'

admin.site.register(Lecture, LectureAdmin)

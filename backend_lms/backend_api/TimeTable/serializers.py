from rest_framework import serializers
from .models import Timetable

class TimetableSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='Course.C_Category.Category_Name', read_only=True)
    course_code = serializers.CharField(source='Course.C_Code', read_only=True)
    course_name = serializers.CharField(source='Course.C_Title', read_only=True)
    teacher_name = serializers.CharField(source='Teacher.Teacher_Name', read_only=True)
    department_name = serializers.CharField(source='Course.C_Category.Related_Department', read_only=True)

    class Meta:
        model = Timetable
        fields = [
            'id',
            'Course',
            'Teacher',
            'Day',
            'category_name',
            'course_code',
            'course_name',
            'teacher_name',
            'department_name',
        ]

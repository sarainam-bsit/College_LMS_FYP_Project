from rest_framework import serializers
from .models import Lecture

class LectureSerializer(serializers.ModelSerializer):
    Lec_course_code = serializers.CharField(source='Lec_course.C_Code', read_only=True)
    Lec_course_name = serializers.CharField(source='Lec_course.C_Title', read_only=True)
    Lec_department_name = serializers.CharField(source='Lec_course.C_Department.Department_Name', read_only=True)


    class Meta:
        model = Lecture
        fields = ['id', 'Lec_course', 'Lec_course_code', 'Lec_course_name', 'Lec_department_name', 'Title', 'Date', 'Time', 'Video']
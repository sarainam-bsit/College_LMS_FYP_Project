from rest_framework import serializers
from .models import CourseTask

class CourseTaskSerializer(serializers.ModelSerializer):
    
    Course_code = serializers.CharField(source='Course.C_Code', read_only=True)
    Course_name = serializers.CharField(source='Course.C_Title', read_only=True)
    Department_id  = serializers.CharField(source= 'Course.C_Department.id', read_only=True)
    Department_Name  = serializers.CharField(source= 'Course.C_Department.Department_Name', read_only=True)
    Category_Name = serializers.CharField(source='Course.C_Category.Category_Name', read_only=True)

    class Meta:
        model = CourseTask
        fields = ['id','Category_Name', 'Course', 'Course_code', 'Course_name','Department_Name','Department_id', 'Task_type', 'Title', 'Link', 'Created_at', 'Ended_at']

# Courses/serializers.py
from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    C_Category_Full = serializers.SerializerMethodField()
    Teacher_Name = serializers.CharField(source='Teacher.Teacher_Name', read_only=True)
    C_Category_Name = serializers.CharField(source='C_Category.Category_Name', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'C_Code',
            'C_Title',
            'Credit_Hour',
            'C_Category',
            'C_Category_Full',
            'Teacher_Name',
            'C_Category_Name'
        ]

    def get_C_Category_Full(self, obj):
        if obj.C_Category:
        # Ensure the C_Category has a related department
            department = getattr(obj.C_Category, 'Related_Department', None)
            department_name = department.Department_Name if department else ""
        
            return f"{department_name} - {obj.C_Category.Category_Type} ({obj.C_Category.Category_Name})"
        return ""

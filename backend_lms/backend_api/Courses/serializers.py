from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    C_Category_Full = serializers.SerializerMethodField()
    C_Department = serializers.CharField(source='C_Department.Department_Name', read_only=True)
    Teacher = serializers.CharField(source='Teacher.Teacher_Name', read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

    def get_C_Category_Full(self, obj):
        if obj.C_Department and obj.C_Category:
            return f"{obj.C_Department.Department_Name} - {obj.C_Category.Category_Type} ({obj.C_Category.Category_Name})"
        return ""

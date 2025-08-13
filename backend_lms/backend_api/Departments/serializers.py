from rest_framework import serializers
from .models import Department, CourseCategories
from Account.models import Student

class DepartmentSerializer(serializers.ModelSerializer):
    # Display HOD name in GET responses
    HOD_name = serializers.CharField(source='HOD.Teacher_Name', read_only=True) # adjust full_name as per your Teacher model

    class Meta:
        model = Department
        fields = ['id', 'Department_Name', 'Discription', 'Department_Image', 'HOD', 'HOD_name']






class CourseCategoriesSerializer(serializers.ModelSerializer):
    # department ka sirf name show karne ke liye
    Related_Department_Name = serializers.CharField(source='Related_Department.Department_Name', read_only=True)
   

    class Meta:
        model = CourseCategories
        fields = ['id', 'Category_Type', 'Category_Name', 'Related_Department', 'Related_Department_Name']

        

            
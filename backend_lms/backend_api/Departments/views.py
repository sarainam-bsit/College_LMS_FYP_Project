from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Department, CourseCategories
from Account.models import Student, Teacher
from Account.serializers import TeacherSerializer
from .serializers import DepartmentSerializer, CourseCategoriesSerializer

# Create your views here.
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    # Get all teachers for HOD dropdown
    @action(detail=False, methods=['get'])
    def superadmin_teachers(self, request):
        teachers = Teacher.objects.all()  # Or filter if needed
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)

# Departments/views.py



class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = CourseCategories.objects.all()
    serializer_class = CourseCategoriesSerializer
    
    @action(detail=False, methods=['get'])
    def superadmin_Department(self, request):
        departments = Department.objects.all()  # Or filter if needed
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_department(self, request):
        dept_id = request.query_params.get('department_id')
        if not dept_id:
            return Response({"error": "department_id is required"}, status=400)
        
        categories = CourseCategories.objects.filter(Related_Department_id=dept_id)
        serializer = CourseCategoriesSerializer(categories, many=True)
        return Response(serializer.data)
   
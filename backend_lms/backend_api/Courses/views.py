from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer
from Departments.models import Department, CourseCategories
from Departments.serializers import DepartmentSerializer, CourseCategoriesSerializer
from Account.models import Teacher
from Account.serializers import TeacherSerializer
from django.db.models import Q

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=False, methods=['get'])
    def dropdowns(self, request):
        departments = Department.objects.all()
        dep_serializer = DepartmentSerializer(departments, many=True)

        categories = CourseCategories.objects.all()
        cat_serializer = CourseCategoriesSerializer(categories, many=True)

        teachers = Teacher.objects.all()
        teacher_serializer = TeacherSerializer(teachers, many=True)

        return Response({
            "departments": dep_serializer.data,
            "categories": cat_serializer.data,
            "teachers": teacher_serializer.data
        })

    @action(detail=False, methods=['get'])
    def courses_by_department_category(self, request):
        department_id = request.GET.get('department_id')
        category_id = request.GET.get('category_id')  # better naming for URL param

        if not department_id or not category_id:
            return Response({"error": "Provide department_id and category_id"}, status=400)

        try:
        # Make sure field names match your Course model
            courses = Course.objects.filter(
                C_Department__id=department_id,
                C_Category__id=category_id
            )

            serializer = self.get_serializer(courses, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)

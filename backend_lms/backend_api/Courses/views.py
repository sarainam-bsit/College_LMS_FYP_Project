from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer
from Departments.models import Department, CourseCategories
from Departments.serializers import CourseCategoriesSerializer
from Account.models import Teacher, Student
from Account.serializers import TeacherSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=False, methods=['get'])
    def dropdowns(self, request):
        departments = Department.objects.filter(coursecategories__isnull=False).distinct()
        categories = CourseCategories.objects.all()
        teachers = Teacher.objects.all()

        cat_serializer = CourseCategoriesSerializer(categories, many=True)
        teacher_serializer = TeacherSerializer(teachers, many=True)

        return Response({
            "departments": [{"id": dep.id, "Department_Name": dep.Department_Name} for dep in departments],
            "categories": cat_serializer.data,
            "teachers": teacher_serializer.data
        })

    @action(detail=False, methods=['get'])
    def courses_by_student(self, request):
        student_id = request.GET.get("student_id")
        department_id = request.GET.get("department_id")
        category_id = request.GET.get("category_id")

        if not student_id:
            return Response({"error": "Provide student_id"}, status=400)

        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)

        try:
           
            category = CourseCategories.objects.get(id=category_id)
        except (Department.DoesNotExist, CourseCategories.DoesNotExist):
            return Response({"error": "Department or Category not found"}, status=404)

    # Compare IDs for safety
        if student.Course_Category.Related_Department.Department_Name.strip().lower() != category.Related_Department.Department_Name.strip().lower() \
    or student.Course_Category.Category_Name.strip().lower() != category.Category_Name.strip().lower():
            return Response(
                {"error": "You are not enrolled in this department or course category."},
                status=403
            )

        if not student.Fee_Status:
            return Response({"error": "Access denied: fee not paid"}, status=403)

    # Get courses and organize by code
        courses = Course.objects.filter(C_Category=category).order_by('C_Code')
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)
    
    
    
    
    @action(detail=False, methods=['get'])
    def courses_by_teacher(self, request):
        teacher_id = request.GET.get("teacher_id")
        category_id = request.GET.get("category_id")

        if not teacher_id:
         return Response({"error": "Provide teacher_id"}, status=400)

        if not category_id:
            return Response({"error": "Provide category_id"}, status=400)

    # Fetch teacher
        try:
            teacher = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found"}, status=404)

    # Fetch category
        try:
            category = CourseCategories.objects.get(id=category_id)
        except CourseCategories.DoesNotExist:
            return Response({"error": "Category not found"}, status=404)

    # Fetch courses assigned to this teacher in this category
        courses = Course.objects.filter(Teacher=teacher, C_Category=category)

        if not courses.exists():
            return Response({"error": "No courses assigned in this category for this teacher."}, status=404)

        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)

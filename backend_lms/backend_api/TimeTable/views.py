from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Timetable
from .serializers import TimetableSerializer
from Departments.models import Department, CourseCategories
from Courses.models import Course
from Account.models import Teacher, Student

class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer

    @action(detail=False, methods=["get"])
    def departments(self, request):
        departments = Department.objects.all()
        return Response([{"id": d.id, "Department_Name": d.Department_Name} for d in departments])

    @action(detail=False, methods=["get"])
    def categories(self, request):
        categories = CourseCategories.objects.all()
        return Response([{"id": c.id, "Category_Name": c.Category_Name} for c in categories])

    @action(detail=False, methods=["get"])
    def courses(self, request):
        courses = Course.objects.all()
        return Response([{"id": c.id, "C_Title": c.C_Title, "C_Code": c.C_Code} for c in courses])

    @action(detail=False, methods=["get"])
    def teachers(self, request):
        teachers = Teacher.objects.all()
        return Response([{"id": t.id, "Teacher_Name": t.Teacher_Name} for t in teachers])
    
    
    @action(detail=False, methods=['get'])
    def timetable_by_student(self, request):
        student_id = request.GET.get("student_id")
        category_id = request.GET.get("category_id")

        if not student_id:
            return Response({"error": "Provide student_id"}, status=400)

    # Student fetch
        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)

    # Department aur Category names fetch karo
        try:
            # department = Department.objects.get(id=department_id)
            category = CourseCategories.objects.get(id=category_id)
        except (Department.DoesNotExist, CourseCategories.DoesNotExist):
            return Response({"error": "Department or Category not found"}, status=404)

    # Match by names
        if student.Course_Category.Related_Department.Department_Name.strip().lower() != category.Related_Department.Department_Name.strip().lower() \
            or student.Course_Category.Category_Name.strip().lower() != category.Category_Name.strip().lower():
            return Response(
                {"error": "You are not enrolled in this department or course category."},
                status=403
            )

    # Boolean check (optional)
        if hasattr(student, "can_access_Course") and not student.can_access_Course:
            return Response({"error": "Access denied: fee or permission not granted"}, status=403)

    # Courses filter by names
        try:
            timetable = Timetable.objects.filter(
                Course__C_Category__Related_Department__Department_Name__iexact=student.Course_Category.Related_Department.Department_Name.strip(),
                Course__C_Category__Category_Name__iexact=student.Course_Category.Category_Name.strip()
            )
            serializer = self.get_serializer(timetable, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
        
        



    @action(detail=False, methods=['get'])
    def timetable_by_teacher(self, request):
        teacher_id = request.GET.get("teacher_id")
        category_id = request.GET.get("category_id")

        if not teacher_id:
            return Response({"error": "Provide teacher_id"}, status=400)

    # Teacher fetch
        try:
            teacher = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found"}, status=404)

    # Category fetch
        try:
            category = CourseCategories.objects.get(id=category_id)
        except CourseCategories.DoesNotExist:
            return Response({"error": "Category not found"}, status=404)

    # Check if teacher has any course in this category
        courses_in_category = Course.objects.filter(
            C_Category=category, Teacher=teacher
        )

        if not courses_in_category.exists():
            return Response({"error": "No courses assigned in this category for this teacher."}, status=403)

    # Timetable fetch
        timetable = Timetable.objects.filter(Course__C_Category=category, Course__in=courses_in_category)
        serializer = self.get_serializer(timetable, many=True)
        return Response(serializer.data)

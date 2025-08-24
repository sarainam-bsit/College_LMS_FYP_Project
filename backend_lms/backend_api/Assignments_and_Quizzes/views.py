from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from .models import CourseTask
from .serializers import CourseTaskSerializer
from Account.models import Teacher, Student
from Courses.models import Course
from Departments.models import CourseCategories, Department


class CourseTaskViewSet(viewsets.ModelViewSet):
    queryset = CourseTask.objects.all().order_by('-Created_at')
    serializer_class = CourseTaskSerializer

    def get_queryset(self):
        """
        Filter tasks by teacher_id or course_id (query params).
        """
        teacher_id = self.request.query_params.get("teacher_id")
        course_id = self.request.query_params.get("course_id")

        queryset = CourseTask.objects.all().order_by('-Created_at')

        if teacher_id:
            queryset = queryset.filter(Course__Teacher__id=teacher_id)
        if course_id:
            queryset = queryset.filter(Course__id=course_id)

        return queryset

    def perform_create(self, serializer):
        """
        Validate teacher is uploading task only for his/her own courses.
        """
        teacher_id = self.request.data.get("teacher_id")
        if not teacher_id:
            raise ValidationError("teacher_id is required.")
        try:
            teacher = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            raise ValidationError("Teacher not found.")

        course = serializer.validated_data.get("Course")
        if not course:
            raise ValidationError("Course is required.")

        # ✅ ensure this course belongs to this teacher
        if not course.Teacher or course.Teacher.id != teacher.id:
            raise ValidationError("You can upload tasks only for your assigned courses.")

        serializer.save()

    @action(detail=False, methods=['get'])
    def courses_by_teacher(self, request):
        """
        Return list of courses assigned to a teacher.
        """
        teacher_id = request.query_params.get("teacher_id")
        if not teacher_id:
            return Response({"error": "teacher_id is required"}, status=400)
        try:
            teacher = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found."}, status=404)

        courses = Course.objects.filter(Teacher=teacher)
        data = [{"id": c.id, "C_Code": c.C_Code, "C_Title": c.C_Title} for c in courses]
        return Response(data)

    @action(detail=False, methods=['get'])
    def by_course(self, request):
        """
        Get tasks by specific course.
        """
        course_id = request.query_params.get("course_id")
        if not course_id:
            return Response({"error": "course_id is required"}, status=400)
        try:
            course_id = int(course_id)
        except ValueError:
            return Response({"error": "Invalid course_id"}, status=400)

        tasks = CourseTask.objects.filter(Course__id=course_id).order_by('-Created_at')
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_teacher(self, request):
        """
        Get tasks uploaded by a teacher.
        """
        teacher_id = request.query_params.get("teacher_id")
        if not teacher_id:
            return Response({"error": "teacher_id is required"}, status=400)

        tasks = CourseTask.objects.filter(Course__Teacher__id=teacher_id).order_by('-Created_at')
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def tasks_by_student(self, request):
        student_id = request.GET.get("student_id")
        category_id = request.GET.get("category_id")

        if not student_id:
            return Response({"error": "Provide student_id"}, status=400)

        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=404)

        try:
            category = CourseCategories.objects.get(id=category_id)
        except CourseCategories.DoesNotExist:
            return Response({"error": "Category not found"}, status=404)

  
        if not student.Fee_Status:
            return Response({"error": "Access denied: fee not paid"}, status=403)

        try:
        # 1. Get all courses in this category
            courses_in_category = category.course_set.all()  # adjust related_name if needed

        # 2. Get all tasks for those courses
            tasks = CourseTask.objects.filter(Course__in=courses_in_category).select_related('Course')
            serializer = self.get_serializer(tasks, many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
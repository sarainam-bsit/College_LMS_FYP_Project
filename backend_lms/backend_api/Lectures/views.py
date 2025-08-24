from rest_framework import viewsets, status
from .models import Lecture
from .serializers import LectureSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from Account.models import Teacher
from Courses.models import Course
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError


class LectureViewSet(viewsets.ModelViewSet):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        teacher_id = self.request.GET.get("teacher_id")
        if teacher_id:
            try:
                teacher = Teacher.objects.get(id=teacher_id)
                return Lecture.objects.filter(Lec_course__Teacher=teacher)
            except Teacher.DoesNotExist:
                return Lecture.objects.none()
        return Lecture.objects.all()

    def perform_create(self, serializer):
        teacher_id = self.request.data.get("teacher_id")
        if not teacher_id:
            raise ValidationError("teacher_id is required.")
        try:
            teacher = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            raise ValidationError("Teacher not found.")

        course = serializer.validated_data.get('Lec_course')
        if not course:
            raise ValidationError("Course is required.")

        # Check course teacher match
        if not course.Teacher or course.Teacher.id != teacher.id:
            raise ValidationError("You can upload lecture only for your assigned courses.")

        serializer.save()

    @action(detail=False, methods=['get'])
    def courses_by_teacher(self, request):
        teacher_id = request.GET.get("teacher_id")
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
        course_id = request.query_params.get('course_id')
        if not course_id:
            return Response({"error": "course_id is required"}, status=400)
        try:
            course_id = int(course_id)
        except ValueError:
            return Response({"error": "Invalid course_id"}, status=400)

        lectures = Lecture.objects.filter(Lec_course__id=course_id)
        serializer = self.get_serializer(lectures, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_teacher(self, request):
        teacher_id = request.query_params.get("teacher_id")
        if not teacher_id:
            return Response({"error": "teacher_id is required"}, status=400)

        lectures = Lecture.objects.filter(Lec_course__Teacher__id=teacher_id)
        serializer = self.get_serializer(lectures, many=True)
        return Response(serializer.data)

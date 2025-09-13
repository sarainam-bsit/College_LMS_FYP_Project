from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from Grades.models import Grade, StudentGradeHistory
from Grades.serializers import GradeSerializer, StudentGradeHistorySerializer
from Courses.models import Course
from Account.models import Teacher, Student
from Departments.models import CourseCategories
from Departments.serializers import CourseCategoriesSerializer

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def get_queryset(self):
        queryset = Grade.objects.all()
        student_id = self.request.query_params.get('student')
        course_id = self.request.query_params.get('course')

        if student_id and course_id:
            queryset = queryset.filter(Student_id=student_id, Course_id=course_id)
        elif student_id:
            queryset = queryset.filter(Student_id=student_id)
        elif course_id:
            queryset = queryset.filter(Course_id=course_id)
        return queryset

    @action(detail=False, methods=['get'])
    def students_by_course(self, request):
        teacher_id = request.query_params.get('teacher_id')
        course_id = request.query_params.get('course_id')

        if not teacher_id or not course_id:
            return Response({"error": "teacher_id and course_id are required"}, status=400)

        try:
            teacher = Teacher.objects.get(id=teacher_id)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found"}, status=404)

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=404)

        students = Student.objects.filter(
            Course_Category__Related_Department=course.C_Category.Related_Department,
            Course_Category=course.C_Category, 
            Fee_Status=True 
        ).values('id','Student_Name','Student_Email','Reg_No','Roll_No')
        supply_students = Student.objects.filter(
            Supply_Courses__contains=[{"course_id": course.id}],
            # Supply_Fee_Status=True 
        ).values("id","Student_Name","Student_Email","Reg_No","Roll_No")

        return Response({
    "normal_students": list(students),
    "supply_students": list(supply_students)
})
    
    @action(detail=False, methods=['get'])
    def category_dropdown(self, request):
        categories = CourseCategories.objects.all()
        serializer = CourseCategoriesSerializer(categories, many=True)
        return Response({"categories": serializer.data})


class StudentGradeHistoryViewSet(viewsets.ModelViewSet):
    queryset = StudentGradeHistory.objects.all()
    serializer_class = StudentGradeHistorySerializer

    @action(detail=False, methods=['get'])
    def student_grades(self, request):
        student_id = request.GET.get("student_id")
        if not student_id:
            return Response({"error": "Please give student_id"}, status=400)

    # Get all grades of student
        grades = StudentGradeHistory.objects.filter(student_id=student_id)

        category = {}   # yahan semester wise data store hoga

        for g in grades:
        # har semester ka ek key banayenge
            cat_key = f"{g.department_name} - {g.category_name}"

        # agar ye semester pehli dafa aya hai to ek naya record bnao
            if cat_key not in category:
                category[cat_key] = {
                    "department": g.department_name,
                    "category": g.category_name,
                    "courses": [],
                    "total_obtained": 0,
                    "total_max": 0,
                    "pending_courses": 0,
                    "supply_courses": []
                }

        # ab is semester me course add karo
            category[cat_key]["courses"].append({
                "course_code": g.course_code,
                "course_title": g.course_title,
                "credit_hour": g.credit_hour,
                "course_total": g.course_total,
                "course_obtained": g.course_obtained,
                "sessional_total": g.sessional_total,
                "sessional_obtained": g.sessional_obtained,
                "grade": g.grade,
                "status": g.status
            })

        # agar student ke marks diye gaye hain
            total_courses_count = Course.objects.filter(C_Category__Category_Name=g.category_name).count()

# Uploaded courses by this student
            uploaded_courses_count = StudentGradeHistory.objects.filter(
                student_id=student_id,
                category_name=g.category_name
            ).count()

            category[cat_key]["pending_courses"] = total_courses_count - uploaded_courses_count

# Total obtained and max for uploaded courses
            category[cat_key]["total_obtained"] += g.course_obtained + g.sessional_obtained
            category[cat_key]["total_max"] += g.course_total + g.sessional_total

            if g.status == "Supply":
                category[cat_key]["supply_courses"].append(g.course_title)

    # # GPA calculate karna
    #     for cat in category.values():
    #         total_points = 0
    #         total_credits = 0
    #         for c in cat["courses"]:
    #             if c["grade"]:   # agar grade hai to GPA me shamil hoga
    #                 total_points += c["credit_hour"] * self.grade_to_point(c["grade"])
    #                 total_credits += c["credit_hour"]

    #         if total_credits > 0:
    #             cat["GPA"] = round(total_points / total_credits, 2)
    #         else:
    #             cat["GPA"] = 0

    # # CGPA calculate karna
    #     total_points = 0
    #     total_credits = 0
    #     for g in grades:
    #         if g.grade:
    #             total_points += g.grade_point() * g.credit_hour
    #             total_credits += g.credit_hour

    #     CGPA = round(total_points / total_credits, 2) if total_credits else 0

        return Response({
            "semesters": list(category.values()),
            # "CGPA": CGPA
        })


    # def grade_to_point(self, grade):
    #     grade_points = {
    #         "A+": 4.0,
    #         "A": 3.7,
    #         "B": 3.0,
    #         "C": 2.0,
    #         "F": 0.0
    #     }
    #     return grade_points.get(grade, 0)

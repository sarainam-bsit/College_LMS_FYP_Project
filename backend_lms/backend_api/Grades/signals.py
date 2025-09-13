from django.db.models.signals import post_save
from django.dispatch import receiver
from Grades.models import Grade, StudentGradeHistory
from Courses.models import Course

@receiver(post_save, sender=Grade)
def update_student_grade_history(sender, instance, **kwargs):
    student = instance.Student
    course = instance.Course

    # --- Step 1: Sabhi grades check karo ---
    all_grades = Grade.objects.filter(Student=student)

    # Fail courses filter
    failed_courses = [g.Course for g in all_grades if g.grade == "F"]

    # --- Step 2: Status aur Supply Courses update ---
    if failed_courses:
        # Purani supply reset kardo
        student.Supply_Courses = []

        # Saare failed subjects ko Supply list me daalo
        for c in failed_courses:
            student.Supply_Courses = [
        {
            "course_id": c.id,
            "course_name": c.C_Title,
            "course_code": c.C_Code,
            "category_id": c.C_Category.id
        }
        for c in failed_courses
    ]

        # Agar saare subjects fail hain
        if len(failed_courses) == all_grades.count():
            student.Status = "Fail"
        else:
            student.Status = "Supply"
    else:
        # Agar koi fail nahi
        student.Supply_Courses = []
        student.Status = "Pass"

    student.save()

    # Get or create history
    history, created = StudentGradeHistory.objects.get_or_create(
        student=student,
        course=course,
        defaults={
            "department_name": course.C_Category.Related_Department.Department_Name,
            "category_name": course.C_Category.Category_Name,
            "category_type": course.C_Category.Category_Type,
            "course_code": course.C_Code,
            "course_title": course.C_Title,
            "credit_hour": getattr(course, "Credit_Hours", 0),
        }
    )

    # Update marks & calculate grade/status
    history.course_total = instance.Course_Total_Marks
    history.course_obtained = instance.Course_Obtained_Marks
    history.sessional_total = instance.Sessional_Total_Marks
    history.sessional_obtained = instance.Sessional_Obtained_Marks
    history.calculate_totals()
    history.save()

    # Semester courses
    semester_courses = Course.objects.filter(
        C_Category__Related_Department=course.C_Category.Related_Department,
        C_Category=course.C_Category,
        C_Category__Category_Name=course.C_Category.Category_Name
    )

    uploaded_courses_count = StudentGradeHistory.objects.filter(
        student=student,
        course__in=semester_courses
    ).count()

    pending_courses_count = semester_courses.count() - uploaded_courses_count

    # Update pending_courses
    for g in StudentGradeHistory.objects.filter(student=student, course__in=semester_courses):
        g.pending_courses = pending_courses_count
        g.save()

    # GPA if all courses uploaded
    # if pending_courses_count == 0:
    #     all_grades = StudentGradeHistory.objects.filter(student=student, course__in=semester_courses)
    #     total_obtained = sum((g.course_obtained or 0) + (g.sessional_obtained or 0) for g in all_grades)
    #     total_max = sum((g.course_total or 0) + (g.sessional_total or 0) for g in all_grades)
    #     total_points = sum((g.grade_point() * g.credit_hour) for g in all_grades)
    #     total_credits = sum(g.credit_hour for g in all_grades)
    #     gpa = round(total_points / total_credits, 2) if total_credits else 0

    #     for g in all_grades:
    #         g.total_obtained = total_obtained
    #         g.total_max = total_max
    #         g.GPA = gpa
    #         g.save()
    
    
        
        

from django.db import models
from Account.models import Student
from Courses.models import Course
from Departments.models import CourseCategories

class Grade(models.Model):
    Student = models.ForeignKey(Student, on_delete=models.CASCADE)
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    # category = models.ForeignKey(CourseCategories, on_delete=models.CASCADE, null=True, blank=True)
    
    # Marks
    Course_Total_Marks = models.IntegerField(default=100)
    Course_Obtained_Marks = models.IntegerField(default=0)
    Sessional_Total_Marks = models.IntegerField(default=20)
    Sessional_Obtained_Marks = models.IntegerField(default=0)

    Remarks = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ("Student", "Course")

    def __str__(self):
        return f"{self.Student.Student_Name} - {self.Course.C_Title}"

    @property
    def Total_Obtained(self):
        return self.Course_Obtained_Marks + self.Sessional_Obtained_Marks 

    @property
    def Total_Marks(self):
        return self.Course_Total_Marks + self.Sessional_Total_Marks

    @property
    def status(self):
        return "Pass" if self.grade != "F" else "Supply"

    @property
    def grade(self):
        total = self.Total_Obtained
        max_total = self.Total_Marks
        percentage = (total / max_total) * 100 if max_total > 0 else 0
        if percentage >= 85:
            return "A+"
        elif percentage >= 75:
            return "A"
        elif percentage >= 60:
            return "B"
        elif percentage >= 50:
            return "C"
        else:
            return "F"


class StudentGradeHistory(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    department_name = models.CharField(max_length=100)
    category_name = models.CharField(max_length=100)
    category_type = models.CharField(max_length=100, default='INTER')
    course_code = models.CharField(max_length=50)
    course_title = models.CharField(max_length=200)
    credit_hour = models.FloatField(default=0)
    course_total = models.FloatField(default=0)
    course_obtained = models.FloatField(default=0)
    sessional_total = models.FloatField(default=0)
    sessional_obtained = models.FloatField(default=0)
    total_obtained = models.FloatField(default=0)
    total_max = models.FloatField(default=0)
    GPA = models.FloatField(default=0)
    grade = models.CharField(max_length=2, blank=True, null=True)
    status = models.CharField(max_length=10, default="Pass")  # Pass / Supply
    pending_courses = models.IntegerField(default=0)

    def calculate_totals(self):
        self.total_obtained = (self.course_obtained or 0) + (self.sessional_obtained or 0)
        self.total_max = (self.course_total or 0) + (self.sessional_total or 0)

        if self.total_max > 0:
            percent = (self.total_obtained / self.total_max) * 100

            # Grade
            if percent >= 85:
                self.grade = "A+"
            elif percent >= 75:
                self.grade = "A"
            elif percent >= 60:
                self.grade = "B"
            elif percent >= 50:
                self.grade = "C"
            else:
                self.grade = "F"

            # Status
            self.status = "Pass" if self.grade != "F" else "Supply"
        else:
            self.grade = None
            self.status = "Pass"

    def grade_point(self):
        mapping = {"A+": 4.0, "A":3.7, "B":3.0, "C":2.0, "F":0.0}
        return mapping.get(self.grade, 0)

    def __str__(self):
        return f"{self.student.Student_Name} - {self.course.C_Title}"

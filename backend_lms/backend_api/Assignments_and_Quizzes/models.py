from django.db import models
from Courses.models import Course# Your course model path
from Departments.models import CourseCategories

class CourseTask(models.Model):
    TASK_TYPE_CHOICES = [
        ('ASSIGNMENT', 'Assignment'),
        ('QUIZ', 'Quiz'),
    ]
    
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    Task_type = models.CharField(max_length=10, choices=TASK_TYPE_CHOICES)
    Title = models.CharField(max_length=255)
    Link = models.URLField()  # Google Classroom link
    Created_at = models.DateTimeField(auto_now_add=True)
    Ended_at = models.DateTimeField()

    def __str__(self):
        return f"{self.Course.C_Code} - {self.Title} ({self.Task_type})"

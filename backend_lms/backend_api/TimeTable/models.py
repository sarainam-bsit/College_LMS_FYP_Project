from django.db import models
from Departments.models import Department
from Courses.models import Course
from Account.models import Teacher
from Departments.models import CourseCategories

DAYS_OF_WEEK = [
    ('MON', 'Monday'),
    ('TUE', 'Tuesday'),
    ('WED', 'Wednesday'),
    ('THU', 'Thursday'),
    ('FRI', 'Friday'),
    ('SAT', 'Saturday'),
]

class Timetable(models.Model):
    
 
    Course = models.ForeignKey(Course, on_delete=models.CASCADE)
    Teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    Day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    Date = models.DateField(null=True, blank=True)   # ✅ Date
    Start_Time = models.TimeField(null=True, blank=True)  # ✅ Start time
    End_Time = models.TimeField(null=True, blank=True)  
    is_datesheet = models.BooleanField(default=False) 

    def __str__(self):
        return f"{self.Course.C_Title} - {self.Day}"


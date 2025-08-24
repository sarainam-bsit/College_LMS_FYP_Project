from django.db import models
from Courses.models import Course


class Lecture(models.Model):
    Lec_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lectures')
    Title = models.CharField(max_length=200)
    Date = models.DateField()
    Time = models.TimeField()
    Video = models.FileField(upload_to='lectures_videos/')

    def __str__(self):
        return f"{self.Lec_course.C_Code} - {self.Title}" 
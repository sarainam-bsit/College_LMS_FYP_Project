from django.db import models
from Departments.models import Department, CourseCategories
from Account.models import Teacher, Student

# Create your models here.
class Course(models.Model):
    C_Category = models.ForeignKey(CourseCategories, blank=True, null=True, on_delete=models.CASCADE)
    C_Code = models.CharField(max_length=100)
    C_Title = models.CharField(max_length=100)
    Teacher = models.ForeignKey(Teacher, blank=True, null=True, on_delete=models.SET_NULL)
    Credit_Hour = models.FloatField(default=0.0)
    
    def __str__(self):
        return f"{self.C_Category} {self.C_Code} ({self.C_Title})"
        
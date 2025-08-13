from django.db import models
from Departments.models import CourseCategories


class Student(models.Model):
   
  
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]
    Role_CHOICES = [
        ('Student', 'Student'),
        ('Teacher', 'Teacher')
    ]
    
   
    
    Role = models.CharField(max_length=100, choices=Role_CHOICES)
    Department = models.ForeignKey('Departments.Department', blank=True, null=True, related_name='students', on_delete=models.SET_NULL)
    Course_Category = models.ForeignKey('Departments.CourseCategories',blank=True, null=True, on_delete=models.CASCADE)
    Reg_No= models.CharField(max_length=100, unique=True)
    Roll_No = models.CharField(max_length=100, unique=True)
    Student_Name = models.CharField(max_length=100)
    Student_CNIC = models.CharField(max_length=15, unique=True)
    Student_Phone_No = models.CharField(max_length=15, blank=True, null=True)
    Student_Email = models.EmailField(unique=True)
    Student_Password = models.CharField(max_length=128, blank=True, null=True) 
    Student_Gender = models.CharField(max_length=100, choices=GENDER_CHOICES)
    Student_DOB = models.DateField(blank=True, null=True)
    Student_Father_Name = models.CharField(max_length=100)
    Father_CNIC_No = models.CharField(max_length=15, unique=True)
    Address = models.TextField(blank=True, null=True) 
    Matric_Roll_No = models.CharField(max_length=100, unique=True, blank=True, null=True)
    Matric_Obtained_Marks = models.PositiveIntegerField(blank=True, null=True) 
    Matric_Total_Marks  = models.PositiveIntegerField(blank=True, null=True) 
    Matric_Board = models.CharField(max_length=100, blank=True, null=True)
    Matric_Year = models.PositiveIntegerField(blank=True, null=True)
    Matric_Session = models.CharField(max_length=100, blank=True, null=True)
    Intermediate_Roll_No = models.CharField(max_length=100, unique=True, blank=True, null=True)
    Intermediate_Obtained_Marks = models.PositiveIntegerField(blank=True, null=True) 
    Intermediate_Total_Marks = models.PositiveIntegerField(blank=True, null=True) 
    Intermediate_Board = models.CharField(max_length=100, blank=True, null=True)
    Intermediate_Year = models.PositiveIntegerField(blank=True, null=True)
    Intermediate_Session = models.CharField(max_length=100, blank=True, null=True)
    Is_Registered = models.BooleanField(default=False)
    Is_Passed = models.BooleanField(default=False)
    OTP_Digits = models.CharField(max_length=6, blank=True, null=True)
    OTP_Expiry = models.DateTimeField(blank=True, null=True)
    Is_Verified = models.BooleanField(default=False)
    
    
    

    def __str__(self):
        return f"{self.Student_Name} ({self.Department} - Semester {self.Course_Category})"

    
class Teacher(models.Model):
    Role_CHOICES = [
    ('Student', 'Student'),
    ('Teacher', 'Teacher')
]
    Role = models.CharField(max_length=100, choices=Role_CHOICES)
    Teacher_Name = models.CharField(max_length=100)
    Teacher_Email = models.EmailField(unique=True)
    Teacher_Password = models.CharField(max_length=128, blank=True, null=True) 
    Department = models.ForeignKey('Departments.Department', blank=True, null=True, related_name='teachers', on_delete=models.SET_NULL)
    Teacher_OTP_Digits = models.CharField(max_length=6, blank=True, null=True)
    Teacher_OTP_Expiry = models.DateTimeField(blank=True, null=True)
    Teacher_Is_Verified = models.BooleanField(default=False)
    def __str__(self):
        return self.Teacher_Name



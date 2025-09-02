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
    STATUS_CHOICES = [
    ("Pass", "Pass"),
    ("Fail", "Fail"),
    ("Supply", "Supply"),
]
    DEGREE_CHOICES = [
        ("Running", "Running"),
        ("Complete", "Complete"),
    ]
    Student_Image = models.ImageField(upload_to= 'profile_pics/', blank= True, null = True)
    Role = models.CharField(max_length=100, choices=Role_CHOICES)
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
    # Is_Semester_Student = models.BooleanField(default=False)
    OTP_Digits = models.CharField(max_length=6, blank=True, null=True)
    OTP_Expiry = models.DateTimeField(blank=True, null=True)
    Is_Verified = models.BooleanField(default=False)
    can_access_Course = models.BooleanField(default=False)
    Fee_Status = models.BooleanField(default=False)
    Supply_Fee_Status = models.BooleanField(default=False)
    Status = models.CharField(max_length=10, choices=STATUS_CHOICES, blank=True, null=True)
    Supply_Courses = models.JSONField(default=list, blank=True)
    Degree_Status = models.CharField(max_length=20, choices=DEGREE_CHOICES, default="Running")
    
    
    
    

    def __str__(self):
        return f"{self.Student_Name} ({self.Course_Category})"

    
class Teacher(models.Model):
    Role_CHOICES = [
    ('Student', 'Student'),
    ('Teacher', 'Teacher')
]
    Teacher_Image = models.ImageField(upload_to= 'profile_pics/', blank= True, null = True)
    Role = models.CharField(max_length=100, choices=Role_CHOICES)
    Teacher_Name = models.CharField(max_length=100)
    Teacher_Email = models.EmailField(unique=True)
    Teacher_Password = models.CharField(max_length=128, blank=True, null=True) 
    Department = models.ForeignKey('Departments.Department', blank=True, null=True, related_name='teachers', on_delete=models.SET_NULL)
    Qualification = models.CharField(max_length=100, blank=True, null=True)
    Teacher_OTP_Digits = models.CharField(max_length=6, blank=True, null=True)
    Teacher_OTP_Expiry = models.DateTimeField(blank=True, null=True)
    Teacher_Is_Verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.Teacher_Name






from django.db import models

class Student(models.Model):
    PROGRAM_CHOICES = [
        ('BSIT', 'BS Information Technology'),
        ('BSZoo', 'BS Zoology'),
        ('BSEcon', 'BS Economics'),
        ('BSEng', 'BS English'),
        ('BSUrd', 'BS Urdu'),
        ('BSMaths', 'BS Mathematics'),
        ('BSPS', 'BS Political Science'),
        ('BSstat', 'BS Statistics')
    ]
    SEMESTER_CHOICES = [
        ('1', 'Semester 1'),
        ('2', 'Semester 2'),
        ('3', 'Semester 3'),
        ('4', 'Semester 4'),
        ('5', 'Semester 5'),
        ('6', 'Semester 6'),
        ('7', 'Semester 7'),
        ('8', 'Semester 8')
    ]
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]
    Role_CHOICES = [
        ('Student', 'Student'),
        ('Teacher', 'Teacher')
    ]
    
    Role = models.CharField(max_length=100, choices=Role_CHOICES)
    Program = models.CharField(max_length=100, choices=PROGRAM_CHOICES)
    Semester = models.CharField(max_length=100, choices=SEMESTER_CHOICES)
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
    
    
    def promote_to_next_semester(self):
        semesters = ['1', '2', '3', '4', '5', '6', '7', '8']
        if self.Is_Passed and self.Semester != '8':  
            current_index = semesters.index(self.Semester)
            self.Semester = semesters[current_index + 1]
            self.Is_Passed = False
            self.save()

    def __str__(self):
        return f"{self.Student_Name} ({self.Program} - Semester {self.Semester})"
    
class Teacher(models.Model):
    Role_CHOICES = [
    ('Student', 'Student'),
    ('Teacher', 'Teacher')
]
    Role = models.CharField(max_length=100, choices=Role_CHOICES)
    Teacher_Name = models.CharField(max_length=100)
    Teacher_Email = models.EmailField(unique=True)
    Teacher_Password = models.CharField(max_length=128, blank=True, null=True) 
        



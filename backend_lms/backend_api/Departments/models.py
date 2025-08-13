from django.db import models


# Create your models here.
class Department(models.Model):
    Department_Name = models.CharField(max_length=100)
    Discription = models.TextField( blank=True)
    Department_Image = models.ImageField(upload_to= 'department_pics/', blank= True, null = True)
    HOD = models.OneToOneField('Account.Teacher', blank=True, null=True, on_delete=models.SET_NULL, related_name='headed_departments')
    def __str__(self):
        return self.Department_Name
    
    
class CourseCategories(models.Model):
    CATEGORY_TYPE_CHOICES = [
        ('INTER', 'Intermediate'),   # Part 1 & Part 2
        ('BS', 'Bachelor (Semester)'), # Semester system
       
    ]
    CATEGORY_Name_CHOICES = [
        ('Part 1', 'Part 1'),   # Part 1 & Part 2
        ('Part 2', 'Part 2'),
        ('Semester 1', 'Semester 1'),
        ('Semester 2', 'Semester 2'),
        ('Semester 3', 'Semester 3'),
        ('Semester 4', 'Semester 4'),
        ('Semester 5', 'Semester 5'),
        ('Semester 6', 'Semester 6'),
        ('Semester 7', 'Semester 7'),
        ('Semester 8', 'Semester 8'),
       
        
    ]
    Related_Department = models.ForeignKey(Department, blank=True, null=True, on_delete=models.CASCADE)
    
    Category_Type = models.CharField(max_length=100, choices=CATEGORY_TYPE_CHOICES)
    Category_Name = models.CharField(max_length=100, choices=CATEGORY_Name_CHOICES )  # e.g. "ICS Part 1", "BSIT Semester 1", "Web Development Basics"
    
    def __str__(self):
        return f"{self.Category_Type} ({self.Category_Name})"
   


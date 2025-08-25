from django.db import models
from Account.models import Student

STATUS_CHOICES = [
    ("Pending", "Pending"),
    ("Approved", "Approved"),
    ("Rejected", "Rejected"),
]

class LibraryApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    gender = models.CharField(max_length=10)
    email = models.EmailField()
    religious = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    home_address = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")
    applied_at = models.DateTimeField(auto_now_add=True)
    fee_generated_status = models.BooleanField(default=False) 

    def __str__(self):
        return f"{self.email} - {self.status}"





class LibraryCard(models.Model):
    Student = models.OneToOneField("Account.Student", on_delete=models.CASCADE)
    Card_Number = models.CharField(max_length=50, unique=True)
    Issue_Date = models.DateField(auto_now_add=True)
    Expiry_Date = models.DateField(blank=True, null=True)
    Is_Active = models.BooleanField(default=True)

    def __str__(self):
        return f"LibraryCard - {self.Student.Student_Name}"

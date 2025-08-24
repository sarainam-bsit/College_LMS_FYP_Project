from django.db import models

STATUS_CHOICES = [
    ("Unpaid", "Unpaid"),
    ("Paid", "Paid"),
]

FEE_TYPE = [
    ("Admission-Processing", "Admission-Processing"),
    ("Admission-fee", "Admission-fee"),
    ("Intermediate", "Intermediate"),
    ("Semester-wise", "Semester-wise"),
    ("Library-fee", "Library-fee"),
    ("Hostel-fee", "Hostel-fee"),
    ("Supply-fee", "Supply-fee")
]

class FeeVoucher(models.Model):
    Student = models.ForeignKey('Account.Student', blank=True, null=True, on_delete=models.CASCADE)
    Challan_no = models.CharField(max_length=100, unique=True)
    Challan_Type = models.CharField(max_length=50, choices=FEE_TYPE, default='Admission-Processing')
    Amount_to_Pay = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Fine_Date = models.DateField(blank=True, null=True)
    Fine_Amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Amount_Paid = models.DecimalField(max_digits=10, blank=True, null=True, decimal_places=2, default=0)
    Amount_Date = models.DateField(blank=True, null=True)
    Bank_Branch = models.CharField(max_length=100)  # remove unique=True
    Status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Unpaid")
    Created_At = models.DateField(auto_now_add=True)
    
    
    
    
    def __str__(self):
        return f"{self.Student.Student_Name} - {self.Challan_Type}"
    
    
    
    

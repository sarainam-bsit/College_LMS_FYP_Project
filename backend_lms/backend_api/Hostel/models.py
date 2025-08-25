from django.db import models
from Account.models import Student

STATUS_CHOICES = [
    ("Pending", "Pending"),
    ("Approved", "Approved"),
    ("Rejected", "Rejected"),
]
# Create your models here.
class HostelDetails(models.Model):
    Hostel_Rooms_Name = models.CharField(max_length=100)
    Discription = models.TextField( blank=True)
    Hostel_Room_Image = models.ImageField(upload_to= 'hostel_pics/', blank= True, null = True)
    
    def __str__(self):
        return self.Hostel_Rooms_Name
    class Meta:
        verbose_name = "Hostel Detail"
        verbose_name_plural = "Hostel Details"
        
        

class RoomDetail(models.Model):
    room_type = models.ForeignKey(HostelDetails, on_delete=models.CASCADE, related_name='rooms')  
    total_room = models.IntegerField(blank=True, null=True)
    rent = models.DecimalField(max_digits=100, decimal_places=2)
    ac = models.BooleanField(default=False)
    attached_bathroom = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    tv = models.BooleanField(default=False)
    wardrobe = models.BooleanField(default=False)
    study_table = models.BooleanField(default=False)
    common_area = models.BooleanField(default=False)
    mess_facility = models.BooleanField(default=False)
    laundry_facility = models.BooleanField(default=False)
    room_image = models.ImageField(upload_to= 'hostel_pics/', blank= True, null = True)
    description = models.TextField(blank=True)
    booked_room = models.IntegerField(blank=True, null=True)
    available_room = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.room_type.Hostel_Rooms_Name} "
    
    
    

class HostelApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    Email = models.EmailField()
    Department = models.CharField(max_length=100)
    Gender = models.CharField(max_length=100)
    Room_Type = models.CharField(max_length=100)
    Phone_No = models.CharField(max_length=100)
    Home_Address = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")
    fee_generated_status = models.BooleanField(default=False) 
    def __str__(self):
        return f"{self.student.Student_Name}"
  
  
  
  
class HostelCancelApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    Email = models.EmailField()
    Department = models.CharField(max_length=100)
    Gender = models.CharField(max_length=100)
    Room_Type = models.CharField(max_length=100)
    Phone_No = models.CharField(max_length=100)
    Home_Address = models.CharField(max_length=100)
    Reason = models.TextField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")
   
    def __str__(self):
        return f"{self.student.Student_Name}"  
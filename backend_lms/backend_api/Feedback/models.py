from django.db import models

# Create your models here.
class Feedback(models.Model):
    student_name = models.CharField(max_length=100)
    message = models.TextField()
    image = models.ImageField(upload_to= 'feedback_pics/', blank= True, null = True)
    is_seen = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


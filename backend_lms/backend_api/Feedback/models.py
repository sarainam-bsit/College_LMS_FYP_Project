from django.db import models

# Create your models here.
class Feedback(models.Model):
    student_name = models.CharField(max_length=100)
    message = models.TextField()
    is_seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


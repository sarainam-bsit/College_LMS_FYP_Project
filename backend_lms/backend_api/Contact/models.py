from django.db import models
from django.utils import timezone

class Contact(models.Model):
    name = models.CharField(max_length=100)   # student/teacher name
    email = models.EmailField()               # unka email
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    is_seen = models.BooleanField(default=False)  # admin ne dekha ya nahi

    def __str__(self):
        return f"{self.name} - {self.is_seen}"

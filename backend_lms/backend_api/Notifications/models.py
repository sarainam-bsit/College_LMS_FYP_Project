from django.db import models
from Account.models import Student  # adjust import path
# Agar Teacher model hai to use import kar lein; warna comment rehne dein
try:
    from Account.models import Teacher
except Exception:
    Teacher = None

class Notification(models.Model):
    TYPE_CHOICES = [
        ("hostel", "Hostel"),
        ("fee", "Fee"),
        ("library", "Library"),
        ("event", "Event"),
        ("general", "General"),
    ]

    title = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="general")

    # Audience
    receiver_student = models.ForeignKey(
        Student, null=True, blank=True, on_delete=models.CASCADE, related_name="notifications"
    )
    receiver_teacher = models.ForeignKey(
        Teacher, null=True, blank=True, on_delete=models.CASCADE, related_name="notifications"
    ) if Teacher else models.ForeignKey(
        Student, null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )  # fallback so migrations fail na hon

    for_all_students = models.BooleanField(default=False)
    for_all_teachers = models.BooleanField(default=False)

    # Optional: global read flag (simple case)
    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.type})"

from django.db import models

class Admin(models.Model):
    Admin_Email = models.EmailField(unique=True)
    Admin_Password = models.CharField(max_length=256, blank=True, null=True)  # blank allowed for first-time
    Is_Verified = models.BooleanField(default=False)
    OTP_Digits = models.CharField(max_length=6, blank=True, null=True)
    OTP_Expiry = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.Admin_Email

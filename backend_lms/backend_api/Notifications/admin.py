from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "for_all_students", "for_all_teachers", "receiver_student", "receiver_teacher", "is_read", "created_at")
    list_filter = ("type", "for_all_students", "for_all_teachers", "is_read", "created_at")
    search_fields = ("title", "message")

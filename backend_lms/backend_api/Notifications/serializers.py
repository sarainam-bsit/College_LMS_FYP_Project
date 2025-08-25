from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"

    def validate(self, data):
        # at least 1 audience choose ho
        audience_flags = [
            data.get("for_all_students"),
            data.get("for_all_teachers"),
            data.get("receiver_student"),
            data.get("receiver_teacher"),
        ]
        if not any(audience_flags):
            raise serializers.ValidationError(
                "Please select at least one audience (all students/teachers or a specific receiver)."
            )

        # specific student/teacher select kiya hai to 'for_all_*' dono true na ho
        if data.get("receiver_student") and data.get("for_all_students"):
            raise serializers.ValidationError("Choose either a specific student OR all students.")
        if data.get("receiver_teacher") and data.get("for_all_teachers"):
            raise serializers.ValidationError("Choose either a specific teacher OR all teachers.")
        return data

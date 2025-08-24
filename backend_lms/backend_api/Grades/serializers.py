from rest_framework import serializers
from .models import Grade, StudentGradeHistory

class GradeSerializer(serializers.ModelSerializer):
    Total_Obtained = serializers.ReadOnlyField()
    Total_Marks = serializers.ReadOnlyField()
    status = serializers.ReadOnlyField()
    grade = serializers.ReadOnlyField()

    class Meta:
        model = Grade
        fields = "__all__"


class StudentGradeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGradeHistory
        fields = "__all__"
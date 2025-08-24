from rest_framework import serializers
from .models import LibraryApplication, LibraryCard
from Account.models import Student

class LibraryApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryApplication
        fields = "__all__"

    def validate_email(self, value):
        # check if student email exists in Student table
        if not Student.objects.filter(Student_Email=value).exists():
            raise serializers.ValidationError("This email is not registered in student database.")
        return value
    





class LibraryCardSerializer(serializers.ModelSerializer):
    Student_Name = serializers.CharField(source='Student.Student_Name', read_only=True)
    Student_Email = serializers.CharField(source='Student.Student_Email', read_only=True)
    Reg_No = serializers.CharField(source='Student.Reg_No', read_only=True)

    class Meta:
        model = LibraryCard
        fields = ['id', 'Student', 'Student_Name', 'Student_Email', 'Reg_No', 'Card_Number', 'Issue_Date', 'Expiry_Date', 'Is_Active']
        read_only_fields = ['Card_Number', 'Issue_Date', 'Expiry_Date', 'Is_Active']


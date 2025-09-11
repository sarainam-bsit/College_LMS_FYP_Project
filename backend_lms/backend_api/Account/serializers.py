from .models import Student, Teacher
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class StudentRegistrationSerializer(serializers.ModelSerializer):
    Re_enter_Password = serializers.CharField(write_only= True)
    class Meta:
        model = Student
        fields = [
            'id','Reg_No', 'Roll_No', 'Student_Email', 'Temp_Password', 'Re_enter_Password', 'Is_Registered', 'Is_Verified'
        ]
        read_only_fields = ['Is_Registered', 'Is_Verified' ]
    def update(self, instance, validated_data):
        validated_data.pop('Re_enter_Password', None)
        validated_data.pop('Reg_No', None)
        validated_data.pop('Roll_No', None)
        validated_data.pop('Student_Email', None)
        if 'Temp_Password' in validated_data:
            validated_data['Temp_Password'] = make_password(validated_data['Temp_Password'])
        return super().update(instance, validated_data)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','Student_Name', 'Roll_No', 'Reg_No', 'Student_CNIC', 'Father_CNIC_No', 'Student_Email', 'Student_Gender']
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id','Teacher_Name', ]

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
class TeacherProfileSerializer(serializers.ModelSerializer):
    Department_Name = serializers.CharField(source="Department.Department_Name", read_only=True)
    class Meta:
        model = Teacher
        fields = "__all__"
            
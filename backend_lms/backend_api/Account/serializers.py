from .models import Student
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class StudentRegistrationSerializer(serializers.ModelSerializer):
    Re_enter_Password = serializers.CharField(write_only= True)
    class Meta:
        model = Student
        fields = [
            'Reg_No', 'Roll_No', 'Student_Email', 'Student_Password', 'Re_enter_Password', 'Is_Registered', 'Is_Verified'
        ]
        read_only_fields = ['Is_Registered', 'Is_Verified' ]
    def update(self, instance, validated_data):
        validated_data.pop('Re_enter_Password', None)
        validated_data.pop('Reg_No', None)
        validated_data.pop('Roll_No', None)
        validated_data.pop('Student_Email', None)
        if 'Student_Password' in validated_data:
            validated_data['Student_Password'] = make_password(validated_data['Student_Password'])
        return super().update(instance, validated_data)
                
            
            
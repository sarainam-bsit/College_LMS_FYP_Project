from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Student, Teacher
from .serializers import StudentRegistrationSerializer
from django.views.decorators.csrf import csrf_exempt
import random, datetime
from django.utils import timezone
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .constants import LOGIN_MESSAGES


@csrf_exempt
@api_view(['POST'])
def student_register(request):
    data = request.data
    errors = {}

    strict_fields = ['Reg_No', 'Roll_No', 'Student_Email']
    wrong_fields = 0

    for field in strict_fields:
        value = data.get(field)
        if not value or value.strip() == '':
            errors[field] = f"{field} is required."
        else:
            clean_value = value.strip()
            if not Student.objects.filter(**{f"{field}__iexact": clean_value}).exists():
                errors[field] = f"{field} is not correct."
                wrong_fields += 1

    if wrong_fields == len(strict_fields):
        return Response(
            {'errors': {'general': 'You are not student of this college. Please contact college.'}},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ Serializer
    if not data.get('Student_Password'):
        errors['Student_Password'] = "Password is required."
    if not data.get('Re_enter_Password'):
        errors['Re_enter_Password'] = "Please re-enter the password."
    elif data.get('Student_Password') != data.get('Re_enter_Password'):
        errors['Re_enter_Password'] = "Password does not match."

    if errors:
        return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Get student
    try:
        student = Student.objects.get(
            Reg_No=data.get('Reg_No').strip(),
            Roll_No=data.get('Roll_No').strip(),
            Student_Email=data.get('Student_Email').strip()
        )
    except Student.DoesNotExist:
        return Response(
            {'errors': {'general': 'Student not found. Please contact college.'}},
            status=status.HTTP_400_BAD_REQUEST
        )
    serializer = StudentRegistrationSerializer(student, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()

    # ✅ OTP Generate
    OTP = str(random.randint(100000, 999999))
    student.OTP_Digits = OTP
    student.OTP_Expiry = timezone.now() + datetime.timedelta(minutes=5)
    student.Is_Registered = False
    student.Is_Verified = False
    student.save()

    # ✅ Email send
    send_mail(
        subject="Your OTP Code",
        message=f"Your OTP is {OTP}. It will expire in 5 minute.",
        from_email="CollegeLMS.gcbskp.edu.pk",
        recipient_list=[student.Student_Email],
        fail_silently=False,
    )

    return Response({
        "message": "OTP sent to your email. Please verify.",
        "student_id": student.id  # React ko bhejo
    }, status=status.HTTP_200_OK)
@csrf_exempt
@api_view(['POST'])
def verify_otp(request):
    OTP = request.data.get('OTP_Digits')
    resend = request.data.get('resend')
    email = request.data.get('Email')  # Email instead of user_id

    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    user = None
    user_type = None

    # Try to find user in Student model (unverified)
    try:
        user = Student.objects.get(Student_Email=email, Is_Verified=False)
        user_type = 'student'
    except Student.DoesNotExist:
        try:
            user = Teacher.objects.get(Teacher_Email=email, Teacher_Is_Verified=False)
            user_type = 'teacher'
        except Teacher.DoesNotExist:
            return Response({"error": "User not found or already verified"}, status=status.HTTP_400_BAD_REQUEST)

    if resend == "true":
        new_OTP = str(random.randint(100000, 999999))
        if user_type == 'student':
            user.OTP_Digits = new_OTP
            user.OTP_Expiry = timezone.now() + datetime.timedelta(minutes=10)
            email = user.Student_Email
        else:
            user.Teacher_OTP_Digits = new_OTP
            user.Teacher_OTP_Expiry = timezone.now() + datetime.timedelta(minutes=10)
            email = user.Teacher_Email

        user.save()

        send_mail(
            subject="Your New OTP Code",
            message=f"Your new OTP is {new_OTP}. It will expire in 10 minutes.",
            from_email="CollegeLMS.gcbskp.edu.pk",
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({"message": f"New OTP sent to {email}"}, status=status.HTTP_200_OK)

    # Verify OTP flow
    if user_type == 'student':
        otp_valid = OTP and user.OTP_Digits == OTP and user.OTP_Expiry and user.OTP_Expiry > timezone.now()
        if otp_valid:
            user.Is_Verified = True
            user.Is_Registered = True
            user.OTP_Digits = None
            user.OTP_Expiry = None
            user.save()
            return Response({"message": f"OTP verified successfully for {user.Student_Email}"}, status=status.HTTP_200_OK)
    else:
        otp_valid = OTP and user.Teacher_OTP_Digits == OTP and user.Teacher_OTP_Expiry and user.Teacher_OTP_Expiry > timezone.now()
        if otp_valid:
            user.Teacher_Is_Verified = True
            user.Teacher_OTP_Digits = None
            user.Teacher_OTP_Expiry = None
            user.save()
            return Response({"message": f"OTP verified successfully for {user.Teacher_Email}"}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

USER_ROLES = {
    'STUDENT': 'student',
    'TEACHER': 'teacher',
}
@csrf_exempt
@api_view(['POST'])
def login_view(request):
    Email = request.data.get('Email')
    Password = request.data.get('Password')
    Role = request.data.get('Role')

    errors = {}
    handle_fields = ['Email', 'Password', 'Role']

    # 1. Empty fields check
    for field in handle_fields:
        values = request.data.get(field)
        if not values or values.strip() == '':
            errors[field] = f"{field} is required."

    if errors:
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

    # 2. Role check
    if Role not in [USER_ROLES['STUDENT'], USER_ROLES['TEACHER']]:
        return Response({"errors": {"general": "Role not found."}}, status=status.HTTP_404_NOT_FOUND)

    # 3. Student Login
    if Role == USER_ROLES['STUDENT']:
        try:
            student = Student.objects.get(Student_Email=Email)
        except Student.DoesNotExist:
            return Response({"errors": {"Email": "Email not found."}}, status=status.HTTP_404_NOT_FOUND)

        if not student.Student_Password and not student.Is_Registered and not student.Is_Verified:
            return Response({"errors": {"general": LOGIN_MESSAGES['Registration_Page']}}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(Password, student.Student_Password):
            return Response({"errors": {"Password": "Invalid password."}}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": LOGIN_MESSAGES['Student_Dashboard']}, status=status.HTTP_200_OK)

    # 4. Teacher Login
    elif Role == USER_ROLES['TEACHER']:
        try:
            teacher = Teacher.objects.get(Teacher_Email=Email)
        except Teacher.DoesNotExist:
            return Response({"errors": {"Email": "Email not found."}}, status=status.HTTP_404_NOT_FOUND)
        print(f"Teacher_Is_Verified value for {teacher.Teacher_Email}: {teacher.Teacher_Is_Verified}")
        if not teacher.Teacher_Is_Verified and not teacher.Teacher_Password:
    # Password set karo pehle
            teacher.Teacher_Password = make_password(Password)
            OTP = str(random.randint(100000, 999999))
            teacher.Teacher_OTP_Digits = OTP
            teacher.Teacher_OTP_Expiry = timezone.now() + datetime.timedelta(minutes=5)
            teacher.Teacher_Is_Verified = False
            teacher.save()

    # ✅ Email send
            send_mail(
            subject="Your OTP Code",
            message=f"Your OTP is {OTP}. It will expire in 5 minute.",
            from_email="CollegeLMS.gcbskp.edu.pk",
            recipient_list=[teacher.Teacher_Email],
            fail_silently=False,
        )


    # Phir response bhejo OTP verify karne ke liye
            return Response({
            "errors": {"general": LOGIN_MESSAGES['Verify_OTP']},
            "teacher_id": teacher.id
            }, status=status.HTTP_400_BAD_REQUEST)
        if not check_password(Password, teacher.Teacher_Password):
            return Response({"errors": {"Password": "Invalid password."}}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": LOGIN_MESSAGES['Teacher_Dashboard']}, status=status.HTTP_200_OK)




        
      
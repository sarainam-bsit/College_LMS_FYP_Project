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
def verify_OTP(request):
    OTP = request.data.get('OTP_Digits')
    resend = request.data.get('resend')
    student_id = request.data.get('student_id')  # React se aa raha hai

    if not student_id:
        return Response({"error": "Student ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student.objects.get(id=student_id, Is_Verified=False)
    except Student.DoesNotExist:
        return Response({"error": "Student not found or already verified"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Resend OTP
    if resend == "true":
        new_OTP = str(random.randint(100000, 999999))
        student.OTP_Digits = new_OTP
        student.OTP_Expiry = timezone.now() + datetime.timedelta(minutes=10)
        student.save()

        send_mail(
            subject="Your New OTP Code",
            message=f"Your new OTP is {new_OTP}. It will expire in 10 minute.",
            from_email="CollegeLMS.gcbskp.edu.pk",
            recipient_list=[student.Student_Email],
            fail_silently=False,
        )
        return Response({"message": f"New OTP sent to {student.Student_Email}"}, status=status.HTTP_200_OK)

    # ✅ Verify OTP
    if OTP and student.OTP_Digits == OTP and student.OTP_Expiry and student.OTP_Expiry > timezone.now():
        student.Is_Verified = True
        student.Is_Registered = True
        student.OTP_Digits = None
        student.OTP_Expiry = None
        student.save()
        return Response({"message": f"OTP verified successfully for {student.Student_Email}"}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import Student, Teacher

@csrf_exempt
@api_view(['POST'])
def Login(request):
    data = request.data
    role = data.get('Role')
    email = data.get('Email')
    password = data.get('Password')

    # if not role or not email or not password:
    #     return Response({'error': 'Role, Email, and Password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # ---------- Student Login ----------
    if role == "Student":
        try:
            student = Student.objects.get(Student_Email=email)
            if check_password(password, student.Student_Password) and student.Is_Registered and student.Is_Verified:
                return Response({'message': 'Login successful (Student)'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid password or account not verified'}, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({'error': 'Student account not found'}, status=status.HTTP_404_NOT_FOUND)

    # ---------- Teacher Login ----------
    elif role == "Teacher":
        try:
            teacher = Teacher.objects.get(Teacher_Email=email)
            if check_password(password, teacher.Teacher_Password):
                return Response({'message': 'Login successful (Teacher)'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher account not found'}, status=status.HTTP_404_NOT_FOUND)

    else:
        return Response({'error': 'Invalid Role'}, status=status.HTTP_400_BAD_REQUEST)

        
      
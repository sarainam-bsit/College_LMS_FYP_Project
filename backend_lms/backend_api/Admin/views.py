from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt   
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.core.mail import send_mail
from datetime import timedelta
import random, re
from django.contrib.auth.hashers import make_password, check_password
from .models import Admin
from .serializers import OTPVerifySerializer

# OTP helper
def generate_otp():
    return str(random.randint(100000, 999999))

# Password validation helper
def validate_password(password):
    errors = []
    if len(password) < 8:
        errors.append("Password must be at least 8 characters long")
    if not re.search(r'[A-Z]', password):
        errors.append("Password must contain at least one uppercase letter")
    if not re.search(r'[a-z]', password):
        errors.append("Password must contain at least one lowercase letter")
    if not re.search(r'\d', password):
        errors.append("Password must contain at least one number")
    if not re.search(r'[!@#$%^&*(),.?\":{}|<>]', password):
        errors.append("Password must contain at least one special character")
    return errors

@api_view(['POST'])
def admin_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Step 1: Email validation first
    if not email:
        return Response({"errors": {"email": ["Email is required"]}}, status=status.HTTP_400_BAD_REQUEST)

    try:
        admin = Admin.objects.get(Admin_Email=email)
    except Admin.DoesNotExist:
        return Response({"errors": {"email": ["Email not found"]}}, status=status.HTTP_404_NOT_FOUND)

    # Step 2: Password required check
    if not password:
        return Response({"errors": {"password": ["Password is required"]}}, status=status.HTTP_400_BAD_REQUEST)

    # Step 3: First-time login (password not saved yet)
    if not admin.Admin_Password:
        password_errors = validate_password(password)
        if password_errors:
            return Response({"errors": {"password": password_errors}}, status=status.HTTP_400_BAD_REQUEST)

        # Save password & generate OTP
        admin.Temp_Password = make_password(password)
        otp = generate_otp()
        admin.OTP_Digits = otp
        admin.OTP_Expiry = timezone.now() + timedelta(minutes=5)
        admin.Is_Verified = False
        admin.save()
        print(f"Admin OTP for {email}: {otp}")
        return Response({
            "message": "First-time login. OTP generated. Please verify.",
            "admin_id": admin.id
        }, status=status.HTTP_200_OK)

    # Step 4: Existing account (just check password)
    if not check_password(password, admin.Admin_Password):
        return Response({"errors": {"password": ["Incorrect password"]}}, status=status.HTTP_400_BAD_REQUEST)

    # Step 5: Successful login
    return Response({
        "message": "Login Successful.",
        "admin_id": admin.id
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_otp(request):
    serializer = OTPVerifySerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']

        try:
            admin = Admin.objects.get(Admin_Email=email)
        except Admin.DoesNotExist:
            return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

        if admin.OTP_Digits != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        if timezone.now() > admin.OTP_Expiry:
            return Response({"error": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

        if admin.Temp_Password:
            admin.Admin_Password = admin.Temp_Password
            admin.Temp_Password = None

        admin.Is_Verified = True
        admin.OTP_Digits = None
        admin.OTP_Expiry = None
        admin.save()
        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def resend_otp(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        admin = Admin.objects.get(Admin_Email=email)
    except Admin.DoesNotExist:
        return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

    # Check if existing OTP is still valid
    if admin.OTP_Digits and admin.OTP_Expiry and timezone.now() < admin.OTP_Expiry:
        remaining_seconds = int((admin.OTP_Expiry - timezone.now()).total_seconds())
        return Response(
            {"error": f"OTP is still valid. Please wait {remaining_seconds} seconds to resend."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Generate new OTP if expired or not exists
    otp = generate_otp()
    admin.OTP_Digits = otp
    admin.OTP_Expiry = timezone.now() + timedelta(minutes=5)
    admin.Is_Verified = False
    admin.save()
    print(f"Resent OTP for {email}: {otp}")

    return Response({"message": "New OTP sent"}, status=status.HTTP_200_OK)

@csrf_exempt    
@api_view(['POST'])
def admin_forget_password(request):
    email = request.data.get('email')   # ✅ lowercase

    if not email:
        return Response({'errors': {'email': ['Email is required']}}, status=400)

    try:
        admin = Admin.objects.get(Admin_Email=email)
    except Admin.DoesNotExist:
        return Response({'errors': {'email': ['Admin not found']}}, status=404)

    otp = generate_otp()
    expiry = timezone.now() + timedelta(minutes=5)

    admin.OTP_Digits = otp
    admin.OTP_Expiry = expiry
    admin.Is_Verified = False
    admin.save()

    send_mail(
        subject="Your OTP for Admin Password Reset",
        message=f"Your OTP is {otp}. It will expire in 5 minutes.",
        from_email="CollegeLMS.gcbskp.edu.pk",
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({"message": "OTP sent to admin email"}, status=200)


@csrf_exempt
@api_view(['POST'])
def admin_reset_password(request):
    email = request.data.get('email')   # ✅ lowercase
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    errors = {}

    if not email:
        errors['email'] = ["Email is required."]
    if not new_password:
        errors['new_password'] = ["New password is required."]
    if not confirm_password:
        errors['confirm_password'] = ["Confirm password is required."]

    if errors:
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

    try:
        admin = Admin.objects.get(Admin_Email=email)
    except Admin.DoesNotExist:
        return Response({'errors': {'email': ['Admin not found']}}, status=404)
    if not admin.Admin_Password:
        return Response({'errors': {'password': ['Cannot reset password. No existing password found.']}}, status=400)

    password_errors = validate_password(new_password)
    if password_errors:
        errors['new_password'] = password_errors

    if new_password != confirm_password:
        errors['confirm_password'] = ["Passwords do not match."]

    if errors:
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

    admin.Admin_Password = make_password(new_password)
    admin.save()

    return Response({'message': 'Admin password reset successful'}, status=status.HTTP_200_OK)
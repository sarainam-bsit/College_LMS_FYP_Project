from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
import random
from django.contrib.auth.hashers import make_password, check_password
from .models import Admin
from .serializers import AdminLoginSerializer, OTPVerifySerializer

# OTP helper
def generate_otp():
    return str(random.randint(100000, 999999))

@api_view(['POST'])
def admin_login(request):
    serializer = AdminLoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            admin = Admin.objects.get(Admin_Email=email)
        except Admin.DoesNotExist:
            return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

        # First-time login: password not set
        if not admin.Admin_Password:
            admin.Admin_Password = make_password(password)
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

        # Password check
        if not check_password(password, admin.Admin_Password):
            return Response({"error": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)

        # Successful login
        return Response({
            "message": "Login successful. Redirect to home page.",
            "admin_id": admin.id
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    otp = generate_otp()
    admin.OTP_Digits = otp
    admin.OTP_Expiry = timezone.now() + timedelta(minutes=5)
    admin.Is_Verified = False
    admin.save()
    print(f"Resent OTP for {email}: {otp}")

    return Response({"message": "OTP resent"}, status=status.HTTP_200_OK)

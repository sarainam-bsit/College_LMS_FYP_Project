from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from Account.models import Student
from .models import HostelDetails, RoomDetail, HostelApplication, HostelCancelApplication
from .serializers import HostelDetailSerializer, RoomDetailSerializer, HostelApplicationSerializer, HostelCancelApplicationSerializer


# Create your views here.
class HostelDetailViewSet(viewsets.ModelViewSet):
    queryset = HostelDetails.objects.all()
    serializer_class = HostelDetailSerializer
    
    

class RoomDetailViewSet(viewsets.ModelViewSet):
    queryset = RoomDetail.objects.all()
    serializer_class = RoomDetailSerializer



class HostelApplicationViewSet(viewsets.ModelViewSet):
    queryset = HostelApplication.objects.all()
    serializer_class = HostelApplicationSerializer
    def get_queryset(self):
        student_id = self.request.query_params.get("student_id")
        

        if student_id and student_id.lower() != "null":  # 'null' string ko ignore karo
            try:
                student_id = int(student_id)  # numeric me convert karo
            except ValueError:
                return HostelApplication.objects.none()  # agar invalid ID ho to empty queryset
            return HostelApplication.objects.filter(student=student_id)

        # agar student_id na ho ya 'null' ho
        return HostelApplication.objects.all() 
    

    def create(self, request, *args, **kwargs):
        email = request.data.get("Email")
        try:
            student = Student.objects.get(Student_Email=email)
        except Student.DoesNotExist:
            return Response({"error": "Email not found in student database."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data["student"] = student.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    
class HostelCancelApplicationViewSet(viewsets.ModelViewSet):
    queryset = HostelCancelApplication.objects.all()
    serializer_class = HostelCancelApplicationSerializer
    def get_queryset(self):
        student_id = self.request.query_params.get("student_id")
        

        if student_id and student_id.lower() != "null":  # 'null' string ko ignore karo
            try:
                student_id = int(student_id)  # numeric me convert karo
            except ValueError:
                return HostelCancelApplication.objects.none()  # agar invalid ID ho to empty queryset
            return HostelCancelApplication.objects.filter(student=student_id)

        # agar student_id na ho ya 'null' ho
        return HostelCancelApplication.objects.all() 
    

    def create(self, request, *args, **kwargs):
        email = request.data.get("Email")
        try:
            student = Student.objects.get(Student_Email=email)
        except Student.DoesNotExist:
            return Response({"error": "Email not found in student database."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data["student"] = student.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
  




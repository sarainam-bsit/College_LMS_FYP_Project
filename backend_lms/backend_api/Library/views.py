from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import LibraryApplication, LibraryCard
from .serializers import LibraryApplicationSerializer, LibraryCardSerializer
from Account.models import Student

class LibraryApplicationViewSet(viewsets.ModelViewSet):
    queryset = LibraryApplication.objects.all()
    serializer_class = LibraryApplicationSerializer

    def get_queryset(self):
        student_id = self.request.query_params.get("student_id")
        

        if student_id and student_id.lower() != "null":  # 'null' string ko ignore karo
            try:
                student_id = int(student_id)  # numeric me convert karo
            except ValueError:
                return LibraryApplication.objects.none()  # agar invalid ID ho to empty queryset
            return LibraryApplication.objects.filter(student=student_id)

        # agar student_id na ho ya 'null' ho
        return LibraryApplication.objects.all() 
    

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
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
    
  



class LibraryCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LibraryCard.objects.all()
    serializer_class = LibraryCardSerializer
    

    def get_queryset(self):
        student_id = self.request.query_params.get("student_id")
        if student_id:
            return LibraryCard.objects.filter(Student=student_id)
        return LibraryCard.objects.all()

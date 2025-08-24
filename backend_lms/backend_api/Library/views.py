from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import LibraryApplication, LibraryCard
from .serializers import LibraryApplicationSerializer, LibraryCardSerializer
from Account.models import Student

class LibraryApplicationViewSet(viewsets.ModelViewSet):
    queryset = LibraryApplication.objects.all().order_by("-applied_at")
    serializer_class = LibraryApplicationSerializer

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

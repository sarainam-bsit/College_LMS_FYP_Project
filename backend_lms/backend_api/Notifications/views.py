from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import action
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    # Admin hi create/update/delete kare; list kisi ko mil sakti (ya ap IsAuthenticated laga dein)
    # def get_permissions(self):
    #     if self.action in ["create", "update", "partial_update", "destroy"]:
    #         return [IsAdminUser()]
    #     return [AllowAny()]

    # filtering (admin page me full list aayegi; student/teacher side me query params use karo)
    def get_queryset(self):
        qs = super().get_queryset()
        student_id = self.request.query_params.get("student_id")
        teacher_id = self.request.query_params.get("teacher_id")
        ntype = self.request.query_params.get("type")
        unread_only = self.request.query_params.get("unread_only")

        # student ke liye: uske liye specific + for_all_students
        if student_id:
            qs = qs.filter(receiver_student_id=student_id) | qs.filter(for_all_students=True)

        # teacher ke liye
        if teacher_id:
            qs = qs.filter(receiver_teacher_id=teacher_id) | qs.filter(for_all_teachers=True)

        if ntype:
            qs = qs.filter(type=ntype)

        if unread_only in ["1", "true", "True"]:
            qs = qs.filter(is_read=False)

        return qs

    # simple mark-read action (global flag)
    @action(detail=True, methods=["post"])
    def mark_read(self, request, pk=None):
        n = self.get_object()
        n.is_read = True
        n.save()
        return Response({"message": "Marked as read"}, status=status.HTTP_200_OK)

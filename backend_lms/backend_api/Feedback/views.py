
from rest_framework import viewsets, permissions
from .models import Feedback
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import FeedbackSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all().order_by("-created_at")
    serializer_class = FeedbackSerializer

    # def get_permissions(self):
    #     # Students/Teachers = Sirf POST (send message)
    #     # Admin = sab kuch (GET, PUT, DELETE)
    #     if self.action in ["create"]:
    #         return [permissions.AllowAny()]  # anyone can send
    #     return [permissions.IsAdminUser()]   # only admin can view/delete/update
    @action(detail=True, methods=['put'])
    def approve(self, request, pk=None):
        fb = self.get_object()
        fb.is_approved = True
        fb.save()
        return Response({"status": "Feedback approved"})
    
    @action(detail=True, methods=['put'])
    def mark_seen(self, request, pk=None):
        message = self.get_object()
        message.is_seen = True
        message.save()
        return Response({"status": "Message marked as seen"})


from rest_framework import viewsets, permissions
from .models import Contact
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by("-created_at")
    serializer_class = ContactSerializer

    # def get_permissions(self):
    #     # Students/Teachers = Sirf POST (send message)
    #     # Admin = sab kuch (GET, PUT, DELETE)
    #     if self.action in ["create"]:
    #         return [permissions.AllowAny()]  # anyone can send
    #     return [permissions.IsAdminUser()]   # only admin can view/delete/update
    
    
    @action(detail=True, methods=['put'])
    def mark_seen(self, request, pk=None):
        message = self.get_object()
        message.is_seen = True
        message.save()
        return Response({"status": "Message marked as seen"})

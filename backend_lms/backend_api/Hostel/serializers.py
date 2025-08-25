from rest_framework import serializers
from .models import HostelDetails, RoomDetail, HostelApplication, HostelCancelApplication
class HostelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model= HostelDetails
        fields = "__all__"
        

class RoomDetailSerializer(serializers.ModelSerializer):
    rooms = serializers.CharField(source='room_type.Hostel_Rooms_Name', read_only=True)
    class Meta:
        model = RoomDetail
        fields = ['id','room_type', 'rent', 'ac', 'attached_bathroom', 'wifi', 'total_room', 'booked_room', 'available_room', 'tv', 'wardrobe', 'study_table',
                  'common_area', 'mess_facility', 'laundry_facility', 'room_image', 'description', 'rooms']


class HostelApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model= HostelApplication
        fields = "__all__"
        
        
class HostelCancelApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model= HostelCancelApplication
        fields = "__all__"
from django.contrib import admin
from .models import HostelDetails, RoomDetail, HostelApplication, HostelCancelApplication
# Register your models here.
@admin.register(HostelDetails)
class HostelDetailAdmin(admin.ModelAdmin):
    list_display = ['id', 'Hostel_Rooms_Name',]



@admin.register(RoomDetail)
class RoomDetailAdmin(admin.ModelAdmin):
    list_display = ('room_type',  'rent', 
                    'ac', 'attached_bathroom', 'wifi', 'tv', 'wardrobe', 'study_table', 
                    'common_area', 'mess_facility', 'laundry_facility')
    list_filter = ( 'room_type', 'ac', 'attached_bathroom', 'wifi')



@admin.register(HostelApplication)
class HostelApplicationAdmin(admin.ModelAdmin):
    list_display = ['id', ]

@admin.register(HostelCancelApplication)
class HostelCancelApplicationAdmin(admin.ModelAdmin):
    list_display = ['id', ]
        
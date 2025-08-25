from django.urls import path, include
from .views import HostelDetailViewSet, RoomDetailViewSet, HostelApplicationViewSet, HostelCancelApplicationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('hosteldetail', HostelDetailViewSet)
router.register('roomdetail', RoomDetailViewSet)
router.register('hostelapplication', HostelApplicationViewSet)
router.register('hostelcancelapplication', HostelCancelApplicationViewSet)


urlpatterns = [
    path('', include(router.urls)),
    
]

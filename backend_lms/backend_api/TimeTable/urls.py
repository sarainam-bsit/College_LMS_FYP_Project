from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TimetableViewSet, DateSheetViewSet

router = DefaultRouter()
router.register('timetable', TimetableViewSet, basename='timetable')
router.register('datesheet', DateSheetViewSet, basename='datesheet')

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path, include
from .views import LectureViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('lectures', LectureViewSet, basename='course-categories')

urlpatterns = [
    path('', include(router.urls)),
    
]

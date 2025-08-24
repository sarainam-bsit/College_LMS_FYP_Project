from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseTaskViewSet

router = DefaultRouter()
router.register('tasks', CourseTaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

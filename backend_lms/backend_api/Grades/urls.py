from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GradeViewSet, StudentGradeHistoryViewSet

router = DefaultRouter()
router.register('grades', GradeViewSet, basename='grade')
router.register('student-history', StudentGradeHistoryViewSet, basename='student-history')

urlpatterns = [
    path('', include(router.urls)),
]

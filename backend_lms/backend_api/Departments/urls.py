from django.urls import path, include
from .views import DepartmentViewSet, CategoriesViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('dept_api', DepartmentViewSet)
router.register('course-categories', CategoriesViewSet, basename='course-categories')

urlpatterns = [
    path('', include(router.urls)),
    
]

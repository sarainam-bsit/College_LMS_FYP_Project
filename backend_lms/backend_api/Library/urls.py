from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LibraryApplicationViewSet, LibraryCardViewSet

router = DefaultRouter()
router.register('libraryform', LibraryApplicationViewSet, basename="libraryform")
router.register('cards', LibraryCardViewSet, basename='librarycard')

urlpatterns = [
    path('', include(router.urls)),
]

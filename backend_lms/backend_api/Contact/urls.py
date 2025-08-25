# Contact/urls.py
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet

router = DefaultRouter()
router.register('contact', ContactViewSet, basename='contact')

urlpatterns = router.urls

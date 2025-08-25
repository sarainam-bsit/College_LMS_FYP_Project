# Contact/urls.py
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet

router = DefaultRouter()
router.register('feedback', FeedbackViewSet, basename='contact')

urlpatterns = router.urls

from django.urls import path, include
from .views import FeeVoucherViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('fee-voucher', FeeVoucherViewSet)


urlpatterns = [
    path('', include(router.urls)),
    
]

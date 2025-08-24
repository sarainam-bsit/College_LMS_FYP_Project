from django.contrib import admin
from .models import FeeVoucher
# Register your models here.
@admin.register(FeeVoucher)
class FeeVoucherAdmin(admin.ModelAdmin):
    list_display =['id', 'Challan_no', 'Challan_Type']

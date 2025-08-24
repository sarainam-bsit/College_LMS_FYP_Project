from django.contrib import admin
from .models import LibraryApplication, LibraryCard

# Register your models here.
admin.site.register(LibraryApplication)
admin.site.register(LibraryCard)
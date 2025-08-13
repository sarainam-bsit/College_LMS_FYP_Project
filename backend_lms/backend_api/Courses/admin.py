from django.contrib import admin
from .models import Course
from django.urls import path
from django.http import JsonResponse
from Departments.models import CourseCategories
# Register your models here.
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('C_Code', 'C_Title', 'C_Department', 'C_Category', 'Teacher')

    class Media:
        js = ('admin/js/dependent_dropdown.js',)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                'get-categories/<int:department_id>/',
                self.admin_site.admin_view(self.get_categories),
                name='get_categories'
            ),
        ]
        return custom_urls + urls

    def get_categories(self, request, department_id):
        if not request.user.is_superuser:
            return JsonResponse([], safe=False)  # Superadmin ke alawa empty list
        categories = CourseCategories.objects.filter(Department_id=department_id)
        data = [{"id": c.id, "name": c.Category_Name} for c in categories]
        return JsonResponse(data, safe=False)
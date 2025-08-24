from django.apps import AppConfig

class GradesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Grades'

    def ready(self):
        import Grades.signals
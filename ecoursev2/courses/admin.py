from django.contrib import admin
from .models import Category, Courses, Lesson
# Register your models here

admin.site.register(Category)
admin.site.register(Courses)
admin.site.register(Lesson)

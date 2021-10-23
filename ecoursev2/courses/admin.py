from django.contrib import admin
from .models import Category, Comment, Courses, Lesson
# Register your models here

admin.site.register(Category)
admin.site.register(Courses)
admin.site.register(Lesson)
admin.site.register(Comment)

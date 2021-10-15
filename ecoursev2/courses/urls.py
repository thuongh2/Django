from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

routers = routers.DefaultRouter()
routers.register('categories', views.CategoryViewSet, 'categories')
routers.register('courses', views.CourseViewSet, 'courses')
routers.register('lesson', views.LessonViewSet, 'lesson')

urlpatterns = [
    path('', include(routers.urls)),
]

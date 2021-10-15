from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

routers = routers.DefaultRouter()
routers.register('categories', views.CategoryViewSet, 'categories')
routers.register('courses', views.CourseViewSet, 'courses')
routers.register('lesson', views.LessonViewSet, 'lesson')
routers.register('users', views.UserViewSet, 'user')


urlpatterns = [
    path('', include(routers.urls)),
    path('oauth2-info/', views.AuthInfo.as_view(), name='oauth-info')
]

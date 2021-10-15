from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from .models import Category, Courses, Lesson, Tags, User
from .serializers import (CategorySerializer,
                          CoursesSerializer,
                          LessonDetailSerializer,
                          LessonSerializer,
                          UserSerializer,)
from .paginator import BasePaginator
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404
from django.conf import settings
# Create your views here.


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    pagination_class = BasePaginator  # so trang
    serializer_class = CoursesSerializer

    def get_queryset(self):

        courses = Courses.objects.filter(active=True)

        q = self.request.query_params.get('q')  # lay input trong url vd ?q=abc
        if q is not None:
            # lay khoa hoc co ki tu
            courses = courses.filter(subject__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id is not None:
            # lay khoa hoc co danh muc id
            courses = courses.filter(category_id=cate_id)

        return courses

    # dinh nghia phuong thuc truy cap, detail true co pk
    @action(methods=['GET'], detail=True, url_path='lesson')
    def get_lessons(self, request, pk):
        course = Courses.objects.get(pk=pk)
        lesson = course.lesson.filter(active=True)

        kw = request.query_params.get('kw')
        if kw is not None:
            lesson = lesson.filter(subject__icontains=kw)

        return Response(LessonSerializer(lesson, many=True).data, status=status.HTTP_200_OK)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.filter(active=True)
    serializer_class = LessonDetailSerializer

    @action(methods=['POST'], detail=True, url_path='tags')
    def add_tag(self, request, pk):
        try:
            lesson = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            tags = request.data.get('tag')
            if tags is not None:
                for tag in tags:
                    t, _ = Tags.objects.get_or_create(name=tag)
                    lesson.tag.add(t)
                lesson.save()

                return Response(self.serializer_class(lesson).data, status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail = True, url_path='add-comment')
    def add_comments(self, request,pk):
        pass
class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action =='get_current':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


    @action(methods=["GET"], detail=False, url_path='get-current')
    def get_current(self, request):
        return Response(self.serializer_class(request.user).data, status=status.HTTP_200_OK)

class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)

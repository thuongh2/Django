from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from .models import Category, Comment, Courses, Lesson, LessonView, Tags, User, Action, Rating
from .serializers import (CategorySerializer, CommentSerializer,
                          CoursesSerializer,
                          LessonDetailSerializer,
                          LessonSerializer, LessonViewSerializer,
                          UserSerializer,
                          ActionSerializer,
                          RatingSerializer)
from .paginator import BasePaginator
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import Http404
from django.conf import settings
from django.db.models import F
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

        return Response(LessonSerializer(lesson, many=True, context={'request': request}).data, status=status.HTTP_200_OK)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.filter(active=True)
    serializer_class = LessonDetailSerializer

    def get_permissions(self):
        if self.action == ["add_comments", 'take_action', 'rating_action']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

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

    @action(methods=['POST'], detail=True, url_path='add-comment')
    def add_comments(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.objects.create(
                content=content, lesson=self.get_object(), creator=request.user)
            return Response(CommentSerializer(c).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=True, url_path='like')
    def take_action(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except IndexError or ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            action = Action.objects.create(
                type=action_type, creator=request.user, lesson=self.get_object())
            return Response(ActionSerializer(action).data, status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail=True, url_path='rating')
    def rating_action(self, request, pk):
        try:
            rating_type = int(request.data['rate'])
        except IndexError or ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            action = Rating.objects.create(
                rate=rating_type, creator=request.user, lesson=self.get_object())
            return Response(RatingSerializer(action).data, status=status.HTTP_201_CREATED)

    @action(methods=['GET'], detail=True, url_path='views')
    def inc_view(self, request, pk):
        v, _ = LessonView.objects.get_or_create(lesson=self.get_object())
        v.views = F('views') + 1 #ham f chay xuong xem truoc co bao nhieu view +1
        v.save()
        v.refresh_from_db()

        return Response(LessonViewSerializer(v).data, status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'get_current':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=["GET"], detail=False, url_path='get-current')
    def get_current(self, request):
        return Response(self.serializer_class(request.user).data, status=status.HTTP_200_OK)


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)

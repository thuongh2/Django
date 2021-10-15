from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Category, Courses, Lesson, Tags

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields ="__all__"


class CoursesSerializer(ModelSerializer):
    image= SerializerMethodField()

    def get_image(self, courses):
        request = self.context['request']
        name =courses.image.name
        if name.startswith('static/'):
            path ='%s' % name
        else:
            path ='/static/%s' % name
        return request.build_absolute_uri(path)
        
    class Meta:
        model = Courses
        fields = ['id', 'subject', 'image', 'created_date','category']

class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields =['id', 'subject','content', 'image', 'created_date', 'update_date', 'courses', 'tag']


class TagSerializer(ModelSerializer):
    class Meta:
        model =Tags
        fields = '__all__'


class LessonDetailSerializer (LessonSerializer):
    tag = TagSerializer(many= True)
    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tag']


from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Action, Category, Comment, Courses, Lesson, Rating, Tags, User, LessonView

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields ="__all__"


class UserSerializer(ModelSerializer):

    def create(self, validated_data):
        user = User(**validated_data)
        #{"user_name": user, "password": 1234}
        #(user_name: 'user', password: 1234)
        user.set_password(user.password)
        user.save()
        return user


    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'date_joined']
        extr_kwargs = {
            'password': {'write_only': 'True'}
            }        


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
    image= SerializerMethodField()

    def get_image(self, lesson):
        request = self.context['request']
        name = lesson.image.name
        if name.startswith('static/'):
            path ='%s' % name
        else:
            path ='/static/%s' % name
        return request.build_absolute_uri(path)

    class Meta:
        model = Lesson
        fields =['id', 'subject','content', 'image', 'created_date', 'update_date', 'courses', 'tag']



class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields =['id', 'content', 'created_date', 'updated_date']

class TagSerializer(ModelSerializer):
    class Meta:
        model =Tags
        fields = '__all__'


class LessonDetailSerializer (LessonSerializer):
    tag = TagSerializer(many= True)
    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['content', 'tag']

class ActionSerializer (ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'type', 'created_date']

    
class RatingSerializer (ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'rate', 'created_date']


class LessonViewSerializer (ModelSerializer):
    class Meta:
        model = LessonView
        fields = ['id', 'views','lesson']

        
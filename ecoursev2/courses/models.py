from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to = 'upload/%Y/%m')


class Category(models.Model):
    name = models.CharField(max_length=100, null=False,  unique=True)
    
    def __str__(self):
        return self.name


class MyModelBase(models.Model):
    subject = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to='courses/%Y/%m', default = None, null=False)
    created_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.subject

    class Meta:
        abstract = True # co khong tao bang


class Courses (MyModelBase):
    class Meta:
        unique_together =('subject', 'category') # cung 1 danh muc khong duoc phep trung ten    
        ordering =['-id']

    description = models.TextField(default= None)
    category = models.ForeignKey(Category, on_delete= models.SET_NULL, null=True)

class Lesson (MyModelBase):
    class Meta:
        unique_together =('subject', 'courses')

    content = models.TextField()
    courses = models.ForeignKey(Courses, on_delete= models.CASCADE, related_name='lesson')
    tag = models.ManyToManyField("Tags", related_name='lesson', blank=True, null=True)


class Comment(models.Model):
    content = models.TextField()
    lesson = models.ForeignKey(Lesson, related_name='lesson', blank= True, on_delete= models.CASCADE)
    creator = models.ForeignKey(User, on_delete= models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now= True)

    def __str__(self):
        return self.content


class Tags(models.Model):
    name = models.CharField(max_length=50, unique = True)

    def __str__(self):
        return self.name


class ActionBase(models.Model):
    lesson = models.ForeignKey(Lesson,  on_delete= models.CASCADE)
    creator = models.ForeignKey(User, on_delete= models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now= True)

    class Meta:
        abstract = True

class Action(ActionBase):
    LIKE, HAHA, HEART = range(3)
    ACTIONS = [
        (LIKE, 'like'),
        (HAHA, 'haha'),
        (HEART, 'heart')
    ]
    type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


class Rating (ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)


class LessonView (models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    lesson = models.OneToOneField(Lesson,  on_delete= models.CASCADE)
    

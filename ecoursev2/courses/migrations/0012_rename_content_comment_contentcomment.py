# Generated by Django 3.2.8 on 2021-10-23 00:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0011_remove_lessonview_creator'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='content',
            new_name='contentComment',
        ),
    ]

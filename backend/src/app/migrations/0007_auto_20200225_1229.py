# Generated by Django 2.2.6 on 2020-02-25 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20200223_2136'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacherprofile',
            name='username',
        ),
        migrations.AddField(
            model_name='teacherprofile',
            name='profile_pic',
            field=models.ImageField(default='fdsgf', upload_to='pic'),
        ),
    ]

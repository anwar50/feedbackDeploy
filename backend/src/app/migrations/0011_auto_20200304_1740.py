# Generated by Django 2.2.6 on 2020-03-04 17:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_auto_20200304_1255'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answersbank',
            old_name='question_1',
            new_name='total_mark_for_question',
        ),
        migrations.RenameField(
            model_name='answersbank',
            old_name='question_10',
            new_name='total_sub_marks',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_11',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_12',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_13',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_14',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_15',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_16',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_17',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_18',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_19',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_2',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_20',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_21',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_22',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_23',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_24',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_25',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_26',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_27',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_28',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_29',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_3',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_30',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_31',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_32',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_33',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_34',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_35',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_36',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_37',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_38',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_39',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_4',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_40',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_41',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_42',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_43',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_44',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_45',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_46',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_47',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_48',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_49',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_5',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_50',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_6',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_7',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_8',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='question_9',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='total_correct',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='total_incorrect',
        ),
        migrations.RemoveField(
            model_name='answersbank',
            name='total_mark',
        ),
        migrations.AddField(
            model_name='test',
            name='num_subquestions',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
            preserve_default=False,
        ),
    ]

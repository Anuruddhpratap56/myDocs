# Generated by Django 5.0.1 on 2024-02-06 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_remove_users_subject_users_about_users_age_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='role',
            field=models.CharField(default=False),
        ),
    ]

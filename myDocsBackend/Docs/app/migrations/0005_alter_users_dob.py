# Generated by Django 5.0.1 on 2024-02-06 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_users_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='dob',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

# Generated by Django 5.0.2 on 2024-03-14 18:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0025_alter_customuser_unread_notices_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='unread_notices_count',
        ),
    ]

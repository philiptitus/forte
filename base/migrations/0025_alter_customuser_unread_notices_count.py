# Generated by Django 5.0.2 on 2024-03-14 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0024_customuser_unread_notices_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='unread_notices_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]

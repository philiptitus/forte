# Generated by Django 5.0.2 on 2024-02-19 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_reviews_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accommodations',
            name='cleared',
        ),
    ]
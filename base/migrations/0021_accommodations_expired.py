# Generated by Django 5.0.2 on 2024-03-14 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0020_reviews_date_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='accommodations',
            name='expired',
            field=models.BooleanField(default=False),
        ),
    ]
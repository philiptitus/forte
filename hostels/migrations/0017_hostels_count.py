# Generated by Django 5.0.2 on 2024-03-15 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0016_hostels_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostels',
            name='count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]

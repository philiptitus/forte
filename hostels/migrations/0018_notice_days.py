# Generated by Django 5.0.2 on 2024-03-15 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0017_hostels_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='notice',
            name='days',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]

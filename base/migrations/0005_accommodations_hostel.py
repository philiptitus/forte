# Generated by Django 5.0.2 on 2024-02-14 13:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_room_customuser_hostel'),
        ('hostels', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='accommodations',
            name='hostel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hostels.hostels'),
        ),
    ]

# Generated by Django 5.0.2 on 2024-02-14 14:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_accommodations_hostel'),
        ('hostels', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaints',
            name='hostel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hostels.hostels'),
        ),
    ]

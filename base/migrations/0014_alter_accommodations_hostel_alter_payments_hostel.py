# Generated by Django 5.0.2 on 2024-02-23 10:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_remove_payments_status_payments_hostel_payments_user_and_more'),
        ('hostels', '0006_rename_image_hostels_imag1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodations',
            name='hostel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hostels.hostels'),
        ),
        migrations.AlterField(
            model_name='payments',
            name='hostel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hostels.hostels'),
        ),
    ]
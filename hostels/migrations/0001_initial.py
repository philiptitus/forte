# Generated by Django 5.0.2 on 2024-02-14 12:20

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Facilities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facility_type', models.CharField(choices=[('Bed', 'Bed'), ('Desk', 'Desk'), ('Chair', 'Chair'), ('Wardrobe', 'Wardrobe'), ('Shelf', 'Shelf'), ('Locker', 'Locker'), ('Lighting', 'Lighting'), ('Heating', 'Heating'), ('Ventilation', 'Ventilation'), ('Internet', 'Internet'), ('Power Outlets', 'Power Outlets'), ('Waste Bin', 'Waste Bin'), ('Curtains', 'Curtains'), ('Mirror', 'Mirror'), ('Fire Extinguisher', 'Fire Extinguisher'), ('Smoke Detector', 'Smoke Detector'), ('Emergency Exit', 'Emergency Exit'), ('Security Camera', 'Security Camera'), ('Common Area', 'Common Area'), ('Laundry Facilities', 'Laundry Facilities'), ('Kitchen', 'Kitchen'), ('Bathroom', 'Bathroom'), ('Toilet', 'Toilet')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Hostels',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostel_name', models.CharField(max_length=100)),
                ('stripe_key', models.CharField(blank=True, max_length=100, null=True)),
                ('address', models.TextField()),
                ('capacity', models.PositiveIntegerField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag2', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag3', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag4', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag5', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag6', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag7', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag8', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag9', models.ImageField(blank=True, null=True, upload_to='')),
                ('imag10', models.ImageField(blank=True, null=True, upload_to='')),
                ('administrator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(default='Default message')),
                ('notification_type', models.CharField(choices=[('follow', 'Follow Request'), ('like', 'Like Notification'), ('comment', 'Comment Notification'), ('chat', 'Chat Notification'), ('account', 'Account Notification')], default='like', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_read', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_number', models.CharField(max_length=10)),
                ('capacity', models.CharField(blank=True, choices=[('1', '1'), ('2', '2'), ('4', '4')], max_length=20, null=True)),
                ('isAvailable', models.BooleanField(default=True)),
                ('current_occupancy', models.PositiveIntegerField()),
                ('damages', models.BooleanField(default=False)),
                ('cost_of_damage', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('hostel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostels.hostels')),
            ],
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')], max_length=20)),
                ('date_raised', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_resolved', models.DateTimeField(blank=True, null=True)),
                ('facility', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hostels.facilities')),
                ('hostel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostels.hostels')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hostels.rooms')),
            ],
        ),
    ]

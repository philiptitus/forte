# Generated by Django 5.0.2 on 2024-02-20 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0004_hostels_room_price_1_hostels_room_price_2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rooms',
            name='room_number',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]

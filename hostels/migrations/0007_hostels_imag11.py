# Generated by Django 5.0.2 on 2024-03-02 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0006_rename_image_hostels_imag1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostels',
            name='imag11',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=''),
        ),
    ]
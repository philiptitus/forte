# Generated by Django 5.0.2 on 2024-03-14 15:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_accommodations_expired'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accommodations',
            name='expired',
        ),
    ]

# Generated by Django 5.0.2 on 2024-03-08 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0009_alter_hostels_stripe_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostels',
            name='gender',
            field=models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], max_length=10, null=True, verbose_name='Gender'),
        ),
    ]

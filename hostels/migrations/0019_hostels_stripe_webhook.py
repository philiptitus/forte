# Generated by Django 5.0.2 on 2024-04-20 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0018_notice_days'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostels',
            name='stripe_webhook',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]

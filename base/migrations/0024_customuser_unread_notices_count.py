# Generated by Django 5.0.2 on 2024-03-14 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_accommodations_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='unread_notices_count',
            field=models.PositiveIntegerField(default=0, editable=False),
        ),
    ]

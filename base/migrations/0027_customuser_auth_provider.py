# Generated by Django 5.0.2 on 2024-04-02 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0026_remove_customuser_unread_notices_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='auth_provider',
            field=models.CharField(default='email', max_length=50),
        ),
    ]
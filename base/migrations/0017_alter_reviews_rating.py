# Generated by Django 5.0.2 on 2024-03-03 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_onetimepassword'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='rating',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]

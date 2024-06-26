# Generated by Django 5.0.2 on 2024-02-20 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostels', '0005_alter_rooms_room_number'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hostels',
            old_name='image',
            new_name='imag1',
        ),
        migrations.AlterField(
            model_name='notice',
            name='notification_type',
            field=models.CharField(choices=[('maintenance', 'maintenance'), ('complaints', 'complaints'), ('payment', 'payment'), ('accomodation', 'accomodation'), ('account', 'account')], default='like', max_length=20),
        ),
    ]

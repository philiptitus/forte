import random
from faker import Faker
from django.utils import timezone
from base.models import CustomUser
from hostels.models import *


fake = Faker()

# Get the student with ID 2
student = CustomUser.objects.get(pk=2)

# Get existing hostels, rooms, and facilities
existing_hostels = Hostels.objects.all()
existing_rooms = Rooms.objects.all()
existing_facilities = Facilities.objects.all()

# Choices for maintenance status
status_choices = ['Pending', 'In Progress', 'Completed']

# Generate maintenance requests
for _ in range(15):
    # Randomly choose a hostel, room, and facility
    hostel = random.choice(existing_hostels)
    room = random.choice(existing_rooms.filter(hostel=hostel))
    facility = random.choice(existing_facilities)
    
    # Randomly choose status
    status = random.choice(status_choices)
    
    # Create maintenance request
    maintenance_request = Maintenance.objects.create(
        student=student,
        hostel=hostel,
        room=room,
        facility=facility,
        status=status,
        date_raised=fake.date_time_between(start_date='-1y', end_date='now'),
        resolved=status == 'Completed',
        date_resolved=fake.date_time_between(start_date='-1y', end_date='now') if status == 'Completed' else None
    )
    maintenance_request.save()

print("Maintenance requests created successfully.")

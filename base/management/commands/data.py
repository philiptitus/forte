import os
import django
from faker import Faker
import random

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

from base.models import *
from hostels.models import *

# Initialize Faker
fake = Faker()

# Get existing users, rooms, and hostel
users = list(CustomUser.objects.all())
rooms = list(Rooms.objects.filter(hostel_id=8))
hostel = Hostels.objects.get(id=8)

# Create complaints
complaint_statuses = ['Open', 'In Progress', 'Resolved']
for _ in range(20):
    user = random.choice(users)
    status = 'Open'
    Complaints.objects.create(
        hostel=hostel,
        student=user,
        description=fake.text(),
        status=status,
        resolved=False
    )

# Create maintenance requests
maintenance_statuses = ['Pending', 'In Progress', 'Completed']
facilities = list(Facilities.objects.all())
for _ in range(20):
    user = random.choice(users)
    room = random.choice(rooms)
    facility = random.choice(facilities) if facilities else None
    status = 'Pending'
    Maintenance.objects.create(
        hostel=hostel,
        student=user,
        room=room,
        facility=facility,
        status=status,
        resolved=False
    )

print("20 complaints and 20 maintenance requests have been created.")

import random
from faker import Faker
from django.utils import timezone
from base.models import *
from hostels.models import *

from faker import Faker
import random

def create_fake_data():
    # Create Faker instance
    fake = Faker()

    # Get the CustomUser model
    User = CustomUser

    # Create 30 users of type "student" and assign them to hostel with ID 1
    users = []
    for _ in range(30):
        email = fake.email()

        user = User.objects.create(
            username=email,  # Use email as the username

            email=fake.email(),
            hostel_id=1,  # Assign to hostel with ID 1
            user_type='student'
        )
        users.append(user)

    # Create 30 active accommodations for the created users in hostel with ID 1
    accommodations = []
    for user in users:
        accommodation = Accommodations.objects.create(
            student=user,
            hostel_id=1,  # Assign to hostel with ID 1
            check_in_date=fake.date_between(start_date='-1y', end_date='today'),
            status='Active',
        )
        accommodations.append(accommodation)

    # Create 50 rooms for hostel with ID 1
    rooms = []
    for _ in range(50):
        room = Hostels.objects.create(
            capacity=random.choice(['1', '2', '4']),
            current_occupancy=0,
        )
        rooms.append(room)

    # Randomly assign accommodations to rooms
    for accommodation in accommodations:
        random_room = random.choice(rooms)
        accommodation.room = random_room
        accommodation.save()

    print("Fake data created successfully!")

# Call the function to create fake data
create_fake_data()

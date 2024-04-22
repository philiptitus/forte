import random
from django.utils import timezone
from faker import Faker
from base.models import Reviews, CustomUser
from hostels.models import *

# Initialize Faker
fake = Faker()

# Get existing hostels and custom users
hostels = Hostels.objects.all()
users = CustomUser.objects.all()

# Define max review length
max_review_length = 25

# Create 1000 reviews
for _ in range(1000):
    # Choose a random hostel and user
    hostel = random.choice(hostels)
    user = random.choice(users)
    
    # Generate a fake review with random length
    review = fake.text(max_nb_chars=max_review_length)
    
    # Generate a random rating between 1 and 5
    rating = random.randint(1, 5)
    
    # Create the review instance
    review_instance = Reviews.objects.create(
        hostel=hostel,
        user=user,
        review=review,
        rating=rating,
        date_created=timezone.now()
    )
    print(f"Review created: {review_instance}")

print("Reviews creation completed.")

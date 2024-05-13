from django.utils import timezone
from django.contrib.auth import get_user_model
from faker import Faker
from base.models import *
from hostels.models import *
import random

fake = Faker()

def create_fake_reviews(hostel_id):
    User = CustomUser
    users = User.objects.all()
    hostel = Hostels.objects.get(pk=hostel_id)
    
    for _ in range(50):
        random_user = random.choice(users)
        review = fake.paragraph()
        rating = random.randint(1, 5)
        date_created = fake.date_time_between(start_date='-1y', end_date='now', tzinfo=timezone.get_current_timezone())

        Reviews.objects.create(
            hostel=hostel,
            user=random_user,
            review=review,
            rating=rating,
            date_created=date_created
        )

# Call the function to create fake reviews for hostel with id 1
create_fake_reviews(1)

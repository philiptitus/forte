from faker import Faker
from django.utils import timezone
from hostels.models import *
from random import choice
from base.models import *

fake = Faker()

# Get the hostel with ID 21
hostel = Hostels.objects.get(id=21)

# Get available users and accommodations
available_users = CustomUser.objects.all()
available_accommodations = Accommodations.objects.all()

# Create 12 payments
for _ in range(12):
    user = choice(available_users)
    accommodation = choice(available_accommodations)
    type = 'damages' if _ % 2 == 0 else 'accommodation'  # Alternate between damages and accommodation type
    amount = fake.random_number(digits=4)  # Generate a random amount for the payment
    payment_date = fake.date_between(start_date='-30d', end_date='today')  # Generate a random payment date
    payment_method = choice(['cash', 'credit_card', 'bank_transfer', 'other'])  # Choose a random payment method
    description = fake.text()  # Generate a random description for the payment

    payment = Payments.objects.create(
        hostel=hostel,
        user=user,
        accommodation=accommodation,
        type=type,
        amount=amount,
        payment_date=payment_date,
        payment_method=payment_method,
        description=description
    )
    print(f"Payment created: {payment}")

print("Payments created successfully.")

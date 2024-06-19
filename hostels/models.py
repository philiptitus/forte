from django.db import models



from base.models import CustomUser
from django.db import models
from django.utils import timezone


class Hostels(models.Model):
    hostel_name = models.CharField(max_length=100)
    stripe_key = models.CharField(max_length=1000, blank=True, null=True)
    stripe_webhook = models.CharField(max_length=1000, blank=True, null=True)



    address = models.TextField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=20, blank=True, null=True)
    gender = models.CharField('Gender', max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], null=True, blank=True)
    capacity = models.PositiveIntegerField()
    count = models.PositiveIntegerField(default=0)
    administrator = models.ForeignKey('base.CustomUser', on_delete=models.CASCADE)
    imag1 = models.ImageField(null=True, blank=True,)
    imag2 = models.ImageField(null=True, blank=True,)
    imag3 = models.ImageField(null=True, blank=True,)
    imag4 = models.ImageField(null=True, blank=True,)
    imag5 = models.ImageField(null=True, blank=True,)
    imag6 = models.ImageField(null=True, blank=True,)
    imag7 = models.ImageField(null=True, blank=True,)
    imag8 = models.ImageField(null=True, blank=True,)
    imag9 = models.ImageField(null=True, blank=True,)
    imag10 = models.ImageField(null=True, blank=True,)
    imag11 = models.ImageField(null=True, blank=True,default='/placeholder.png')

    room_price_1 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Price for rooms with 1 occupant
    room_price_2 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Price for rooms with 2 occupants
    room_price_4 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Price for rooms with 4 occupants

    def __str__(self):
        return self.hostel_name

    def staff_count(self):
        """
        Method to calculate the number of staff members in the hostel.
        """
        return CustomUser.objects.filter(hostel=self.id, user_type='staff').count()

    def student_count(self):
        """
        Method to calculate the number of student members in the hostel.
        """
        return CustomUser.objects.filter(hostel=self.id, user_type='student').count()






class Rooms(models.Model):
    hostel = models.ForeignKey(Hostels, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=10, blank=True, null = True)  # Make room_number unique
    capacity = models.CharField(max_length=20, choices=[
        ('1', '1'),
        ('2', '2'),
        ('4', '4'),

    ] ,blank=True, null=True )
    isAvailable = models.BooleanField(default=True)
    current_occupancy = models.IntegerField()
    damages = models.BooleanField(default=False)
    cost_of_damage = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Room {self.room_number} in {self.hostel}"




class Facilities(models.Model):
    FACILITY_CHOICES = [
        ('Bed', 'Bed'),
        ('Desk', 'Desk'),
        ('Chair', 'Chair'),
        ('Wardrobe', 'Wardrobe'),
        ('Shelf', 'Shelf'),
        ('Locker', 'Locker'),
        ('Lighting', 'Lighting'),
        ('Heating', 'Heating'),
        ('Ventilation', 'Ventilation'),
        ('Internet', 'Internet'),
        ('Power Outlets', 'Power Outlets'),
        ('Waste Bin', 'Waste Bin'),
        ('Curtains', 'Curtains'),
        ('Mirror', 'Mirror'),
        ('Fire Extinguisher', 'Fire Extinguisher'),
        ('Smoke Detector', 'Smoke Detector'),
        ('Emergency Exit', 'Emergency Exit'),
        ('Security Camera', 'Security Camera'),
        ('Common Area', 'Common Area'),
        ('Laundry Facilities', 'Laundry Facilities'),
        ('Kitchen', 'Kitchen'),
        ('Bathroom', 'Bathroom'),
        ('Toilet', 'Toilet'),
    ] 

    facility_type = models.CharField(max_length=100, choices=FACILITY_CHOICES)


    def __str__(self):
        return f"{self.facility_type}"


class Maintenance(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null =True, blank=True)
    hostel = models.ForeignKey(Hostels, on_delete=models.CASCADE)
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    facility = models.ForeignKey(Facilities, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed')
    ])
    date_raised = models.DateTimeField(default=timezone.now)
    resolved = models.BooleanField(default=False)
    date_resolved = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Maintenance Request {self.id}"
    





class Notice(models.Model):


    user = models.ForeignKey('base.CustomUser', on_delete=models.CASCADE)
    message = models.TextField(default='Default message')
    notification_type = models.CharField(max_length=20,  null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_read = models.BooleanField(default=False)
    days = models.PositiveIntegerField(blank = True, null =True)


    # Add other fields as needed

    def __str__(self):
        return f'{self.user.username} - {self.message}'

    def save(self, *args, **kwargs):
        
        super().save(*args, **kwargs)

        # Trigger Pusher after saving the notice



from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken





# # Cre
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)




class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True, editable=False, default=None)

    email = models.EmailField(unique=True)
    hostel = models.ForeignKey('hostels.Hostels', on_delete=models.CASCADE, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    avi = models.ImageField(null=True, blank=True, default='/avatar.png')
    isForte = models.BooleanField(default=False)
    date_of_birth = models.DateField('Date of Birth', null=True, blank=True)
    gender = models.CharField('Gender', max_length=10, choices=[('male', 'male'), ('female', 'female'), ('other', 'other')], null=True, blank=True)
    contact_number = models.CharField('Contact Number', max_length=15, null=True, blank=True)
    address = models.TextField('Address', null=True, blank=True)
    guardian_name = models.CharField('Guardian Name', max_length=255, null=True, blank=True)
    guardian_contact = models.CharField('Guardian Contact', max_length=15, null=True, blank=True)
    guardian2_name = models.CharField('Second Guardian Name', max_length=255, null=True, blank=True)
    guardian2_contact = models.CharField('Second Guardian Contact', max_length=15, null=True, blank=True)
    Id_number = models.CharField('ID NUMBER', max_length=15, null=True, blank=True)
    # hostel = models.ForeignKey('hostels.Hostels', on_delete=models.CASCADE, blank=True, null= True)
    user_type = models.CharField(max_length=20, choices=[
        ('admin', 'admin'),
        ('student', 'student'),
        ('staff', 'staff'),

    ] ,blank=True, null=True )
    is_verified = models.BooleanField(default=False)
    

    objects = CustomUserManager()
    user_permissions = models.ManyToManyField(Permission, verbose_name='user permissions', blank=True)

    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.email
    
    def tokens(self):    
        refresh = RefreshToken.for_user(self)
        return {
            "refresh":str(refresh),
            "access":str(refresh.access_token)
        }
    


from django.utils import timezone

class Accommodations(models.Model):
    DURATION_CHOICES = [
        (1, '1 month'),
        (2, '2 months'),
        (3, '3 months'),
        (4, '4 months'),
    ]

    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    room = models.ForeignKey('hostels.Rooms', on_delete=models.CASCADE, null=True, blank=True)
    hostel = models.ForeignKey('hostels.Hostels', on_delete=models.SET_NULL, null=True, blank=True)
    check_in_date = models.DateField()
    check_out_date = models.DateField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    paid = models.BooleanField(default=False)
    sent = models.BooleanField(default=False)


    status = models.CharField(max_length=20, choices=[
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
        ('Delayed Payment', 'Delayed Payment')
    ])
    duration = models.IntegerField(choices=DURATION_CHOICES, blank=True, null=True)

    def __str__(self):
        return f"Accommodation for {self.student}"










class Complaints(models.Model):
    hostel = models.ForeignKey('hostels.Hostels', on_delete=models.CASCADE, null =True, blank=True)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null =True, blank=True)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=[
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved')
    ])
    date_raised = models.DateTimeField(default=timezone.now)
    resolved = models.BooleanField(default=False)
    date_resolved = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Complaint by {self.student}"



class Reviews(models.Model):
    hostel = models.ForeignKey('hostels.Hostels', on_delete=models.CASCADE, null =True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null =True, blank=True)
    review = models.TextField()
    rating = models.IntegerField(null=True, blank=True)
    date_created = models.DateTimeField(default=timezone.now)  # Default to the current date and time


    def __str__(self):
        return f"Review by {self.user} for {self.hostel}"



class Payments(models.Model):

    PAYMENT_METHODS = [
        ('cash', 'Cash'),
        ('credit_card', 'Credit Card'),
        ('bank_transfer', 'Bank Transfer'),
        ('other', 'Other')
    ]
    PAYMENT_CURRENCIES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('GBP', 'British Pound'),
        ('JPY', 'Japanese Yen'),
        ('CNY', 'Chinese Yuan'),
        ('CAD', 'Canadian Dollar'),
        ('AUD', 'Australian Dollar'),
        ('CHF', 'Swiss Franc'),
        ('NZD', 'New Zealand Dollar'),
        ('INR', 'Indian Rupee'),
    ]
    hostel = models.ForeignKey('hostels.Hostels', on_delete=models.SET_NULL, null =True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null =True, blank=True)
    accommodation = models.ForeignKey(Accommodations, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=20, choices=[
        ('damages', 'Damages'),
        ('accommodation', 'Accommodation')
    ] ,blank = True, null = True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(default=timezone.now)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default="credit_card")
    description = models.TextField(blank=True, null=True)
    currency = models.CharField(max_length=3, choices=PAYMENT_CURRENCIES, default='USD')


    def __str__(self):
        return f"Payment {self.id} - {self.type}"








class OneTimePassword(models.Model):
    user=models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    otp=models.CharField(max_length=6)


    def __str__(self):
        return f"{self.user.first_name} - otp code"


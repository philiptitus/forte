from django.core.mail import EmailMessage
import random
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site

import requests
from google.auth.transport import requests
from google.oauth2 import id_token
from base.models import CustomUser as User
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed



class Google():
    @staticmethod
    def validate(access_token):
        try:
            id_info=id_token.verify_oauth2_token(access_token, requests.Request())
            if 'accounts.google.com' in id_info['iss']:
                return id_info
        except:
            print("invalid token")
            return "the token is either invalid or has expired"

def login_user(email, password):
    user = authenticate(emai=email, password=password)
    person = User.objects.get(id=user.id)
    tokens = person.tokens()
    return {
            'email':login_user.email,
            'full_name':login_user.get_full_name,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }



def register_social_user(provider, email, first_name, last_name):
    old_user=User.objects.filter(email=email)
    if old_user.exists():
        if provider == old_user[0].auth_provider:
            result = login_user(email, settings.SOCIAL_AUTH_PASSWORD)
            return result
        else:
            print("You already have an account")
            raise AuthenticationFailed(
                detail=f"please continue your login with {old_user[0].auth_provider}"
            )
        
    else:


            # return {
            #     'full_name':login_user.get_full_name,
            #     'email':login_user.email,
            #     'access_token':str(user_tokens.get('access')),
            #     'refresh_token':str(user_tokens.get('refresh'))

            # }

        new_user={
            'email':email,
            'first_name':first_name,
            'last_name':last_name,
            'password':settings.SOCIAL_AUTH_PASSWORD
        }
        user=User.objects.create_user(**new_user)
        user.auth_provider=provider
        user.is_verified=True
        user.save()
        result = login_user(email=user.email, password=settings.SOCIAL_AUTH_PASSWORD)
        return result
       






def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()





# utils.py

from datetime import date, timedelta
from django.db.models import Q
from base.models import *
from hostels.models import *



def handle_upcoming_accommodations():
    current_date = date.today()
    upcoming_accommodations = Accommodations.objects.filter(
        status='Active',
        check_out_date__gte=current_date,
        check_out_date__lte=current_date + timedelta(days=7)
    )

    for accommodation in upcoming_accommodations:
        days_until_check_out = (accommodation.check_out_date - current_date).days
        existing_notice = Notice.objects.filter(user=accommodation.student, days=days_until_check_out).exists()

        if not existing_notice:
            if days_until_check_out == 1:
                message = "Kindly prepare to pack out and move out tomorrow. If you need to prolong your stay, wait for the accommodation to expire, then create a new one. Contact hostel management to maintain your room."
                notification_type = "Final Reminder"
                if not accommodation.sent:
                    student = CustomUser.objects.get(id=accommodation.student.id)
                    email = student.email
                    email_subject = "Final Reminder: Your accommodation ends tomorrow"
                    data = {
                        'email_body': message,
                        'email_subject': email_subject,
                        'to_email': email
                    }
                    send_normal_email(data)
                    accommodation.sent = True
                    accommodation.save()
            else:
                message = f"Your accommodation ends in {days_until_check_out} days."
                notification_type = "Reminder"

            Notice.objects.create(user=accommodation.student, message=message, notification_type=notification_type, days=days_until_check_out)

def handle_expired_accommodations():
    current_date = date.today()
    expired_accommodations = Accommodations.objects.filter(
        Q(status='Active') & (Q(check_out_date__lte=current_date) | Q(check_out_date=current_date))
    )

    for accommodation in expired_accommodations:
        Maintenance.objects.filter(student=accommodation.student).delete()
        Complaints.objects.filter(student=accommodation.student).delete()

        hostel = Hostels.objects.get(id=accommodation.hostel.id)
        if hostel.count > 0:
            hostel.count -= 1
            hostel.save()

        Notice.objects.create(
            user=accommodation.student,
            notification_type="accommodation",
            message=f"Dear customer, thank you for choosing {hostel.hostel_name}. We hope you enjoyed your stay. Be sure to leave your feedback for this hostel under Profile -> Reviews. Thanks for trusting and using Forte."
        )

        user = accommodation.student
        email = user.email
        message = f"Dear customer, thank you for choosing {hostel.hostel_name} for your stay. We hope you enjoyed your stay. Be sure to leave your feedback for the hostel under Profile -> Reviews. Thanks for trusting and using Forte. Be sure to tell others about our website :)"
        email_subject = "Thank You"
        data = {
            'email_body': message,
            'email_subject': email_subject,
            'to_email': email
        }
        send_normal_email(data)

    expired_accommodations.update(status='Completed')

    for accommodation in expired_accommodations:
        person = CustomUser.objects.get(id=accommodation.student.id)
        person.hostel = None
        person.save()

        if accommodation.room:
            old_room = accommodation.room
            old_room.current_occupancy -= 1
            old_room.save()

def handle_late_accommodations():
    current_date = date.today()
    late_accommodations = Accommodations.objects.filter(
        Q(status='Delayed Payment') & Q(check_in_date__lt=current_date)
    )

    for accommodation in late_accommodations:
        hostel = Hostels.objects.get(id=accommodation.hostel.id)
        if hostel.count > 0:
            hostel.count -= 1
            hostel.save()

        Notice.objects.create(
            user=accommodation.student,
            notification_type="accommodation",
            message=f"Your accommodation in {hostel.hostel_name} was cancelled because you did not arrive on time. Accommodations are active for a maximum of 24 hours before payment. Make sure you are at the hostel premises when making payments."
        )

        user = accommodation.student
        email = user.email
        message = f"Your accommodation in {hostel.hostel_name} was cancelled because you did not arrive on time. Accommodations are active for a maximum of 24 hours before payment. Make sure you are at the hostel premises when making payments."
        email_subject = "Late Arrivals Accommodation Cancelled"
        data = {
            'email_body': message,
            'email_subject': email_subject,
            'to_email': email
        }
        send_normal_email(data)

    late_accommodations.update(status='Cancelled')

    for accommodation in late_accommodations:
        person = CustomUser.objects.get(id=accommodation.student.id)
        person.hostel = None
        person.save()

        if accommodation.room:
            old_room = accommodation.room
            old_room.current_occupancy -= 1
            old_room.save()

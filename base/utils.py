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
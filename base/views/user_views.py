from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import generics
from base.serializers import *
from django.db import IntegrityError
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from ..models import CustomUser  as Userr
from ast import Expression
from django.views.decorators.csrf import csrf_exempt
from multiprocessing import context
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
       def validate(self, attrs: dict[str, any]) -> dict[str, str]:
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        

        return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer








from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.db.models import Q







from django.db.models import Case, When, Value, IntegerField

from django.db.models import Q, F
from rest_framework.pagination import PageNumberPagination
from ..permissions import * 

from rest_framework.pagination import PageNumberPagination

from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.db.models import Q

from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.




@permission_classes([IsAuthenticated])
class GetUsersView(APIView):
    def get(self, request):
        # Check if the requesting user is either admin or staff
        if request.user.user_type not in ['admin']:
            return Response({'detail': 'Only Admins or Staff members are allowed to view users.'}, status=status.HTTP_403_FORBIDDEN)
        
        # Fetch all users
        users = Userr.objects.all()

        # Filter out the current user
        users = users.exclude(id=request.user.id)

        # Filter users by hostel if hostel_id is provided
        hostel_id = request.user.hostel
        if hostel_id:
            users = users.filter(hostel_id=hostel_id)
        else:
            return Response({'detail': 'This Action Is Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

        # Apply name search if provided
        name = request.query_params.get('name')
        if name:
            users = users.filter(Q(username__icontains=name) | Q(email__icontains=name) | Q(user_type__icontains=name)).exclude(user_type="admin")

        # Paginate the results
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(users, request)

        # Serialize the paginated users
        serializer = UserSerializer(result_page, many=True)

        # Return paginated response
        return paginator.get_paginated_response(serializer.data)

from rest_framework.exceptions import PermissionDenied

@permission_classes([IsAuthenticated])
class GetUserById(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = Userr.objects.get(id=pk)
        serializer = UserSerializer(user)

        # Check if the requesting user is the same as the requested user
        if request.user.id == user.id:
            return Response(serializer.data)
        
        # Check if the requesting user is staff or admin
        if request.user.user_type in ['staff', 'admin']:
            # Check if request user's hostel matches the user's hostel
            if request.user.hostel == user.hostel:
                return Response(serializer.data)
        
        # Check if the requesting user is a student and is trying to access themselves
        if request.user.user_type == 'student' and request.user.id == user.id:
            return Response(serializer.data)
        
        # If none of the conditions are met, raise PermissionDenied
        raise PermissionDenied("You do not have permission to access this user's profile.")



class UserNotices(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Retrieve all notices for the authenticated user
        notices = Notice.objects.filter(user=user).order_by('-created_at')

        # Mark all unread notices as read
        unread_notices = notices.filter(is_read=False)
        unread_notices.update(is_read=True)


        paginator = PageNumberPagination()
        paginator.page_size = 10  # Set the number of posts per page
        result_page = paginator.paginate_queryset(notices, request)
        

        # Serialize the notices
        serializer = NoticeSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

from rest_framework.response import Response
from rest_framework.views import APIView

class uploadImage(APIView):
    def post(self, request):
        try:
            data = request.data

            user_id = data['user_id']
            user = Userr.objects.get(id=user_id)

            if request.user != user:
                return Response({'detail': 'You are not authorized to upload Image for this user.'}, status=403)

            user.avi = request.FILES.get('avi')
            user.save()

            return Response({'detail': 'Image was uploaded successfully'})
        except Exception as e:
            print(f'Error uploading image: {str(e)}')  # Print error to console
            return Response({'detail': f'Error uploading image: {str(e)}'}, status=500)







from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class ResetImage(APIView):
    def post(self, request):
        try:
            data = request.data

            user = request.user

            if request.user != user:
                return Response({'detail': 'You are not authorized to reset the image for this user.'}, status=403)

            # Set the avi field back to its default value
            user.avi = '/avatar.png'
            user.save()

            return Response({'detail': 'Image was reset successfully'})
        except Exception as e:
            print(f'Error resetting image: {str(e)}')  # Print error to console
            return Response({'detail': f'Error resetting image: {str(e)}'}, status=500)





from rest_framework.parsers import MultiPartParser, FormParser



from django.contrib.auth.validators import UnicodeUsernameValidator
 
from django.core.validators import validate_email
 


# class RegisterUser(APIView):

#     def post(self, request):
#         data = request.data

#         print("Data received from the form:", data)


#         # Determine user type based on form data
#         user_type = data.get('user_type')
#         if user_type == 'admin':
#             fields_to_check = ['name', 'email', 'password', 'date_of_birth', 'gender', 'address']
#             email_message = "Welcome to FORTE! We hope you enjoy our services Be Sure To Confirm Your Email Or You Will Not Get Your Account Back When You Lose Your Password"
#         elif user_type == 'staff':
#             abslink = "http://localhost:3000/#/forgot-password/"
 
#             fields_to_check = ['name', 'email', 'password', 'date_of_birth', 'gender', 'address', 'Id_number']
#             email_message = f"You have been invited as a staff member at a FORTE hostel. Go Here: {abslink} and enter your Email to Reset Your Password and then log in with Your New Password."

#         elif user_type == 'student':
#             fields_to_check = ['name', 'email', 'password', 'date_of_birth', 'gender', 'address', 'guardian_name', 'guardian_contact', 'guardian2_name', 'guardian2_contact', 'Id_number']
#             email_message = "Welcome to FORTE! We hope you enjoy our services."
#         else:
#             return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)
            

#         # Check if all required fields are present
#         for field in fields_to_check:
#             if field not in data:
#                 return Response({'detail': f'Missing {field} field.'}, status=status.HTTP_400_BAD_REQUEST)

#         # Check password length
#         if len(data['password']) < 8:
#             content = {'detail': 'Password must be at least 8 characters long.'}
#             return Response(content, status=status.HTTP_400_BAD_REQUEST)

#         # Check password for username and email
#         if data['password'].lower() in [data['name'].lower(), data['email'].lower()]:
#             content = {'detail': 'Password cannot contain username or email.'}
#             return Response(content, status=status.HTTP_400_BAD_REQUEST)

#         # Validate email format
#         try:
#             validate_email(data['email'])
#         except ValidationError:
#             return Response({'detail': 'Invalid email address.'}, status=status.HTTP_400_BAD_REQUEST)

#         # Validate password strength
#         try:
#             validate_password(data['password'])
#         except ValidationError as e:
#             return Response({'detail': ', '.join(e.messages)}, status=status.HTTP_400_BAD_REQUEST)

#         # Create user
#         try:
#             user = CustomUser.objects.create_user(
#                 first_name=data['name'],
#                 username=data['email'],
#                 email=data['email'],
#                 user_type=user_type,  # Set the user_type field
#                 password=data['password'],
#                 isForte=(user_type == 'staff')  # Set isForte to True for staff
#             )

#             if user_type == 'staff' and hasattr(request.user, 'hostel'):
#                 user.hostel = request.user.hostel
#                 user.save()

#             email_subject = "Welcome to FORTE"
#             to_email = user.email
#             data = {
#                 'email_body': email_message,
#                 'email_subject': email_subject,
#                 'to_email': to_email
#             }
#             send_normal_email(data)
#         except IntegrityError:
#             message = {'detail': 'User with this email already exists.'}
#             return Response(message, status=status.HTTP_400_BAD_REQUEST)

#         serializer = UserSerializer(user, many=False)
#         return Response(serializer.data)


from django.core.exceptions import ObjectDoesNotExist

class RegisterUser(APIView):

    def post(self, request):
        data = request.data

        print("Data received from the form:", data)

        # Check if user type is provided
        user_type = data.get('user_type')
        if not user_type:
            return Response({'detail': 'User type not provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        gender = data.get('gender')
        Id_number = data.get('Id_number')

        if user_type == 'student':
            if not gender:
                return Response({'detail': 'Students must provide a gender.'}, status=status.HTTP_400_BAD_REQUEST)
            if not Id_number:
                return Response({'detail': 'Students must provide Their Id Numbers.'}, status=status.HTTP_400_BAD_REQUEST)
             
            if not Id_number.isdigit() or len(Id_number) != 8:
                return Response({'detail': 'Invalid ID number. It must have exactly 8 digits.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                existing_user = CustomUser.objects.get(Id_number=Id_number)
                return Response({'detail': 'A user with this ID number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                pass



        if user_type == 'staff':
             if not Id_number:
                return Response({'detail': 'You must provide An Id Number.'}, status=status.HTTP_400_BAD_REQUEST)
             
             if not Id_number.isdigit() or len(Id_number) != 8:
                return Response({'detail': 'Invalid ID number. It must have exactly 8 digits.'}, status=status.HTTP_400_BAD_REQUEST)

             try:
                existing_user = CustomUser.objects.get(Id_number=Id_number)
                return Response({'detail': 'A user with this ID number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
             except ObjectDoesNotExist:
                pass


        # Check if all required fields are present based on user type
        if user_type == 'admin':
            fields_to_check = ['name', 'email', 'password']
            email_message = "Welcome to FORTE! We hope you enjoy our services Be Sure To Verify Your Account Or You Will Not Get Your Account Back When You Lose Your Password"
        elif user_type == 'staff':
            abslink = "http://localhost:3000/authentication/forget-password/"
            fields_to_check = ['name', 'email', 'password']
            email_message = f"You have been invited as a staff member at a FORTE hostel. Go Here: {abslink} and enter your Email to Reset Your Password and then log in with Your New Password."
        elif user_type == 'student':
            fields_to_check = ['name', 'email', 'password']
            email_message = "Welcome to FORTE! We hope you enjoy our services."
        else:
            return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if gender is provided for students

        # Check if all required fields are present
        for field in fields_to_check:
            if field not in data:
                return Response({'detail': f'Missing {field} field.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check password length
        if len(data['password']) < 8:
            content = {'detail': 'Password must be at least 8 characters long.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # Check password for username and email
        if data['password'].lower() in [data['name'].lower(), data['email'].lower()]:
            content = {'detail': 'Password cannot contain username or email.'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # Validate email format
        try:
            validate_email(data['email'])
        except :
            return Response({'detail': 'Invalid email address.'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate password strength
        try:
            validate_password(data['password'])
        except :
            return Response({'detail': "Password Must Have Both Letter Cases, Be 8 digits and Above, Have At Least 1 special Character and at least 1 Nummber"}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        try:
            user = CustomUser.objects.create_user(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                user_type=user_type,  # Set the user_type field
                password=data['password'],
                isForte=(user_type == 'staff') ,
                gender=data.get('gender'),
                Id_number=data.get('Id_number'),
                    # Gender provided only for students
                # Set isForte to True for staff
            )

            if user_type == 'staff' and hasattr(request.user, 'hostel'):
                user.hostel = request.user.hostel
                user.is_verified = "True"
                user.save()

            email_subject = "Welcome to FORTE"
            to_email = user.email
            data = {
                'email_body': email_message,
                'email_subject': email_subject,
                'to_email': to_email
            }
            send_normal_email(data)
        except IntegrityError:
            message = {'detail': 'User with this email already exists.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)



@permission_classes([IsAuthenticated]) 


class GetUserProfile(APIView):

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)


        return Response(serializer.data)
    

class UpdateUserProfile(APIView):

    def put(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        data = request.data

        new_email = data.get('email')
 
        # Check if email is being updated to an existing email
        if new_email and CustomUser.objects.exclude(pk=user.pk).filter(email=new_email).exists():
            return Response({'detail': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update password if provided
        if 'password' in data and data['password'] != '':
            # Add password strength checks here
            if len(data['password']) < 8:
                content = {'detail': 'Password must be at least 8 characters long.'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            uppercase_count = sum(1 for c in data['password'] if c.isupper())
            lowercase_count = sum(1 for c in data['password'] if c.islower())
            if uppercase_count < 1 or lowercase_count < 1:
                content = {'detail': 'Password must contain at least one uppercase and lowercase character.'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            digit_count = sum(1 for c in data['password'] if c.isdigit())
            special_count = sum(1 for c in data['password'] if not c.isalnum())
            if digit_count < 1 or special_count < 1:
                content = {'detail': 'Password must contain at least one digit and one special character.'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            user.password = make_password(data['password'])

        # Update user profile details
        user.first_name = data.get('name', user.first_name)
        user.username = data.get('email', user.username)
        user.email = data.get('email', user.email)
        user.bio = data.get('bio', user.bio)
        user.gender = data.get('gender', user.gender)
        user.contact_number = data.get('contact_number', user.contact_number)
        user.address = data.get('address', user.address)
        user.guardian_name = data.get('guardian_name', user.guardian_name)
        user.guardian_contact = data.get('guardian_contact', user.guardian_contact)
        user.guardian2_name = data.get('guardian2_name', user.guardian2_name)
        user.guardian2_contact = data.get('guardian2_contact', user.guardian2_contact)
        user.Id_number = data.get('Id_number', user.Id_number)
        user.guardian2_contact = data.get('guardian2_contact', user.guardian2_contact)

        # Save updated user profile
        user.save()

        # Return updated user data
        return Response(serializer.data)
from rest_framework.exceptions import PermissionDenied

@permission_classes([IsAuthenticated])
class deleteAccount(APIView):

    def delete(self, request):
        user_for_deletion = request.user

        if user_for_deletion.user_type == 'admin':
            # Check for active accommodations in the hostel
            pending_Accomodations = Accommodations.objects.filter(hostel=user_for_deletion.hostel, status='Active')
            if Accommodations.objects.filter(hostel=user_for_deletion.hostel, status='Active').exists():
                accomodation_ids = ", ".join(str(accomodation.id) for accomodation in pending_Accomodations)
                detail_message = f"You cannot Delete Your Account as because there are still active accomodations in your hostel:  REF ACCOMODATION NO(S): {accomodation_ids}."
                return Response({"detail": detail_message}, status=status.HTTP_400_BAD_REQUEST)
  
            if user_for_deletion.hostel:
                hostel = Hostels.objects.get(id = user_for_deletion.hostel.id)
                staff = CustomUser.objects.filter(user_type = "staff", hostel=hostel)
                staff_list = list(staff) 
                for s in staff_list:
                    s.delete()
 
                # Delete the Hostel object
                user_for_deletion.hostel.delete()
            # Delete the user
            user_for_deletion.delete()
            return Response("The hostel and related objects were deleted successfully")

        elif user_for_deletion.user_type == 'staff':
            # Delete the user normally
            user_for_deletion.delete()
            return Response("The user was deleted successfully")

        elif user_for_deletion.user_type == 'student':
            # Check for active or delayed payment accommodations for the student
            if Accommodations.objects.filter(student=user_for_deletion, status__in=['Active', 'Delayed Payment']).exists():
                raise PermissionDenied("There are still active or delayed payment accommodations for you.")
            
            # Delete the user
            user_for_deletion.delete()
            return Response("The user was deleted successfully")

        else:
            raise PermissionDenied("Invalid user type")



class PasswordResetRequestView(APIView):
    serializer_class=PasswordResetRequestSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'we have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        # return Response({'message':'user with that email does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    



class PasswordResetConfirm(APIView):

    def get(self, request, uidb64, token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=Userr.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True, 'message':'credentials is valid', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordView(GenericAPIView):
    serializer_class=SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({'success':True, 'message':"password reset is succesful"}, status=status.HTTP_200_OK)




from django.shortcuts import get_object_or_404



from django.http import JsonResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from django.conf import settings

class Createotp(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.is_verified:
            return Response({'detail': 'Your account is already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp_instance = OneTimePassword.objects.get(user=user)
            otp_instance.delete()
        except OneTimePassword.DoesNotExist:
            pass

        otp = get_random_string(length=6, allowed_chars='0123456789')
        OneTimePassword.objects.create(user=user, otp=otp)

        # Send OTP to user's email
        subject = 'Your One Time Password'
        message = f'Your One Time Password is: {otp}'
        from_email = settings.EMAIL_HOST_USER
        to_email = user.email

        send_mail(subject, message, from_email, [to_email])

        return Response({'message': 'OTP created and sent successfully.'})
@permission_classes([IsAuthenticated])
class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        try:
            passcode = request.data.get('otp')
            print(passcode)
            user_pass_obj=OneTimePassword.objects.get(otp=passcode)
            user=user_pass_obj.user
            
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'account email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({'detail':'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist as identifier:
            return Response({'detail':'passcode invalid'}, status=status.HTTP_400_BAD_REQUEST)
        


@permission_classes([IsAuthenticated])
class RemoveStaff(APIView): 
    def delete(self, request, pk):
        # Check if the request user type is admin
        if request.user.user_type != 'admin':
            return Response({"message": "You are not authorized to remove staff."}, status=status.HTTP_403_FORBIDDEN)
        
        # Get user_id from request dataFar

        # Check if the user with the provided ID exists and is a staff member
        try:
            user = CustomUser.objects.get(id=pk)
            if user.user_type != 'staff':
                return Response({"message": "The provided user is not a staff member."}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the administrator's hostel matches the user's hostel
        if request.user.hostel != user.hostel:
            return Response({"message": "You are not authorized to remove staff from this hostel."}, status=status.HTTP_403_FORBIDDEN)
        
        # Update the user's user_type to 'student' and reset the hostel field to null

        user.delete() 

        return Response({"message": "Staff removed successfully."}, status=status.HTTP_200_OK)

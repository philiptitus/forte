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
from multiprocessing import context
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from hostels.models import *
from rest_framework.pagination import LimitOffsetPagination
from ..permissions import * 


from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..serializers import *
import stripe
from django.conf import settings

class HostelCreateView(APIView):
    def post(self, request):
        # Check if the user is a staff or student
        if request.user.user_type != 'admin':
            return Response({'detail': 'You have to create a new account to continue.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the user is already an administrator in another hostel
        existing_hostel_admin = Hostels.objects.filter(administrator=request.user).exists()
        if existing_hostel_admin:
            return Response({'detail': 'You are already an administrator in another hostel.'}, status=status.HTTP_400_BAD_REQUEST)
        
        stripe_webhook = request.data.get("stripe_webhook")

        # Get demo_secret from request data, default to False
        demo_secret = request.data.get("demo_secret", False)

        # If demo_secret is True, use STRIPE_SECRET_KEY from settings
        if demo_secret:
            stripe_key = settings.STRIPE_SECRET_KEY
        else:
            # Otherwise, get stripe_key from request data
            stripe_key = request.data.get('stripe_key')
            # Ensure stripe_key is provided in the request data
            if not stripe_key:
                return Response({'detail': 'Stripe API key is required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Verify the provided stripe_key
            if not self.verify_stripe_key(stripe_key):
                return Response({'detail': 'Invalid Stripe API key.'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Set the administrator field to the current user
        request.data['administrator'] = request.user.id
        request.data['capacity'] = 0

        # Add gender field to the request data
        request.data['gender'] = request.data.get('gender', '')  # Ensure gender is present in the request data

        serializer = HostelSerializer(data=request.data)
        if serializer.is_valid():
            hostel = serializer.save()
            request.user.hostel = hostel
            request.user.save()
            
            new_hostel = Hostels.objects.get(id=hostel.id)
            new_hostel.stripe_key = stripe_key
            new_hostel.stripe_webhook = stripe_webhook
            new_hostel.save()

            return Response(HostelSerializer(hostel).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def verify_stripe_key(self, stripe_key):
        stripe.api_key = stripe_key

        try:
            # Attempt to retrieve some data from Stripe using the provided API key
            account = stripe.Account.retrieve()
            # If the request was successful, return True
            return True
        except stripe.error.AuthenticationError:
            # If the request failed due to authentication error (invalid API key), return False
            return False
    



from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.db.models import F
from django.db.models import F

@permission_classes([IsAuthenticated])
class RoomsCreateView(APIView):
    def post(self, request):
        # Check if the user is an admin
        if request.user.user_type != 'admin':
            return Response({'detail': 'Only admins are allowed to create rooms.'}, status=status.HTTP_403_FORBIDDEN)
        
        # Extract form data for capacities
        capacity_1 = request.data.get('capacity_1', 0)
        print(capacity_1)
        capacity_2 = request.data.get('capacity_2', 0)
        print(capacity_2)
        capacity_4 = request.data.get('capacity_4', 0)
        print(capacity_4)
        
        # Get the hostel where the request user is the administrator
        try:
            hostel = Hostels.objects.get(administrator=request.user)
        except Hostels.DoesNotExist:
            return Response({'detail': 'You are not the administrator of any hostel.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch the current capacity of the hostel
        current_capacity = hostel.capacity
        
        # Create rooms with respective capacities
        rooms_created = []
        for capacity, capacity_value in [('1', capacity_1), ('2', capacity_2), ('4', capacity_4)]:
            for _ in range(capacity_value):
                room = Rooms.objects.create(
                    hostel=hostel,
                    room_number=None,  # Set room number to the count of existing rooms plus 1
                    capacity=capacity,
                    current_occupancy=0,
                )
                rooms_created.append(room)

                room.room_number = room.id
                room.save()
                 
        # Calculate the total capacity increase
        total_capacity_increase = sum([capacity_1*1, capacity_2*2, capacity_4*4])
        
        # Update the hostel's capacity
        Hostels.objects.filter(id=hostel.id).update(capacity=F('capacity') + total_capacity_increase)
        
        # Serialize the created rooms
        serializer = RoomSerializer(rooms_created, many=True)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


from django.db.models import Q, F

from ..permissions import *

class RoomListView(APIView):
    permission_classes = [IsAdminOrStaff]

    def get(self, request):
        # Retrieve the current user's hostel
        hostel = request.user.hostel

        # Filter rooms based on the hostel
        rooms = Rooms.objects.filter(hostel=hostel)
        r = Rooms.objects.filter(hostel=hostel)

        name = request.query_params.get('name')
        if name:
            rooms = r.filter(Q(room_number__icontains=name) | Q(capacity__icontains=name))

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(rooms, request)




        # Serialize the rooms
        serializer = RoomSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)



class HostelListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        hostels = Hostels.objects.exclude(stripe_key__isnull=True)
        name = request.query_params.get('name')
        if name:
            hostels = hostels.filter(Q(hostel_name__icontains=name) | Q(capacity__icontains=name) | Q(gender__icontains=name))
       
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(hostels, request)

        serializer = HostelSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)




class FacilityListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        facilities = Facilities.objects.all()
        name = request.query_params.get('name')
        if name:
            facilities = facilities.filter(Q(facility_type__icontains=name) | Q(id__icontains=name))
       
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(facilities, request)

        serializer = FacilitiesSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)






class HostelDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            hostel = Hostels.objects.get(pk=pk)
        except Hostels.DoesNotExist:
            return Response({'detail': 'Hostel not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = HostelSerializer(hostel)
        return Response(serializer.data)
  

class RoomDetailView(APIView):
    permission_classes = [IsAdminOrStaff, IsAuthenticated]
    
    def get(self, request, pk):
        try:
            room = Rooms.objects.get(pk=pk)
            
            # Check if the requesting user's hostel matches the room's hostel
            if request.user.hostel != room.hostel:
                return Response({'detail': 'You are not authorized to view this room.'}, status=status.HTTP_403_FORBIDDEN)
            
            # Serialize the room data
            serializer = RoomSerializer(room)
            
            return Response(serializer.data)
        except Rooms.DoesNotExist:
            return Response({'detail': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)
        




class AccommodationDetailView(APIView):
    permission_classes = [IsAdminOrStaff | IsAuthenticated]

    def get(self, request, pk):
        try:
            accommodation = Accommodations.objects.get(pk=pk)
            
            # Check if the requesting user is staff or admin
            if request.user.user_type in ['staff', 'admin']:
                # Staff or admin must belong to the same hostel as the accommodation
                if request.user.hostel != accommodation.hostel:
                    return Response({'detail': 'You are not authorized to view this accommodation.'}, status=status.HTTP_403_FORBIDDEN)
            elif request.user.user_type == 'student':
                # If the user is a student, they must be the owner of the accommodation
                if accommodation.student != request.user:
                    return Response({'detail': 'You are not authorized to view this accommodation.'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Serialize the accommodation data
            serializer = AccomodationsSerializer(accommodation)
            
            return Response(serializer.data)
        except Accommodations.DoesNotExist:
            return Response({'detail': 'Accommodation not found.'}, status=status.HTTP_404_NOT_FOUND)


from django.db.models import F




# class AccommodationListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_type = request.user.user_type

#         if user_type == 'student':
#             accommodations = Accommodations.objects.filter(student=request.user)
#         elif user_type == 'admin' or user_type == 'staff':
#             accommodations = Accommodations.objects.filter(hostel=request.user.hostel)
#             self.permission_classes = [IsAuthenticated & IsAdminOrStaff]
#         else:
#             return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         name = request.query_params.get('name')
#         if name:
#             accommodations = accommodations.filter(Q(id__icontains=name) | Q(status__icontains=name) )

#         accommodations = accommodations.order_by('-id')  # Sort by check-in date in descending order

#         paginator = PageNumberPagination()
#         paginator.page_size = 10
#         result_page = paginator.paginate_queryset(accommodations, request)
        
#         serializer = AccomodationsSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)


from datetime import date, datetime

# class AccommodationListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_type = request.user.user_type

#         if user_type == 'student':
#             accommodations = Accommodations.objects.filter(student=request.user)
#         elif user_type == 'admin' or user_type == 'staff':
#             accommodations = Accommodations.objects.filter(hostel=request.user.hostel)
#             self.permission_classes = [IsAuthenticated & IsAdminOrStaff]
#         else:
#             return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         name = request.query_params.get('name')
#         if name:
#             accommodations = accommodations.filter(Q(id__icontains=name) | Q(status__icontains=name) )



#         # Fetch accommodations whose status is "Active" and whose check out date is past or current
#         current_date = date.today()
#         expired_accommodations = accommodations.filter(Q(status='Active') & (Q(check_out_date__lte=current_date) | Q(check_out_date=current_date)))

#         # Print check out date and current time for debugging

#         # Update the status of accommodations whose check out date is past to "Completed"
#         completed_accommodations = expired_accommodations.filter(check_out_date__lte=current_date)
#         completed_accommodations.update(status='Completed')
 
#         # Iterate through accommodations whose check out date is past and update the user and room information
#         for accommodation in expired_accommodations:
#             print("Check-out Date:", accommodation.check_out_date)
#             print("Current Time:", datetime.now())


#             person = CustomUser.objects.get(id=accommodation.student.id)
#             person.hostel = None
#             person.save()

#             if accommodation.room:
#                 old_room = accommodation.room
#                 old_room.current_occupancy -= 1
#                 old_room.save()

#         accommodations = accommodations.order_by('-id')  # Sort by check-in date in descending order

#         paginator = PageNumberPagination()
#         paginator.page_size = 10
#         result_page = paginator.paginate_queryset(accommodations, request)
        
#         serializer = AccomodationsSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)



from datetime import date, datetime

from datetime import date, datetime

from datetime import date, timedelta, datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.contrib.auth.models import User
from base.utils import *


# class AccommodationListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_type = request.user.user_type

#         if user_type == 'student':
#             accommodations = Accommodations.objects.filter(student=request.user)
#         elif user_type == 'admin' or user_type == 'staff':
#             accommodations = Accommodations.objects.filter(hostel=request.user.hostel)
#             self.permission_classes = [IsAuthenticated & IsAdminOrStaff]
#         else:
#             return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)

#         name = request.query_params.get('name')
#         if name:
#             accommodations = accommodations.filter(Q(id__icontains=name) | Q(status__icontains=name))

#         # Fetch accommodations whose status is "Active" and due in 7 days or less
#         current_date = date.today()
#         upcoming_accommodations = accommodations.filter(
#             status='Active',
#             check_out_date__gte=current_date,
#             check_out_date__lte=current_date + timedelta(days=7)
#         )

#         # Iterate through upcoming accommodations to create notices
#         for accommodation in upcoming_accommodations:
#             days_until_check_out = (accommodation.check_out_date - current_date).days
#             existing_notice = Notice.objects.filter(user=accommodation.student, days=days_until_check_out).exists()

#             if not existing_notice:
#                 if days_until_check_out == 1:
#                     message = "Kindly prepare to pack out and move out tomorrow. If you need to prolong your stay, wait for the accommodation to expire, then create a new one. Contact hostel management to maintain your room."
#                     notification_type = "Final Reminder"
#                     if not accommodation.sent:
#                         student = CustomUser.objects.get(id=accommodation.student.id)
#                         email = student.email
#                         email_subject = "Final Reminder: Your accommodation ends tomorrow"
#                         data = {
#                             'email_body': message,
#                             'email_subject': email_subject,
#                             'to_email': email
#                         }
#                         send_normal_email(data)
#                         accommodation.sent = True
#                         accommodation.save()
#                 else:
#                     message = f"Your accommodation ends in {days_until_check_out} days."
#                     notification_type = "Reminder"

#                 Notice.objects.create(user=accommodation.student, message=message, notification_type=notification_type, days=days_until_check_out)

#         # Handling expired accommodations
#         expired_accommodations = accommodations.filter(
#             Q(status='Active') & (Q(check_out_date__lte=current_date) | Q(check_out_date=current_date))
#         )
#         if expired_accommodations.count() > 0:
#             ref_list = list(expired_accommodations)
#             for a in ref_list:
#                 Maintenance.objects.filter(student=a.student).delete()
#                 Complaints.objects.filter(student=a.student).delete()

#                 hostel = Hostels.objects.get(id=a.hostel.id)
#                 if hostel.count > 0:
#                     hostel.count -= 1
#                     hostel.save()
                
#                 Notice.objects.create(
#                     user=a.student,
#                     notification_type="accommodation",
#                     message=f"Dear customer, thank you for choosing {hostel.hostel_name}. We hope you enjoyed your stay. Be sure to leave your feedback for this hostel under Profile -> Reviews. Thanks for trusting and using Forte."
#                 )
                
#                 user = a.student
#                 email = user.email
#                 message = f"Dear customer, thank you for choosing {hostel.hostel_name} for your stay. We hope you enjoyed your stay. Be sure to leave your feedback for the hostel under Profile -> Reviews. Thanks for trusting and using Forte. Be sure to tell others about our website :)"
#                 email_subject = "Thank You"
#                 data = {
#                     'email_body': message,
#                     'email_subject': email_subject,
#                     'to_email': email
#                 }
#                 send_normal_email(data)

#         expired_accommodations.update(status='Completed')

#         for accommodation in expired_accommodations:
#             person = CustomUser.objects.get(id=accommodation.student.id)
#             person.hostel = None
#             person.save()

#             if accommodation.room:
#                 old_room = accommodation.room
#                 old_room.current_occupancy -= 1
#                 old_room.save()

#         # Handling late arrivals
#         late_accommodations = accommodations.filter(
#             Q(status='Delayed Payment') & Q(check_in_date__lt=current_date)
#         )
#         if late_accommodations.count() > 0:
#             ref_list = list(late_accommodations)
#             for a in ref_list:
#                 hostel = Hostels.objects.get(id=a.hostel.id)
#                 if hostel.count > 0:
#                     hostel.count -= 1
#                     hostel.save()

#                 Notice.objects.create(
#                     user=a.student,
#                     notification_type="accommodation",
#                     message=f"Your accommodation in {hostel.hostel_name} was cancelled because you did not arrive on time. Accommodations are active for a maximum of 24 hours before payment. Make sure you are at the hostel premises when making payments."
#                 )
                
#                 user = a.student
#                 email = user.email
#                 message = f"Your accommodation in {hostel.hostel_name} was cancelled because you did not arrive on time. Accommodations are active for a maximum of 24 hours before payment. Make sure you are at the hostel premises when making payments."
#                 email_subject = "Late Arrivals Accommodation Cancelled"
#                 data = {
#                     'email_body': message,
#                     'email_subject': email_subject,
#                     'to_email': email
#                 }
#                 send_normal_email(data)

#         late_accommodations.update(status='Cancelled')

#         for accommodation in late_accommodations:
#             person = CustomUser.objects.get(id=accommodation.student.id)
#             person.hostel = None
#             person.save()

#             if accommodation.room:
#                 old_room = accommodation.room
#                 old_room.current_occupancy -= 1
#                 old_room.save()

#         accommodations = accommodations.order_by('-id')  # Sort by check-in date in descending order

#         paginator = PageNumberPagination()
#         paginator.page_size = 10
#         result_page = paginator.paginate_queryset(accommodations, request)
        
#         serializer = AccomodationsSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)


class AccommodationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_type = request.user.user_type

        if user_type == 'student':
            accommodations = Accommodations.objects.filter(student=request.user)
        elif user_type == 'admin' or user_type == 'staff':
            accommodations = Accommodations.objects.filter(hostel=request.user.hostel)
            self.permission_classes = [IsAuthenticated & IsAdminOrStaff]
        else:
            return Response({'detail': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)

        name = request.query_params.get('name')
        if name:
            accommodations = accommodations.filter(Q(id__icontains=name) | Q(status__icontains=name))



        accommodations = accommodations.order_by('-id')  # Sort by check-in date in descending order

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(accommodations, request)

        serializer = AccomodationsSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)



class HandleAccommodationsView(APIView):

    def post(self, request):
        handle_upcoming_accommodations()
        handle_expired_accommodations()
        handle_late_accommodations()

        return Response({'detail': 'Accommodations handled successfully.'}, status=200)

class DeleteRoom(APIView):
    def delete(self, request, pk):
        room = Rooms.objects.filter(pk=pk).first()
        if not room:
            return Response({"detail": "Room not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the request user user_type is staff or admin
        if request.user.user_type not in ['staff', 'admin']:
            return Response({"detail": "You are not authorized to delete this room."}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the request user's hostel is equal to the room's hostel
        if request.user.hostel != room.hostel:
            return Response({"detail": "You are not authorized to delete this room from a different hostel."}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the current_occupancy is zero
        if room.current_occupancy != 0:
            return Response({"detail": "Room cannot be deleted as it has occupants."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update the overall hostel capacity by subtracting the room's capacity
        hostel = room.hostel
        if hostel.capacity >= int(room.capacity):
            hostel.capacity -= int(room.capacity)
            hostel.save()
        else:
            return Response({"detail": "Hostel capacity is less than the room's capacity."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Delete the room
        room.delete()
        
        return Response({"detail": "Room deleted successfully and hostel capacity updated."})




class DeleteHostel(APIView):
    def delete(self, request):
        # Check if the request user user_type is admin
        if request.user.user_type != 'admin':
            return Response({"detail": "You are not authorized to delete this hostel."}, status=status.HTTP_403_FORBIDDEN)
        
        hostel = Hostels.objects.get(administrator=request.user)
        if not hostel:
            return Response({"detail": "Hostel not found or you are not authorized to delete this hostel."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if all rooms are empty
        rooms_with_occupants = Rooms.objects.filter(hostel=hostel, current_occupancy__gt=0)
        if rooms_with_occupants.exists():
            room_ids = ", ".join(str(room.id) for room in rooms_with_occupants)
            detail_message = f"Hostel cannot be deleted as there are occupants in these rooms: {room_ids}."
            return Response({"detail": detail_message}, status=status.HTTP_400_BAD_REQUEST)

        staff = CustomUser.objects.filter(user_type = "staff", hostel=hostel)
        staff_list = list(staff)

        for s in staff_list: 
            s.delete()
        # Reset hostel field for all users and accommodations related to this hostel
        users_to_reset = request.user.hostel.customuser_set.all()
        for user in users_to_reset:
            user.hostel = None
            user.save()

        
        
        accommodations_to_reset = Accommodations.objects.filter(hostel=hostel)
        for accommodation in accommodations_to_reset:
            accommodation.delete()
        
        reviews_to_reset = Reviews.objects.filter(hostel=hostel)
        for review in reviews_to_reset:
            review.delete()
        
        # Reset room field for relevant accommodations
        accommodations_with_rooms = Accommodations.objects.filter(room__hostel=hostel)
        for accommodation in accommodations_with_rooms:
            accommodation.room = None
            accommodation.save()
        
        # Delete the hostel
        hostel.delete()
        
        return Response({"detail": "Hostel deleted successfully and related data reset."})




class MaintenanceDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        maintenance_request = Maintenance.objects.filter(pk=pk).first()
        if not maintenance_request:
            return Response({"message": "Maintenance request not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the requesting user's hostel is equal to the maintenance request's hostel

        # Serialize and return the maintenance request data
        serializer = MaintenanceSerializer(maintenance_request)  # Replace YourMaintenanceSerializerClass with your actual serializer class
        return Response(serializer.data)







from django.utils import timezone





class UpdateMaintenanceStatus(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Check if the request user type is admin or staff
        if request.user.user_type not in ['admin', 'staff']:
            return Response({"message": "You are not authorized to update maintenance request status."}, status=status.HTTP_403_FORBIDDEN)
        
        maintenance_request = Maintenance.objects.filter(pk=pk).first()
        if not maintenance_request:
            return Response({"message": "Maintenance request not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the requesting user's hostel is equal to the maintenance request's hostel
        if request.user.hostel != maintenance_request.hostel:
            return Response({"message": "You are not authorized to update this maintenance request."}, status=status.HTTP_403_FORBIDDEN)
        
        status_value = request.data.get('status', None)
        if not status_value:
            return Response({"message": "Status not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        if status_value == 'In Progress':
            maintenance_request.status = 'In Progress'
        elif status_value == 'Completed':
            maintenance_request.status = 'Completed'
            maintenance_request.resolved = True
            maintenance_request.date_resolved = timezone.now()
        else:
            return Response({"message": "Invalid status provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a notice object to notify the maintenance owner
        notice_message = f"Your maintenance request NO: {maintenance_request.id} has been updated to {status_value}."
        notice = Notice.objects.create(user=maintenance_request.student, message=notice_message, notification_type='maintenance')
        
        maintenance_request.save()
        
        return Response({"message": "Maintenance request status updated successfully."})


class EditRoom(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Check if the request user type is admin or staff
        if request.user.user_type not in ['admin', 'staff']:
            return Response({"detail": "You are not authorized to edit rooms."}, status=status.HTTP_403_FORBIDDEN)
        
        room = Rooms.objects.filter(pk=pk).first()
        if not room:
            return Response({"detail": "Room not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the requesting user's hostel is equal to the room's hostel
        if request.user.hostel != room.hostel:
            return Response({"detail": "You are not authorized to edit this room."}, status=status.HTTP_403_FORBIDDEN)
        
        # Update room details
        room.room_number = request.data.get('room_number', room.room_number)
        room.capacity = request.data.get('capacity', room.capacity)
        room.isAvailable = request.data.get('isAvailable', room.isAvailable)
        # room.current_occupancy = request.data.get('current_occupancy', room.current_occupancy)
        room.damages = request.data.get('damages', room.damages)
        # room.cost_of_damage = request.data.get('cost_of_damage', room.cost_of_damage)
        room.save()
        
        return Response({"detail": "Room updated successfully."})


class EditHostelInfo(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Check if the requesting user is the administrator of the hostel
        hostel = Hostels.objects.filter(pk=request.user.hostel.id, administrator=request.user).first()
        if not hostel:
            return Response({"message": "You are not authorized to edit this hostel's information."}, status=status.HTTP_403_FORBIDDEN)

        # Retrieve updated information from request data
        hostel_name = request.data.get('hostel_name', hostel.hostel_name)
        stripe_key = request.data.get('stripe_key', hostel.stripe_key)
        address = request.data.get('address', hostel.address)
        phone = request.data.get('phone', hostel.phone)
        email = request.data.get('email', hostel.email)
        room_price_1 = request.data.get('room_price_1', hostel.room_price_1)
        room_price_2 = request.data.get('room_price_2', hostel.room_price_2)
        room_price_4 = request.data.get('room_price_4', hostel.room_price_4)

        # Convert room prices to integers
        room_price_1 = int(float(room_price_1))
        room_price_2 = int(float(room_price_2))
        room_price_4 = int(float(room_price_4))


        if stripe_key:
            if not self.verify_stripe_key(stripe_key):
                return Response({'detail': 'Invalid Stripe API key.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            pass

        # Validate room prices
        room_prices = [room_price_1, room_price_2, room_price_4]
        for price in room_prices:
            if price is not None and (price < 100 or price > 2000):
                return Response({'detail': 'Room prices must be between 100 and 2000.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update hostel information
        hostel.hostel_name = hostel_name
        if stripe_key:
            hostel.stripe_key = stripe_key
        hostel.address = address
        hostel.phone = phone
        hostel.email = email
        hostel.room_price_1 = room_price_1
        hostel.room_price_2 = room_price_2
        hostel.room_price_4 = room_price_4
        hostel.save()

        # Create notifications for users if specific fields are updated
        updated_fields = []
        if hostel_name != hostel.hostel_name:
            updated_fields.append("hostel name")
        if phone != hostel.phone:
            updated_fields.append("phone")
        if email != hostel.email:
            updated_fields.append("email")
        if stripe_key != hostel.stripe_key:
            updated_fields.append("stripe key")
        if address != hostel.address:
            updated_fields.append("address")
        if room_price_1 != hostel.room_price_1:
            updated_fields.append("room price 1")
        if room_price_2 != hostel.room_price_2:
            updated_fields.append("room price 2")
        if room_price_4 != hostel.room_price_4:
            updated_fields.append("room price 4")

        if updated_fields:
            message = f"The following information of {hostel.hostel_name} hostel has been updated: {', '.join(updated_fields)}."
            users_to_notify = CustomUser.objects.filter(hostel=hostel)
            for user in users_to_notify:
                notice = Notice.objects.create(user=user, message=message, notification_type='accommodation')
                notice.save()

        return Response({"message": "Hostel information updated successfully."})


    def verify_stripe_key(self, stripe_key):
        stripe.api_key = stripe_key

        try:
            # Attempt to retrieve some data from Stripe using the provided API key
            account = stripe.Account.retrieve()
            # If the request was successful, return True
            return True
        except stripe.error.AuthenticationError:
            # If the request failed due to authentication error (invalid API key), return False
            return False

    



from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import logging





logger = logging.getLogger(__name__)


class UploadImage(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        try:
            data = request.data
            hostel_id = request.user.hostel.id
            hostel = Hostels.objects.get(id=hostel_id)
           
            if request.user != hostel.administrator:
                return Response({'detail': 'You are not authorized to upload images for this hostel.'}, status=403)

            # Loop through each image field and update if present in the request
            for i in range(1, 11):
                image_field_name = f'imag{i}'
                image = request.FILES.get(image_field_name)
                if image:
                    setattr(hostel, image_field_name, image)

            hostel.save()

            return Response({'detail': 'Images were uploaded successfully'})
        except Exception as e:
            logger.error(f'Error uploading images: {str(e)}')
            return Response({'detail': 'Internal Server Error'}, status=500)





from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class ResetHostelImage(APIView):
    def post(self, request):
        try:
            # Retrieve the hostel object
            hostel_id = request.user.hostel.id
            hostel = get_object_or_404(Hostels, id=hostel_id)

            # Check permission (assuming permission logic remains the same)
            if request.user != hostel.administrator:
                return Response({'detail': 'You are not authorized to reset images for this hostel.'}, status=403)
            
            image_field_name = request.data.get('imag')
            print(image_field_name)

            # Check if the image field name is valid
            if image_field_name not in ['imag1', 'imag2', 'imag3', 'imag4', 'imag5', 'imag6', 'imag7', 'imag8', 'imag9', 'imag10', 'imag11']:
                print("Invalid Field Name")
                return Response({'detail': 'Invalid image field name'}, status=400)

            setattr(hostel, image_field_name, None)

            hostel.save()




            return Response({'detail': 'Image was reset successfully'})
        except Exception as e:
            logger.error(f'Error resetting image: {str(e)}')
            print("Internal server error")

            return Response({'detail': 'Internal Server Error'}, status=500)





class DeleteNoticeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            notice = Notice.objects.get(id=pk)
        except Notice.DoesNotExist:
            return Response({"error": "Notice not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the authenticated user is the owner of the notice
        if notice.user != request.user:
            return Response({"error": "You are not authorized to delete this notice."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the notice
        notice.delete()

        return Response({"message": "Notice deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

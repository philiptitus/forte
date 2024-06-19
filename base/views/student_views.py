from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import generics
from base.serializers import *
from datetime import date  # Add this import
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
from rest_framework.pagination import LimitOffsetPagination
from hostels.models import *

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.core.exceptions import ValidationError




from django.utils import timezone

@permission_classes([IsAuthenticated])
class AccommodationCreateView(APIView):
    def post(self, request):
        try:
            # Extract form data
            hostel_id = request.data.get('hostel_id')
            hostel = Hostels.objects.get(id=hostel_id)
            accommodation_type = request.data.get('type')  # 'Empty' or 'Occupied'
            capacity = request.data.get('capacity')  # Capacity of the desired room
            duration = int(request.data.get('duration', 1))  # Default to 1 month if not specified
            print(f"Hostel ID: {hostel_id}")
            print(f"Accommodation Type: {accommodation_type}")
            print(f"Capacity: {capacity}")
            print(f"Duration: {duration}")
            print(f"Hostel Gender: {hostel.gender}")
            print(f"User Gender: {request.user.gender}")
            print(request.data)
            if hostel.gender != request.user.gender:
                return Response({'detail': 'This Hostel Is Not Your Gender'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the user is a student
            if request.user.user_type != 'student':
                return Response({'detail': 'Only students are allowed to create accommodations.'}, status=status.HTTP_403_FORBIDDEN)
            
            # Check if the student already has an active accommodation
            active_accommodations = Accommodations.objects.filter(student=request.user, status__in=['Active', 'Delayed Payment'])
            if active_accommodations.exists():
                return Response({'detail': 'You already have an active accommodation.'}, status=status.HTTP_400_BAD_REQUEST)
            
            if accommodation_type == "Occupied" and capacity == 1:
                return Response({'detail': 'Cant Choose An Occupied Single Room'}, status=status.HTTP_400_BAD_REQUEST)


            # Check if the hostel exists
            hostel = Hostels.objects.get(id=hostel_id)

            # Choose a room based on capacity and availability within the hostel
            if accommodation_type == 'Empty':
                room = Rooms.objects.filter(hostel=hostel, isAvailable = True ,capacity=capacity, current_occupancy=0).first()
            elif accommodation_type == 'Occupied':
                room = Rooms.objects.filter(hostel=hostel , isAvailable = True , capacity=capacity, current_occupancy__gt=0).first()
            else:
                return Response({'detail': 'No Rooms With Specified Info Available For Now.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if a room is available
            if not room:
                return Response({'detail': f'No available room with specified info.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Calculate price based on duration and room capacity
            try:
                capacity = int(capacity)  # Ensure capacity is an integer
                print(f'Capacity: {capacity}')
                if capacity == 1:
                    room_price = hostel.room_price_1
                    if room_price is None:
                        error_message = f"The hostel does not Take In Students For Rooms With Aa capacity of 1 for now."
                        return Response({"detail": error_message}, status=status.HTTP_400_BAD_REQUEST)
                    print(f'Room price for capacity 1: {room_price}')
                elif capacity == 2:
                    room_price = hostel.room_price_2
                    if room_price is None:
                        error_message = f"The hostel does not Take In Students For Rooms With Aa capacity of 2 for now."
                        return Response({"detail": error_message}, status=status.HTTP_400_BAD_REQUEST)
                    print(f'Room price for capacity 2: {room_price}')
                elif capacity == 4:
                    room_price = hostel.room_price_4
                    if room_price is None:
                        error_message = f"The hostel does not Take In Students For Rooms With Aa capacity of 4 for now."
                        return Response({"detail": error_message}, status=status.HTTP_400_BAD_REQUEST)
                    print(f'Room price for capacity 4: {room_price}')
                else:
                    room_price = 0
                    error_message = f"Capacity {capacity} does not match any condition."
                    return Response({"detail": error_message}, status=status.HTTP_400_BAD_REQUEST)

                price = room_price * duration
                print(f'Price: {price}')
            except ValueError:
                return Response({'detail': 'Invalid capacity value.'}, status=status.HTTP_400_BAD_REQUEST)

            check_in_date = timezone.now().date()
            check_out_date = check_in_date + timedelta(days=30 * duration)  # Assuming each month has 30 days

            # Create accommodation
            accommodation = Accommodations.objects.create(
                student=request.user,
                room=room,
                hostel=hostel,
                check_in_date=timezone.now().date(),
                check_out_date=check_out_date,  # Assigning calculated check-out date
                price=price,
                paid=False,  # Assuming payment is not made at the time of creation
                status='Delayed Payment',
                duration=duration,
            )

            person = CustomUser.objects.get(id=request.user.id)
            person.hostel = hostel
            person.save()
            
            # Update room occupancy
            room.current_occupancy += 1
            room.save()

            hostel.count += 1
            hostel.save()

            # Serialize the created accommodation
            serializer = AccomodationsSerializer(accommodation)

            # Create notices
            administrator_notice = Notice.objects.create(
                user=hostel.administrator,
                notification_type="accomodation",
                message=f"A new accommodation has been created in your hostel: {accommodation}"
            )

            student_notice = Notice.objects.create(
                user=request.user,
                notification_type="accomodation",
                message=f"You have successfully created an accommodation in {hostel.hostel_name}. Your Accomodation is still invalid until payment is received and it expires by 0000hrs."
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            print(f"Validation Error: {e}")
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Hostels.DoesNotExist:
            print("Hostel does not exist.")
            return Response({'detail': 'Hostel does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return Response({'detail': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
















from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST



class CreateComplaintAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Make a mutable copy of the request data
        mutable_data = request.data.copy()
        
        # Modify the mutable copy
        mutable_data['status'] = 'Open'

        # Additional validation checks:
        user = request.user
        if user.user_type != 'student':
            return Response({"detail": "You must be a student to create a complaint."}, status=status.HTTP_400_BAD_REQUEST)

        accommodation = Accommodations.objects.filter(student=user, status='Active').first()

        if not accommodation:
            return Response({"detail": "You don't have an active accommodation to create a complaint about."}, status=status.HTTP_400_BAD_REQUEST)

        # Update the mutable copy with additional data
        mutable_data['hostel'] = accommodation.hostel.id
        mutable_data['student'] = user.id
        mutable_data['description'] = mutable_data.get('description')

        # Serialize and save the data
        serializer = ComplaintSerializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)
        complaint = serializer.save()

        # Create notices to both hostel administrators and staff members
        hostel_admins = CustomUser.objects.filter(hostel=complaint.hostel, user_type='admin')
        staff_members = CustomUser.objects.filter(hostel=complaint.hostel, user_type='staff')

        for admin in hostel_admins:
            notice_admin = Notice.objects.create(user=admin  ,notification_type = "complaints", message=f"A new complaint has been filed in your hostel.")
            notice_admin.save()

        for staff_member in staff_members:
            notice_staff = Notice.objects.create(user=staff_member,notification_type = "complaints" ,message=f"A new complaint has been filed in your hostel.")
            notice_staff.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)



class CreateMaintenanceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()  # Create a mutable copy of request.data
        # Set status to "Pending" by default before validation
        data['status'] = 'Pending'

        # Additional validation checks:
        user = request.user

        if user.user_type != 'student':  # Assuming user_type field exists in CustomUser
            return Response({"detail": "You must be a student to create a maintenance request."}, status=status.HTTP_400_BAD_REQUEST)

        accommodation = Accommodations.objects.filter(student=user, status='Active').first()

        if not accommodation:
            return Response({"detail": "You don't have an active accommodation to create a maintenance request for."}, status=status.HTTP_400_BAD_REQUEST)

        if not accommodation.hostel:
            return Response({"detail": "Your accommodation is missing hostel information."}, status=status.HTTP_400_BAD_REQUEST)

        if not accommodation.room:
            return Response({"detail": "Your accommodation is missing room information."}, status=status.HTTP_400_BAD_REQUEST)

        if not accommodation.student:
            return Response({"error": "Your accommodation is missing student information."}, status=status.HTTP_400_BAD_REQUEST)

        data['hostel'] = accommodation.hostel.id
        data['room'] = accommodation.room.id   
        data['student'] = user.id   

        if not data.get('facility_id'):
            return Response({"detail": "Please specify a facility for the maintenance request."}, status=status.HTTP_400_BAD_REQUEST)
        facility_id = data.get('facility_id')
        data['facility'] = facility_id

        facility = Facilities.objects.filter(id=facility_id).first()

        if not facility:
            return Response({"detail": "Invalid facility ID."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = MaintenanceSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        maintenance_instance = serializer.save()

        # Create notices for hostel administrators and staff members
        hostel_admin_notice = Notice.objects.create(
            user=maintenance_instance.hostel.administrator,
            notification_type = "maintenance",
            message=f"A maintenance request has been created in your hostel: {maintenance_instance.facility}."
        )

        staff_notices = Notice.objects.filter(user__user_type='staff', user__hostel=maintenance_instance.hostel)
        for staff_notice in staff_notices:
            Notice.objects.create(
                user=staff_notice.user,
                notification_type = "maintenance",

                message=f"A maintenance request has been created in your hostel: {maintenance_instance.facility}."
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.user_type != 'student':
            return Response({'detail': 'Only students are allowed to create Reviews.'}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the user has an active accommodation
        completed_accommodations = Accommodations.objects.filter(student=request.user, status='Completed')
        if not completed_accommodations.exists():
            return Response({'detail': 'You do not have any completed accommodations.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch the first completed accommodation for the user
        first_completed_accommodation = completed_accommodations.first()
        
        # Extract the hostel from the accommodation
        hostel = first_completed_accommodation.hostel
        
        # Check if the user has already reviewed the hostel
        if Reviews.objects.filter(hostel=hostel, user=request.user).exists():
            return Response({'detail': 'You have already reviewed this hostel.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create the review
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, hostel=hostel)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from django.db.models import Q, F


from django.db.models import F

class ReviewListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        hostel_id = request.data.get('hostel_id')
        # hostel_id = request.data.get('hostel_b')

        user_type = request.user.user_type

        if hostel_id:
            # Fetch all reviews for the specified hostel
            reviews = Reviews.objects.filter(hostel_id=hostel_id)
        elif user_type == 'student':
            hostel_b = request.query_params.get('hostel_id')
            if hostel_b:
                    reviews = Reviews.objects.filter(hostel_id=hostel_b)
                    print("Fetching A  Specific Hostel's Reviews")
            else: 


            # Fetch all reviews by the authenticated student
                reviews = Reviews.objects.filter(user=request.user)
                print("Fetching A Student's Reviews")

        elif user_type in ['admin', 'staff']:
            hostel_b = request.query_params.get('hostel_id')

            if hostel_b:
                    reviews = Reviews.objects.filter(hostel_id=hostel_b)
                    print("Fetching A  Specific Hostel's Reviews")
            else:
            # Fetch all reviews for the hostel associated with the staff or admin user
                hostel_id = request.user.hostel.id
                reviews = Reviews.objects.filter(hostel_id=hostel_id)
                print("Admin Fetching  Reviews")

        else:
            return Response({'detail': 'Invalid request. Specify a hostel_id if you are not a student.'}, status=status.HTTP_400_BAD_REQUEST)

        name = request.query_params.get('name')
        if name:
            reviews = reviews.filter(Q(review__icontains=name) | Q(rating__icontains=name))

        # Sort reviews by date created in descending order (latest first)
        reviews = reviews.order_by('-date_created')

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(reviews, request)
        
        # Serialize the reviews
        serializer = ReviewSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


from django.db.models import F

class ComplaintsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Extract form data

        if request.user.user_type in ['admin', 'staff']:
            if request.user.user_type not in ['admin', 'staff']:
                return Response({'detail': 'Only Admins or Staff are allowed to view complaints.'}, status=status.HTTP_403_FORBIDDEN)

            # Fetch all complaints for a hostel
            hostel_id = request.user.hostel
            complaints = Complaints.objects.filter(hostel=hostel_id, status__in=['Open', 'In Progress'])
        elif request.user.user_type == 'student':
            if request.user.user_type != 'student':
                return Response({'detail': 'Only students are allowed to view their complaints.'}, status=status.HTTP_403_FORBIDDEN)
            
            # Fetch all complaints by the authenticated student
            complaints = Complaints.objects.filter(student=request.user)
        else:
            return Response({'detail': 'Invalid complaint type.'}, status=status.HTTP_400_BAD_REQUEST)
        

        name = request.query_params.get('name')
        if name:
            complaints = complaints.filter(Q(status__icontains=name) | Q(description__icontains=name))

        # Sort complaints by date raised in descending order (latest first)
        complaints = complaints.order_by('-date_raised')

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(complaints, request)
        
        # Serialize the complaints
        serializer = ComplaintSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

from django.db.models import F

class MaintenanceListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Extract form data
        maintenance_type = request.data.get('maintenance_type')  # 'hostel' or 'student'

        if request.user.user_type in ['admin', 'staff']:
            if request.user.user_type not in ['admin', 'staff']:
                return Response({'detail': 'Only Admins or Staff are allowed to view complaints.'}, status=status.HTTP_403_FORBIDDEN)

            # Fetch all maintenance requests for a hostel
            hostel_id = request.user.hostel
            maintenance_requests = Maintenance.objects.filter(hostel=hostel_id, status__in=['Pending', 'In Progress'])
        elif request.user.user_type == 'student':
            if request.user.user_type != 'student':
                return Response({'detail': 'Only students are allowed to view their maintenance requests.'}, status=status.HTTP_403_FORBIDDEN)
            
            # Fetch all maintenance requests by the authenticated student
            maintenance_requests = Maintenance.objects.filter(student=request.user)
        else:
            print(request.user.user_type)

            return Response({'detail': 'Invalid maintenance request type.'}, status=status.HTTP_400_BAD_REQUEST)


        name = request.query_params.get('name')
        if name:
            maintenance_requests = maintenance_requests.filter(Q(status__icontains=name))

        # Sort maintenance requests by date raised in descending order (latest first)
        maintenance_requests = maintenance_requests.order_by('-date_raised')

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(maintenance_requests, request)
             
        # Serialize the maintenance requests
        serializer = MaintenanceSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

class DeleteReview(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, pk):
        review = Reviews.objects.filter(pk=pk).first()
        if not review:
            return Response({"message": "Review not found."}, status=status.HTTP_404_NOT_FOUND)
         
        # Check if the request user is the review user
        if request.user == review.user:
            review.delete()
            return Response({"message": "Review deleted successfully."})
        
        # Check if the request user is staff or admin and hostel matches
        if request.user.user_type in ['staff', 'admin'] and request.user.hostel == review.hostel:
            review.delete()
            return Response({"message": "Review deleted successfully."})
        
        return Response({"message": "You are not authorized to delete this review."}, status=status.HTTP_403_FORBIDDEN)


class ComplaintDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        complaint = Complaints.objects.filter(pk=pk).first()
        if not complaint:
            return Response({"message": "Complaint not found."}, status=status.HTTP_404_NOT_FOUND)
        
        user_type = request.user.user_type
        
        if user_type == 'student':
            if complaint.student != request.user:
                return Response({"message": "You are not authorized to view this complaint."}, status=status.HTTP_403_FORBIDDEN)
        else:
            if request.user.user_type not in ['admin', 'staff'] and request.user != complaint.student:
                return Response({"message": "You are not authorized to view this complaint."}, status=status.HTTP_403_FORBIDDEN)
            elif request.user.hostel != complaint.hostel:
                return Response({"message": "You are not authorized to view this complaint."}, status=status.HTTP_403_FORBIDDEN)
        
        # Serialize and return the complaint data
        serializer = ComplaintSerializer(complaint)  # Replace YourComplaintSerializerClass with your actual serializer class
        return Response(serializer.data)


class AccommodationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        accommodation = Accommodations.objects.filter(pk=pk).first()
        
        # Check if the accommodation exists
        if not accommodation:
            return Response({"message": "Accommodation not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the requesting user is an admin or staff of the hostel
        if request.user.user_type in ['admin', 'staff'] and request.user.hostel == accommodation.hostel:
            return self.serialize_accommodation(accommodation)
        
        # Check if the requesting user is the owner of the accommodation
        if request.user == accommodation.student:
            return self.serialize_accommodation(accommodation)
        
        return Response({"message": "You are not authorized to access this accommodation."}, status=status.HTTP_403_FORBIDDEN)

    def serialize_accommodation(self, accommodation):
        data = { 
            "id": accommodation.id,
            "studentid": accommodation.student.id if accommodation.student else None,
            "student": accommodation.student.Id_number if accommodation.student else None,
            "room": accommodation.room.id,
            "hostel": accommodation.hostel.hostel_name if accommodation.hostel else None,
            "check_in_date": accommodation.check_in_date,
            "check_out_date": accommodation.check_out_date,
            "price": accommodation.price,
            "paid": accommodation.paid,
            "status": accommodation.status,
            "duration": accommodation.duration,
        }
        return Response(data)


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve notifications for the current user
        notifications = Notice.objects.filter(user=request.user).order_by('-created_at')


        name = request.query_params.get('name')
        if name:
            notifications = notifications.filter(Q(message__icontains=name) | Q(notification_type__icontains=name))


        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(notifications, request)
       
        # Serialize notifications
        serializer = NoticeSerializer(result_page, many=True)
        
        return paginator.get_paginated_response(serializer.data)


class UpdateComplaintStatus(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Check if the request user type is admin or staff
        if request.user.user_type not in ['admin', 'staff']:
            return Response({"message": "You are not authorized to update complaint status."}, status=status.HTTP_403_FORBIDDEN)
        
        complaint = Complaints.objects.filter(pk=pk).first()
        if not complaint:
            return Response({"message": "Complaint not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the requesting user's hostel is equal to the complaint's hostel
        if request.user.hostel != complaint.hostel:
            return Response({"message": "You are not authorized to update this complaint."}, status=status.HTTP_403_FORBIDDEN)
        
        status_value = request.data.get('status', None)
        print(status_value) 
        if not status_value:

            return Response({"message": "Status not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        if status_value == 'In Progress':
            complaint.status = 'In Progress'
        elif status_value == 'Resolved':
            complaint.status = 'Resolved'
            complaint.resolved = True
            complaint.date_resolved = timezone.now()
        else:
            return Response({"message": "Invalid status provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        complaint.save()

        # Create a notice for the complaint owner
        notice = Notice.objects.create(
            user=complaint.student,
            notification_type = "complaints",

            message=f"Your complaint Of {complaint.description}  status has been updated to {complaint.status}."
        )
        
        return Response({"message": "Complaint status updated successfully."})


class UpdateAccommodation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        print(request.data)
        # Check if the request user type is admin or staff
        # if request.user.user_type not in ['admin', 'staff']:
        #     return Response({"message": "You are not authorized to update accommodations."}, status=status.HTTP_403_FORBIDDEN)
        
        accommodation = Accommodations.objects.filter(pk=pk).first()
        if not accommodation:
            return Response({"message": "Accommodation not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the requesting user's hostel is equal to the accommodation's hostel
        if request.user.hostel != accommodation.hostel:
            return Response({"detail": "You are not authorized to update this accommodation."}, status=status.HTTP_403_FORBIDDEN)
         
        new_room_id = request.data.get('room', None)
        status_value = request.data.get('status', None)

        if status_value == 'Active' and not accommodation.paid:  # Check 'paid' status first
            return Response({"detail": "Accommodation status cannot be updated to Active if Paid is False."}, status=status.HTTP_400_BAD_REQUEST)

        if (accommodation.status == 'Cancelled' and status_value == 'Completed') or (accommodation.status == 'Completed' and status_value == 'Cancelled') or (accommodation.status == 'Delayed Payment' and status_value == 'Completed'):
            return Response({"detail": "This Action Is Impossible Make sure The Accomodation Is Active First"}, status=status.HTTP_400_BAD_REQUEST)

        if status_value == 'Completed':
            if request.user.user_type not in ['admin', 'staff']:
                return Response({"message": "You are not authorized to update accommodations."}, status=status.HTTP_403_FORBIDDEN)
            else:
        
                hostel = Hostels.objects.get(id=accommodation.hostel.id)
                user_notice = Notice.objects.create(
                    user=accommodation.student,
                    notification_type = "accomodation",
                    message=f"Dear Customer Thank you For Choosing {hostel.hostel_name} We Hope You Enjoyed Your Stay Be sure to leave your Feedback for this hostel under Profile -> Reviews Thanks for Trusting and using Forte"
                )
                user = CustomUser.objects.get(id = accommodation.student.id)
                email_subject = "Thank You For Using Forte"
                email_message = f"Dear Customer Thank you For Choosing {hostel.hostel_name} for your stay We Hope You Enjoyed Your Stay Be sure to leave your Feedback for this hostel under Profile -> Reviews Thanks for Trusting and using Forte Be sure to tell others about our website ok :)"
                to_email = user.email
                data = {
                    'email_body': email_message,
                    'email_subject': email_subject,
                    'to_email': to_email
                }
                send_normal_email(data)



        if status_value == 'Cancelled':
            hostel = Hostels.objects.get(id=accommodation.hostel.id)

            user_notice = Notice.objects.create(
                user=accommodation.student,
                notification_type = "accomodation",
                message=f"Dear Customer Unfortunately Your Accomodation REF ACCOMODATION NO:{accommodation.id} in {hostel.hostel_name} Has Been Cancelled If Not By You It Was By The Hostel Management Please Contact Them For More Information"
            )
  
        if status_value in ['Completed', 'Cancelled']:
 
            hostel = Hostels.objects.get(id=accommodation.hostel.id)
            person = CustomUser.objects.get(id=accommodation.student.id)
            person.hostel = None
            person.save()

            hostel.count -= 1
            hostel.save()

            maintains = Maintenance.objects.filter(student = accommodation.student)
            for m in maintains:
                m.delete()

            complains = Complaints.objects.filter(student = accommodation.student)

            for c in complains:
                c.delete()

            if accommodation.room:
                old_room = accommodation.room
                old_room.current_occupancy -= 1
                old_room.save()

        if new_room_id:
            if request.user.user_type not in ['admin', 'staff']:
                return Response({"message": "You are not authorized to update accommodations."}, status=status.HTTP_403_FORBIDDEN)
            else:

                new_room = Rooms.objects.filter(room_number=new_room_id, capacity=accommodation.room.capacity, isAvailable=True).first()
                old_room = accommodation.room
 
            if not new_room:
                return Response({"detail": "New room is not available or does not match the capacity of the old room."}, status=status.HTTP_400_BAD_REQUEST)
            
            if accommodation.room and accommodation.room.hostel != new_room.hostel:
                return Response({"detail": "You cannot switch accommodations between hostels."}, status=status.HTTP_400_BAD_REQUEST)


            if old_room != new_room:
                if accommodation.room:
                    old_room = accommodation.room
                    old_room.current_occupancy -= 1
                    old_room.save()
                
                

                    new_room.current_occupancy += 1
                    new_room.save()

                    accommodation.room = new_room
                    accommodation.save()

        accommodation.status = status_value
        accommodation.save()
        
        return Response({"detail": "Accommodation updated successfully."})


from django.shortcuts import render, redirect
import stripe
from django.conf import settings


 
# @permission_classes([IsAuthenticated])
# class Pay(APIView):
#     def post(self, request, *args, **kwargs):
#         # Get the hostel associated with the user
#         hostel = request.user.hostel
#         if not hostel:
#             return Response({"message": "Hostel information not found."}, status=status.HTTP_404_NOT_FOUND)
        
#         # Set the Stripe API key from the hostel's stripe_key or fallback to the default key
#         # stripe.api_key = hostel.stripe_key if hostel.stripe_key else 'your_stripe_secret_key_here'
        
#         if request.user.hostel != hostel:
#             return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
#         prod_id = self.kwargs["pk"]

#         try:
#             product = Accommodations.objects.get(id=prod_id)
#             # Create a Stripe checkout session
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data': {
#                             'currency': 'usd',
#                             'unit_amount': int(product.price * 100),
#                             'product_data': {
#                                 'name': f'Accommodation {product.id}',
#                             }
#                         },
#                         'quantity': 1,
#                     },
#                 ],
#                 metadata={"product_id": product.id},
#                 mode='payment',
#                 success_url=settings.SITE_URL + '?success=true',
#                 cancel_url=settings.SITE_URL + '?canceled=true',
#             )
#             return redirect(checkout_session.url)
#         except Exception as e:
#             return Response({'msg': 'Something went wrong while creating Stripe session', 'error': str(e)}, status=500)

# 
#      def post(self, request, *args, **kwargs):
#         # Get the hostel associated with the user
#         hostel = request.user.hostel
#         if not hostel:
#             return Response({"message": "Hostel information not found."}, status=status.HTTP_404_NOT_FOUND)
        
#         # Set the Stripe API key from the hostel's stripe_key or fallback to the default key
#         stripe.api_key = hostel.stripe_key
        
#         if request.user.hostel != hostel:
#             return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
#         prod_id = self.kwargs["pk"]

#         try:
#             product = Accommodations.objects.get(id=prod_id)
#             # Create a Stripe checkout session
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data': {
#                             'currency': 'usd',
#                             'unit_amount': int(product.price * 100),
#                             'product_data': {
#                                 'name': f'Accommodation {product.id}',
#                             }
#                         },
#                         'quantity': 1,
#                     },
#                 ],
#                 metadata={"product_id": product.id},
#                 mode='payment',
#                 success_url=settings.SITE_URL + '?success=true',
#                 cancel_url=settings.SITE_URL + '?canceled=true',
#             )
#             return redirect(checkout_session.url)
#         except Exception as e:
#             return Response({'msg': 'Something went wrong while creating Stripe session', 'error': str(e)}, status=500)


# class Pay(APIView):
#     def post(self, request, *args, **kwargs):
#         prod_id = self.kwargs["pk"]
#         try:
#             product = Accommodations.objects.get(id=prod_id)
#             hostel = Hostels.objects.get(id=product.hostel.id)
#             stripe.api_key = hostel.stripe_key
#             product.paid = True
#             product.status = 'Active'
#             product.save()

#             # Create a Payments object
#             payment_description = f"Payment for accommodation {product.id} by {product.student.username} at {timezone.now()}."
#             payment = Payments.objects.create(
#                 user=product.student,
#                 hostel=product.hostel,
#                 accommodation=product,
#                 type='accommodation',
#                 amount=product.price,
#                 description=payment_description,
#                 currency='USD'  # Assuming default currency is USD
#             )

#             user_notice = Notice.objects.create(
#                 user=product.student,
#                 notification_type = "payment",

#                 message=f"Your payment for accommodation {product.id} has been received. Your accommodation is now active."
#             )
#             admin_notice = Notice.objects.create(
#                 user=product.hostel.administrator,
#                 notification_type = "payment",

#                 message=f"A payment for accommodation {product.id} has been received."
#             )
#             staff_notices = Notice.objects.filter(user__user_type='staff', user__hostel=product.hostel)
#             for staff_notice in staff_notices:
#                 staff_notice = Notice.objects.create(
#                     user=staff_notice.user,
#                     notification_type = "payment",

#                     message=f"A payment for accommodation {product.id} has been received."
#                 )

#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data': {
#                             'currency': 'usd',
#                             'unit_amount': int(product.price) * 100,
#                             'product_data': {
#                                 'name': product.id,
#                             }
#                         },
#                         'quantity': 1,
#                     },
#                 ],
#                 metadata={
#                     "product_id": product.id
#                 },
#                 mode='payment',
#                 success_url=settings.SITE_URL + '?success=true',
#                 cancel_url=settings.SITE_URL + '?canceled=true',
#             )

#             # Return redirect to Stripe checkout session URL
#             return redirect(checkout_session.url)

#         except Exception as e:
#             return Response({'msg': 'Something went wrong while creating Stripe session', 'error': str(e)}, status=500)
        


from rest_framework.exceptions import ValidationError



# class Pay(APIView):
#     def post(self, request, *args, **kwargs):
#         prod_id = self.kwargs["pk"]
#         try:
#             product = Accommodations.objects.get(id=prod_id)
#             hostel = Hostels.objects.get(id=product.hostel.id)

#             # Check if hostel has a stripe key
#             if not hostel.stripe_key:
#                 raise ValidationError("This hostel does not support payments at the moment.")

#             stripe.api_key = hostel.stripe_key
#             product.paid = True
#             product.status = 'Active'
#             product.save()

#             # Create a Payments object
#             payment_description = f"Payment for accommodation {product.id} by {product.student.username} at {timezone.now()}."
#             payment = Payments.objects.create(
#                 user=product.student,
#                 hostel=product.hostel,
#                 accommodation=product,
#                 type='accommodation',
#                 amount=product.price,
#                 description=payment_description,
#                 currency='USD'  # Assuming default currency is USD
#             )

#             user_notice = Notice.objects.create(
#                 user=product.student,
#                 notification_type = "payment",

#                 message=f"Your payment for accommodation {product.id} has been received. Your accommodation is now active."
#             )
#             admin_notice = Notice.objects.create(
#                 user=product.hostel.administrator,
#                 notification_type = "payment",

#                 message=f"A payment for accommodation {product.id} has been received."
#             )
#             staff_notices = Notice.objects.filter(user__user_type='staff', user__hostel=product.hostel)
#             for staff_notice in staff_notices:
#                 staff_notice = Notice.objects.create(
#                     user=staff_notice.user,
#                     notification_type = "payment",

#                     message=f"A payment for accommodation {product.id} has been received."
#                 )

#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data': {
#                             'currency': 'usd',
#                             'unit_amount': int(product.price) * 100,
#                             'product_data': {
#                                 'name': product.id,
#                             }
#                         },
#                         'quantity': 1,
#                     },
#                 ],
#                 metadata={
#                     "product_id": product.id
#                 },
#                 mode='payment',
#                 success_url=settings.SITE_URL + '?success=true',
#                 cancel_url=settings.SITE_URL + '?canceled=true',
#             )

#             # Return redirect to Stripe checkout session URL
#             return redirect(checkout_session.url)

#         except Accommodations.DoesNotExist:
#             return Response({'msg': 'Accommodation not found.'}, status=404)
#         except Hostels.DoesNotExist:
#             return Response({'msg': 'Hostel not found.'}, status=404)
#         except Exception as e:
#             return Response({'msg': 'Something went wrong while creating Stripe session', 'error': str(e)}, status=500)


from rest_framework.response import Response
from rest_framework.response import Response

class Pay(APIView):
    def post(self, request, *args, **kwargs):
        prod_id = self.kwargs["pk"]
        try:
            product = Accommodations.objects.get(id=prod_id)
            hostel = Hostels.objects.get(id=product.hostel.id)

            if not hostel.stripe_key:
                raise ValidationError("This hostel does not support payments at the moment.")

            stripe.api_key = hostel.stripe_key
            product.paid = True
            product.status = 'Active'
            product.save()

            payment_description = f"Payment for accommodation {product.id} by {product.student.username} at {timezone.now()}."
            payment = Payments.objects.create(
                user=product.student,
                hostel=product.hostel,
                accommodation=product,
                type='accommodation',
                amount=product.price,
                description=payment_description,
                currency='USD'
            )

            Notice.objects.create(
                user=product.student,
                notification_type="payment",
                message=f"Your payment for accommodation {product.id} has been received. Your accommodation is now active."
            )
            Notice.objects.create(
                user=product.hostel.administrator,
                notification_type="payment",
                message=f"A payment for accommodation {product.id} has been received."
            )
            staff_notices = Notice.objects.filter(user__user_type='staff', user__hostel=product.hostel)
            for staff_notice in staff_notices:
                Notice.objects.create(
                    user=staff_notice.user,
                    notification_type="payment",
                    message=f"A payment for accommodation {product.id} has been received."
                )

            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'unit_amount': int(product.price) * 100,
                            'product_data': {
                                'name': product.id,
                            }
                        },
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card'],  # Specify payment method types here
                metadata={
                    "product_id": product.id
                },
                mode='payment',
                success_url=settings.SITE_URL + '?success=true',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )

            return Response({'url': checkout_session.url})

        except Accommodations.DoesNotExist:
            return Response({'msg': 'Accommodation not found.'}, status=404)
        except Hostels.DoesNotExist:
            return Response({'msg': 'Hostel not found.'}, status=404)
        except Exception as e:
            return Response({'msg': 'Something went wrong while creating Stripe session', 'error': str(e)}, status=500)

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import stripe



# @csrf_exempt
# def stripe_webhook(request):
#     payload = request.body
#     sig_header = request.META['HTTP_STRIPE_SIGNATURE']
#     event = None




    
#     hostel = settings.GLOBAL_HOSTEL
#     webhook = hostel.stripe_webhook

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, webhook
#         )
#     except ValueError as e:
#         # Invalid payload
#         return HttpResponse(status=400)
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         return HttpResponse(status=400)

#     # Handle the checkout.session.completed event
#     if event['type'] == 'checkout.session.completed':
#         session = event['data']['object']

#         customer_email = session["customer_details"]["email"]
#         product_id = session["metadata"]["product_id"]

#         product = Accommodations.objects.get(id=product_id)
#         hostel = Hostels.objects.get(id=product.hostel.id)

#         user_notice = Notice.objects.create(
#             user=product.student,
#             notification_type="payment",
#             message=f"Your payment for accommodation {product.id} has been received. Your accommodation is now active."
#         )
#         admin_notice = Notice.objects.create(
#             user=product.hostel.administrator,
#             notification_type="payment",
#             message=f"A payment for accommodation {product.id} has been received."
#         )
#         staff_notices = Notice.objects.filter(user__user_type='staff', user__hostel=product.hostel)
#         for staff_notice in staff_notices:
#             staff_notice = Notice.objects.create(
#                 user=staff_notice.user,
#                 notification_type="payment",
#                 message=f"A payment for accommodation {product.id} has been received."
#             )


#         product.paid = True
#         product.status = 'Active'
#         product.save()


#     # Handle the payment_intent.succeeded event
#     elif event["type"] == "payment_intent.succeeded":
#         intent = event['data']['object']

#         stripe_customer_id = intent["customer"]
#         stripe_customer = stripe.Customer.retrieve(stripe_customer_id)

#         customer_email = stripe_customer['email']
#         product_id = intent["metadata"]["product_id"]

#         product = Accommodations.objects.get(id=product_id)
#         hostel = Hostels.objects.get(id=product.hostel.id)

#         user_notice = Notice.objects.create(
#             user=product.student,
#             notification_type="payment",
#             message=f"Your payment for accommodation {product.id} has been received. Your accommodation is now active."
#         )
#         admin_notice = Notice.objects.create(
#             user=product.hostel.administrator,
#             notification_type="payment",
#             message=f"A payment for accommodation {product.id} has been received."
#         )
#         staff_notices = Notice.objects.filter(user__user_type='staff', user__hostel=product.hostel)
#         for staff_notice in staff_notices:
#             staff_notice = Notice.objects.create(
#                 user=staff_notice.user,
#                 notification_type="payment",
#                 message=f"A payment for accommodation {product.id} has been received."
#             )


#         product.paid = True
#         product.status = 'Active'
#         product.save()


#     return HttpResponse(status=200)




        
from django.db.models import F

class PaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = request.data
        # Retrieve the user type
        user_type = user.user_type

        if user_type == 'student':
            # Retrieve payments for the student
            payments = Payments.objects.filter(user=user)
        elif user_type in ['admin', 'staff']:
            # Check if the user is authorized to view hostel payments
            if user.user_type != 'admin':
                return Response({"message": "You are not authorized to view these payments."}, status=status.HTTP_403_FORBIDDEN)
            # Retrieve payments for the hostel
            payments = Payments.objects.filter(hostel=user.hostel.id)
        else:
            return Response({"message": "Invalid user type. Please provide either 'student' or 'admin/staff'."}, status=status.HTTP_400_BAD_REQUEST)

        # Filter payments by name if 'name' query parameter is provided
        name = request.query_params.get('name')
        if name:
            payments = payments.filter(Q(type__icontains=name) | Q(amount__icontains=name)| Q(payment_method__icontains=name))

        # Sort payments by payment date in descending order (latest first)
        payments = payments.order_by('-payment_date')

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(payments, request)
        

        serializer = PaymentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

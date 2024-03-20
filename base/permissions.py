from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsAuthorizedToViewRoom(BasePermission):
    message = 'You are not authorized to view this room.'

    def has_permission(self, request, view):
        if not request.user.hostel:
            print("DEBUG: User does not have a hostel assigned.")
            return False
        return True

    def has_object_permission(self, request, view, room):
        if request.user.hostel != room.hostel:
            print("DEBUG: User is not authorized to view this room. Hostels don't match.")
            return False
        return True

class IsAdminOrStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.user_type == 'admin' or request.user.user_type == 'staff')



class IsAdminOrStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type in ['admin', 'staff']
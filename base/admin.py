from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from hostels.models import *

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser 
    list_display = ('email', 'username', 'is_staff','is_verified', 'is_active', 'gender', 'date_joined', 'avi', 'isForte', "user_type")
    list_filter = ('email', 'username', 'is_staff','is_verified', 'is_active', 'gender', "user_type")
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal Info', {'fields': ('gender', 'date_joined', 'avi', 'date_of_birth', 'contact_number', "user_type",'address', 'hostel', 'guardian_name', 'guardian_contact', 'guardian2_name', 'guardian2_contact', 'Id_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'isForte','is_verified', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_verified','is_staff',  'hostel','is_superuser', "user_type",'user_permissions', 'bio', 'avi', 'auth_provider', 'date_of_birth', 'contact_number', 'address', 'guardian_name', 'guardian_contact', 'guardian2_name', 'guardian2_contact', 'Id_number'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    readonly_fields = ('date_joined',)  # Make date_joined non-editable

# Register the CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Accommodations)
admin.site.register(Complaints)
admin.site.register(Reviews)
admin.site.register(Payments)
admin.site.register(OneTimePassword) 
admin.site.register(Hostels)
admin.site.register(Rooms)
admin.site.register(Maintenance)
admin.site.register(Facilities)
admin.site.register(Notice)




















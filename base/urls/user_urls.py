from django.urls import path, include
from ..views.user_views import *


urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('accounts/login/', MyLoginView.as_view(), name='account_login'),

    path('reset/', ResetImage.as_view(), name='image-reset'),

    path('upload/', uploadImage.as_view(), name='image-upload'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('profile/', GetUserProfile.as_view(), name='user-profile'),
    path('delete/', deleteAccount.as_view(), name='delete'),
    path('remove/<str:pk>/', RemoveStaff.as_view(), name='delete-staff'),
    path('getotp/', Createotp.as_view(), name='create-otp'),
    path('verify/', VerifyUserEmail.as_view(), name='verify'),
    path('profile/update/', UpdateUserProfile.as_view(), name='user-profile-update'),
    path('', GetUsersView.as_view(), name='users'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='reset-password-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('<str:pk>/', GetUserById.as_view(), name='user'),

]

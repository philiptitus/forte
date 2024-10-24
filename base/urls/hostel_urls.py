from django.urls import path
from ..views.hostel_views import *


urlpatterns = [

    path('reset/', ResetHostelImage.as_view(), name='image-reset'),
    path('cronner/', HandleAccommodationsView.as_view(), name='handle-accommodations'),
    path('upload/', UploadImage.as_view(), name='image-upload'),
    path('new/', HostelCreateView.as_view(), name='create-hostel'),
    path('new_room/', RoomsCreateView.as_view(), name='create-room'),
    path('rooms/', RoomListView.as_view(), name='rooms'), 
    path('facilities/', FacilityListView.as_view(), name='facilities'), 
    path('edit/', EditHostelInfo.as_view(), name='hostel-edit'),
    path('accomodations/', AccommodationListView.as_view(), name='accomodations'),
    path('', HostelListView.as_view(), name='all-hostels'),
    path('delete/', DeleteHostel.as_view(), name='hostel-delete'),
    path('<str:pk>/', HostelDetailView.as_view(), name='hostel-detail'),

    path('rooms/<str:pk>/', RoomDetailView.as_view(), name='room-detail'),
    path('rooms/<str:pk>/delete/', DeleteRoom.as_view(), name='room-delete'),
    path('notice/<str:pk>/delete/', DeleteNoticeAPIView.as_view(), name='notice-delete'),
    path('accomodations/<str:pk>/', AccommodationDetailView.as_view(), name='accomodation-detail'),
    path('maintenance/<int:pk>/update/', UpdateMaintenanceStatus.as_view(), name='maintenance-update'),
    path('rooms/<int:pk>/update/', EditRoom.as_view(), name='edit-room'),
    path('maintenance/<int:pk>/', MaintenanceDetailView.as_view(), name='maintenance-update'),


]

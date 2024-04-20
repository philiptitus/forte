from django.urls import path
from ..views.student_views import *
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('new/', AccommodationCreateView.as_view(), name='create-accomodation'),
    path('create_maintenance/', CreateMaintenanceAPIView.as_view(), name='create-maintenance'),
    path('create_complaint/', CreateComplaintAPIView.as_view(), name='create-complaint'),
    path('create_review/', ReviewCreateView.as_view(), name='create-review'),
    # path('webhooks/stripe/', stripe_webhook, name='stripe-webhook'),

    path('reviews/', ReviewListView.as_view(), name='review-list'),
    path('notifications/', NotificationListView.as_view(), name='notifications-list'),
    path('payments/', PaymentListView.as_view(), name='payment-list'),
    path('complaints/', ComplaintsListView.as_view(), name='complaints-list'),
    path('maintenances/', MaintenanceListView.as_view(), name='maintenance-list'),
    path('pay/<pk>/', Pay.as_view(), name='checkout_session'),
    path('reviews/<int:pk>/delete/', DeleteReview.as_view(), name='review-delete'),
    path('complaints/<int:pk>/', ComplaintDetailView.as_view(), name='complaints-detail'),
    path('complaints/<int:pk>/update/', UpdateComplaintStatus.as_view(), name='complaints-update'),
    path('<int:pk>/update/', UpdateAccommodation.as_view(), name='accomodation-update'),
    path('<int:pk>/', AccommodationDetailView.as_view(), name='accomodation'),





]

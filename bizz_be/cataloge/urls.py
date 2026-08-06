from django.urls import path
from .views import (
    ServiceListAPIView,
    ServiceDetailAPIView,
    TechnologyListAPIView,
    EnquiryCreateAPIView,
    CallScheduleCreateAPIView,
    DemoBookingCreateAPIView
)

urlpatterns = [
    path('services/', ServiceListAPIView.as_view(), name='service-list'),
    path('services/<slug:slug>/', ServiceDetailAPIView.as_view(), name='service-detail'),
    path('technologies/', TechnologyListAPIView.as_view(), name='technology-list'),
    path('enquiries/', EnquiryCreateAPIView.as_view(), name='enquiry-create'),
    path('schedule-call/', CallScheduleCreateAPIView.as_view(), name='schedule-call'),
    path('book-demo/', DemoBookingCreateAPIView.as_view(), name='book-demo'),
]

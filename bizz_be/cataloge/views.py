from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Service, Technology, Enquiry, CallSchedule, DemoBooking
from .serializers import (
    ServiceSerializer, 
    TechnologySerializer, 
    EnquirySerializer, 
    CallScheduleSerializer, 
    DemoBookingSerializer
)

class ServiceListAPIView(generics.ListAPIView):
    queryset = Service.objects.all().order_by('id')
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class ServiceDetailAPIView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class TechnologyListAPIView(generics.ListAPIView):
    queryset = Technology.objects.all().order_by('category', 'order', 'name')
    serializer_class = TechnologySerializer
    permission_classes = [AllowAny]


class EnquiryCreateAPIView(generics.CreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]


class CallScheduleCreateAPIView(generics.CreateAPIView):
    queryset = CallSchedule.objects.all()
    serializer_class = CallScheduleSerializer
    permission_classes = [AllowAny]


class DemoBookingCreateAPIView(generics.CreateAPIView):
    queryset = DemoBooking.objects.all()
    serializer_class = DemoBookingSerializer
    permission_classes = [AllowAny]

from rest_framework import serializers
from .models import Service, Technology, Enquiry, CallSchedule, DemoBooking

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = '__all__'
        read_only_fields = ('status', 'created_at')


class EnquiryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = '__all__'


class CallScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallSchedule
        fields = '__all__'
        read_only_fields = ('created_at',)


class DemoBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoBooking
        fields = '__all__'
        read_only_fields = ('created_at',)

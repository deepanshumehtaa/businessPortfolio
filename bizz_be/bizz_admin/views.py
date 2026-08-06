import datetime
import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from cataloge.models import Service, Technology, Enquiry, CallSchedule, DemoBooking
from blogs.models import BlogPost, BlogCategory
from cataloge.serializers import (
    ServiceSerializer, 
    EnquiryAdminSerializer, 
    CallScheduleSerializer, 
    DemoBookingSerializer
)
from blogs.serializers import BlogPostSerializer, BlogPostWriteSerializer, BlogCategorySerializer

class AdminLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:
            # Generate JWT token using PyJWT
            payload = {
                'user_id': user.id,
                'username': user.username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            if isinstance(token, bytes):
                token = token.decode('utf-8')

            return Response({
                'token': token,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid admin credentials or not staff user'}, status=status.HTTP_400_BAD_REQUEST)


class AdminDashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_enquiries = Enquiry.objects.count()
        total_calls = CallSchedule.objects.count()
        total_demos = DemoBooking.objects.count()
        total_blogs = BlogPost.objects.count()
        total_services = Service.objects.count()

        recent_enquiries = Enquiry.objects.all().order_by('-created_at')[:5]
        recent_calls = CallSchedule.objects.all().order_by('-created_at')[:5]
        recent_demos = DemoBooking.objects.all().order_by('-created_at')[:5]

        return Response({
            'stats': {
                'totalEnquiries': total_enquiries,
                'totalCalls': total_calls,
                'totalDemos': total_demos,
                'totalBlogs': total_blogs,
                'totalServices': total_services,
            },
            'recentEnquiries': EnquiryAdminSerializer(recent_enquiries, many=True).data,
            'recentCalls': CallScheduleSerializer(recent_calls, many=True).data,
            'recentDemos': DemoBookingSerializer(recent_demos, many=True).data,
        })


# Enquiries Admin Views
class AdminEnquiryListAPIView(generics.ListAPIView):
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquiryAdminSerializer
    permission_classes = [IsAuthenticated]


class AdminEnquiryUpdateAPIView(generics.UpdateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquiryAdminSerializer
    permission_classes = [IsAuthenticated]


# Calls Admin Views
class AdminCallScheduleListAPIView(generics.ListAPIView):
    queryset = CallSchedule.objects.all().order_by('-scheduled_datetime')
    serializer_class = CallScheduleSerializer
    permission_classes = [IsAuthenticated]


# Demos Admin Views
class AdminDemoBookingListAPIView(generics.ListAPIView):
    queryset = DemoBooking.objects.all().order_by('-booking_date', '-booking_time')
    serializer_class = DemoBookingSerializer
    permission_classes = [IsAuthenticated]


# Blogs Admin Manage Views
class AdminBlogListCreateAPIView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all().order_by('-published_at')
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogPostWriteSerializer
        return BlogPostSerializer


class AdminBlogRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return BlogPostWriteSerializer
        return BlogPostSerializer


# Services Admin Manage Views
class AdminServiceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Service.objects.all().order_by('-created_at')
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]


class AdminServiceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

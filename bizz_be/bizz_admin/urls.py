from django.urls import path
from .views import (
    AdminLoginAPIView,
    AdminDashboardStatsAPIView,
    AdminEnquiryListAPIView,
    AdminEnquiryUpdateAPIView,
    AdminCallScheduleListAPIView,
    AdminDemoBookingListAPIView,
    AdminBlogListCreateAPIView,
    AdminBlogRetrieveUpdateDestroyAPIView,
    AdminServiceListCreateAPIView,
    AdminServiceRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('login/', AdminLoginAPIView.as_view(), name='admin-login'),
    path('dashboard/', AdminDashboardStatsAPIView.as_view(), name='admin-dashboard'),
    
    # Lead / Form data listings
    path('enquiries/', AdminEnquiryListAPIView.as_view(), name='admin-enquiries'),
    path('enquiries/<int:pk>/', AdminEnquiryUpdateAPIView.as_view(), name='admin-enquiry-update'),
    path('calls/', AdminCallScheduleListAPIView.as_view(), name='admin-calls'),
    path('demos/', AdminDemoBookingListAPIView.as_view(), name='admin-demos'),
    
    # CRUD managing
    path('blogs/', AdminBlogListCreateAPIView.as_view(), name='admin-blog-list-create'),
    path('blogs/<int:pk>/', AdminBlogRetrieveUpdateDestroyAPIView.as_view(), name='admin-blog-detail'),
    path('services/', AdminServiceListCreateAPIView.as_view(), name='admin-service-list-create'),
    path('services/<int:pk>/', AdminServiceRetrieveUpdateDestroyAPIView.as_view(), name='admin-service-detail'),
]

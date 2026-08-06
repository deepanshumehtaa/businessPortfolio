from django.urls import path
from .views import CategoryListAPIView, BlogListAPIView, BlogDetailAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('posts/', BlogListAPIView.as_view(), name='blog-list'),
    path('posts/<slug:slug>/', BlogDetailAPIView.as_view(), name='blog-detail'),
]

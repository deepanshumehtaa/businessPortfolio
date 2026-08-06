from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import BlogCategory, BlogPost
from .serializers import BlogCategorySerializer, BlogPostSerializer

class CategoryListAPIView(generics.ListAPIView):
    queryset = BlogCategory.objects.all().order_by('name')
    serializer_class = BlogCategorySerializer
    permission_classes = [AllowAny]


class BlogListAPIView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = BlogPost.objects.all().order_by('-published_at')
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset


class BlogDetailAPIView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]

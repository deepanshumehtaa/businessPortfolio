from django.db import models

class BlogCategory(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=60, unique=True)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True)
    author = models.CharField(max_length=100, default="Admin")
    category = models.ForeignKey(BlogCategory, related_name="blogs", on_delete=models.SET_NULL, null=True)
    content = models.TextField(help_text="Detailed blog content in Markdown")
    image_url = models.CharField(max_length=255, blank=True, help_text="Header image URL")
    meta_title = models.CharField(max_length=150, blank=True, help_text="SEO Title")
    meta_description = models.TextField(blank=True, help_text="SEO Description")
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title

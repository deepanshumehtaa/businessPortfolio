from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    icon = models.CharField(max_length=50, help_text="Bootstrap icon name or custom identifier")
    summary = models.TextField(help_text="Short description for cards")
    description = models.TextField(help_text="Rich detailed description in Markdown/HTML")
    category = models.CharField(max_length=50, help_text="e.g., Software Engineering, AI & Automation, Marketing")
    features = models.JSONField(default=list, help_text="List of core features")
    meta_title = models.CharField(max_length=150, blank=True, help_text="SEO Title")
    meta_description = models.TextField(blank=True, help_text="SEO Description")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Technology(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, help_text="e.g., Frontend, Backend, Mobile, Cloud, AI")
    icon_svg = models.TextField(help_text="Raw SVG content or path for direct rendering")
    order = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Technologies"
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"{self.category} - {self.name}"


class Enquiry(models.Model):
    STATUS_CHOICES = (
        ('New', 'New'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
    )
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    enquiry_type = models.CharField(max_length=50, default='General Inquiry')
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Enquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.enquiry_type} from {self.name} ({self.company or 'No Company'})"


class CallSchedule(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    scheduled_datetime = models.DateTimeField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-scheduled_datetime']

    def __str__(self):
        return f"Call with {self.name} on {self.scheduled_datetime}"


class DemoBooking(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True)
    service_required = models.CharField(max_length=100)
    booking_date = models.DateField()
    booking_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-booking_date', '-booking_time']

    def __str__(self):
        return f"Demo for {self.service_required} with {self.name} on {self.booking_date} at {self.booking_time}"

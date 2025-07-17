from django.db import models

class Staff(models.Model):
    DEPARTMENT_CHOICES = [
        ('Administration', 'Administration'),
        ('Medical', 'Medical'),
        ('Nursing', 'Nursing'),
        ('Support', 'Support'),
        ('Technical', 'Technical')]
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    department = models.CharField(max_length=30, choices=DEPARTMENT_CHOICES)
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)
    date_joined = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to='staff_pictures/', blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.department}"

    class Meta:
        verbose_name_plural = "Staff Members"
        ordering = ['first_name']
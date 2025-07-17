from django.db import models
from datetime import date

class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    age = models.IntegerField(blank=True, null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    assigned_doctor = models.ForeignKey('doctor.Doctor', on_delete=models.SET_NULL, null=True, blank=True)
    appointment_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    consultation_details = models.TextField(blank=True, null=True)

    def __str__(self):
        prefix = "Mr" if self.gender == 'Male' else "Mrs"
        return f"{prefix}. {self.first_name} {self.last_name}"

    def calculate_age(self):
        today = date.today()
        birth_date = self.date_of_birth
        return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

    def save(self, *args, **kwargs):
        if self.date_of_birth:
            self.age = self.calculate_age()
        super().save(*args, **kwargs)

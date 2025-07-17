from datetime import date
from django.db import models

class Doctor(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    SPECIALIZATION_CHOICES = [
        ('Cardiologist', 'Cardiologist'),
        ('Dermatologist', 'Dermatologist'),
        ('Neurologist', 'Neurologist'),
        ('Pediatrician', 'Pediatrician'),
        ('General Practitioner', 'General Practitioner'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    specialization = models.CharField(max_length=30, choices=SPECIALIZATION_CHOICES)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    age = models.IntegerField(blank=True, null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} - {self.specialization}"

    def calculate_age(self):
        today = date.today()
        birth_date = self.date_of_birth
        return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

    def save(self, *args, **kwargs):
        if self.date_of_birth:
            self.age = self.calculate_age()
        super().save(*args, **kwargs)
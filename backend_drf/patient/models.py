from django.db import models
from datetime import date

class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    username = models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dateofbirth = models.DateField()
    age = models.IntegerField(blank=True, null=True)
    email = models.EmailField(unique=True)
    mobilenumber = models.CharField(max_length=15, blank=True, null=True)
    password = models.CharField(max_length=20, default='1234')
    assigned_doctor = models.ForeignKey('doctor.Doctor', on_delete=models.SET_NULL, null=True, blank=True)
    appointment_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    consultation_details = models.TextField(blank=True, null=True)

    def __str__(self):
        prefix = "Mr" if self.gender == 'Male' else "Mrs"
        return f"{prefix}. {self.username}"

    def calculate_age(self):
        today = date.today()
        birth_date = self.dateofbirth
        return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

    def save(self, *args, **kwargs):
        if self.dateofbirth:
            self.age = self.calculate_age()
        super().save(*args, **kwargs)

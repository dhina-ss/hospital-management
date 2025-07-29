from rest_framework import serializers
from .models import Doctor, DoctorAppointment

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'
        read_only_fields = ['age', 'created_at']

    def validate_contact_number(self, value):
        if not value.isdigit() or len(value) < 10:
            raise serializers.ValidationError("Contact number must be numeric and at least 10 digits long.")
        return value
    
    def validate_email(self, value):
        if Doctor.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

class DoctorAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAppointment
        fields = '__all__'
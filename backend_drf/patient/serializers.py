from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['age']

    def validate_contact_number(self, value):
        if not value.isdigit() or len(value) < 10:
            raise serializers.ValidationError("Contact number must be numeric and at least 10 digits long.")
        return value
    def validate_email(self, value):
        if Patient.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
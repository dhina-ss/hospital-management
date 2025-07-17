from rest_framework import serializers
from .models import Staff

class StaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True, 
                                     min_length=6, style={'input_type': 'password'})
    class Meta:
        model = Staff
        fields = '__all__'
        read_only_fields = ['date_joined', 'is_active']
    
    def validate_email(self, value):
        if Staff.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate_contact_number(self, value):
        if not value.isdigit() or len(value) < 10:
            raise serializers.ValidationError("Contact number must be numeric and at least 10 digits long.")
        return value
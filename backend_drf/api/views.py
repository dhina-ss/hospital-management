from rest_framework.views import APIView
from patient.serializers import PatientSerializer
from patient.models import Patient
from rest_framework.response import Response
from rest_framework import status
from doctor.models import Doctor
from doctor.serializers import DoctorSerializer
from staff.models import Staff
from staff.serializers import StaffSerializer

class PatientViewSet(APIView):

    def get(self, request):
        patient = Patient.objects.all()
        serializer = PatientSerializer(patient, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Patient added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            patient = Patient.objects.get(pk=pk)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Patient updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DoctorViewSet(APIView):

    def get(self, request):
        doctor = Doctor.objects.all()
        serializer = DoctorSerializer(doctor, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Doctor added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffViewSet(APIView):
    
    def get(self, request):
        staff = Staff.objects.all()
        serializer = StaffSerializer(staff, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Staff added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
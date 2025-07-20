from django.urls import path
from .views import PatientViewSet, PatientRegisterSet, DoctorViewSet, StaffViewSet, ProtectedViewSet

urlpatterns = [
    path('patients/', PatientViewSet.as_view(), name='patient'),
    path('patient-register/', PatientRegisterSet.as_view(), name='patient-register'),
    path('doctors/', DoctorViewSet.as_view(), name='doctor'),
    path('staff/', StaffViewSet.as_view(), name='staff'),
    path('protected/', ProtectedViewSet.as_view(), name='protected'),
]
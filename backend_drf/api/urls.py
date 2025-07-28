from django.urls import path
from .views import PatientViewSet, PatientRegisterSet, DoctorViewSet
from .views import StaffViewSet, ProtectedViewSet, PatientDetailsViewSet

urlpatterns = [
    path('patients/', PatientViewSet.as_view(), name='patient'),
    path('patient-register/', PatientRegisterSet.as_view(), name='patient-register'),
    path('patient/<int:pk>/', PatientDetailsViewSet.as_view(), name='patient-details'),
    path('doctors/', DoctorViewSet.as_view(), name='doctor'),
    path('staff/', StaffViewSet.as_view(), name='staff'),
    path('protected/', ProtectedViewSet.as_view(), name='protected'),
]
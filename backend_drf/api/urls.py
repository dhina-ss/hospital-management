from django.urls import path
from .views import PatientViewSet, DoctorViewSet, StaffViewSet

urlpatterns = [
    path('patients/', PatientViewSet.as_view(), name='patient'),
    path('doctors/', DoctorViewSet.as_view(), name='doctor'),
    path('staff/', StaffViewSet.as_view(), name='staff'),
]
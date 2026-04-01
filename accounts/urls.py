from django.urls import path
from .views import signup_view, login_view, dashboard_view, logout_view

urlpatterns = [
    path('', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('dashboard/', dashboard_view, name='dashboard'),
    path('logout/', logout_view, name='logout'),
]

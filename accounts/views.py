from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

def signup_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, email=email, password=password)
            return redirect('login')
    return render(request, 'accounts/signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('dashboard')
    return render(request, 'accounts/login.html')

def dashboard_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'accounts/dashboard.html')

def logout_view(request):
    logout(request)
    return redirect('login')

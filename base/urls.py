from django.contrib import admin
from django.urls import path

from . import views
urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('student-page/<int:student_id>', views.student_page, name='student_page'),
    path('student-dashboard/<int:student_id>', views.student_dashboard, name='student_dashboard'),
    path('logout', views.logout, name='logout'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
]




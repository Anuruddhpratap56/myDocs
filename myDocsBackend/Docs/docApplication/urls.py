from django.urls import path
from docApplication import user


urlpatterns = [
    path('createUser/',user.createUserView.as_view()),
    path('login/',user.authLogin.as_view())
]
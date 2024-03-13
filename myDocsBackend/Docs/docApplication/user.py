from rest_framework.views import APIView
from app.models import Users
from  django.db import transaction
from django.http import JsonResponse
from datetime import timedelta,datetime
from rest_framework import status
from app.models import Users
from django.contrib.auth.hashers import make_password


class authLogin(APIView):
    def post(self,request):
        if(request.method=='POST'):
            name=request.POST.get('email')
            password=request.POST.get('password')
            try:
                username=Users.objects.get(email=name)
                check_password=username.check_password(password)
            except Users.DoesNotExist:
                return JsonResponse({"message":"Requested user does not exist"})
            
            if username is not None and check_password:
                return JsonResponse({"message":"Authenticated successfully","data":{
                    'name':username.email,
                    'major':username.major
                }})
                
            else:
                return JsonResponse({'message':'login failed please retry'})
            
            


class createUserView(APIView):

    def post(self,request):
        try:
            requestData=request.data
            about=requestData.get('about') if requestData.get('about') else None
            profile_picture=requestData.get('profile_picture') if requestData.get('profile_picture') else None

            user_instance=Users.objects.create(
                name=requestData.get('name'),
                age=requestData.get('age'),
                email=requestData.get('email'),
                major=requestData.get('major'),
                about=about,
                role=requestData.get('role'),
                profile_picture=profile_picture,
                dob=requestData.get('dob'),
                password=make_password(requestData.get('password')),
                is_superuser=requestData.get('is_superuser')
            )
            user_instance.save()
        except Exception as e:
            return JsonResponse({'error':str(e)})
        return JsonResponse({"message":"user created successfully"},status=status.HTTP_200_OK)
    
    def get(self,request):
        try:
            users=Users.objects.all()
            user_data=[{
                "name":user.name,
                "email":user.email,
                "age":user.age,
                "mojor":user.major,
                "about":user.about,
                "role":user.role,
                "dob":user.dob
            }for user in users]
            
        except Users.DoesNotExist:
            return JsonResponse({"message":"Requested user does not exist"})
        except Exception as e:
            return JsonResponse({"message",str(e)})
        return JsonResponse({"data":user_data},status=status.HTTP_200_OK)
        
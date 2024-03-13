from django.db import models
import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, UserManager


class Users(AbstractBaseUser,PermissionsMixin):
    name=models.CharField(max_length=50,null=False,blank=True)
    age=models.CharField(max_length=3,null=False,blank=True)
    email=models.EmailField(unique=True,null=False,blank=False)
    major=models.CharField(max_length=75,null=True,blank=True)
    about=models.TextField(max_length=1000,null=True,blank=True)
    role = models.CharField(max_length=50,default=False)
    profile_picture = models.FileField(upload_to='profile_pictures/', null=True, blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    groups=models.ManyToManyField('auth.Group', related_name='user_groups')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='users_set', blank=True)
    
    objects=UserManager()
    USERNAME_FIELD="email"
    
    def __str__(self):
        self.email
        

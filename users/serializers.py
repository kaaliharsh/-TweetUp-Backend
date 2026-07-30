from django.contrib.auth.models import User
from .models import Profile
from rest_framework import serializers

# create a serializer for the User model to handle registration
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id','username','email','password']

    def create(self, validated_data): # override the create method to create a user and a profile
        user = User.objects.create_user(username=validated_data['username'],email=validated_data['email'],password=validated_data['password'])
        return user


# create a serializer for the Profile model to handle profile data  
class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['username','bio','profile_picture','followers_count','following_count']
    def get_followers_count(self,obj):
        return obj.followers_count()
    def get_following_count(self,obj):
        return obj.following_count()
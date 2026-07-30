from django.shortcuts import render 
from rest_framework import generics
from .serializers import RegisterSerializer # import the RegisterSerializer to handle user registration
from django.contrib.auth.models import User # import the User model to create a user instance in the RegisterAPIView
from django.shortcuts import get_object_or_404 # import get_object_or_404 to handle the case when a profile is not found
from rest_framework.permissions import ( # import IsAuthenticated to restrict access to authenticated users only
    IsAuthenticated
)
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Profile
from .serializers import (ProfileSerializer)
from rest_framework.parsers import (MultiPartParser,FormParser,JSONParser) # import parsers to handle multipart form data and JSON data in profile update API

# create a view to handle user registration
class RegisterAPIView( 
        generics.CreateAPIView):
    serializer_class = RegisterSerializer
    
# create a view to handle profile retrieval for the authenticated user (Profile API)
class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data)
    
    
# create a view to handle following another user (follow API)
class FollowAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, username):
        user_to_follow = get_object_or_404(User,username=username)
        if user_to_follow == request.user:
            return Response({"error": "You cannot follow yourself"},status=400)
        user_to_follow.profile.followers.add(request.user)
        return Response({"message": f"You are now following {username}"})
        
 
# create a view to handle unfollowing another user (unfollow API)       
class UnfollowAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, username):
        user_to_unfollow = get_object_or_404(User,username=username)
        user_to_unfollow.profile.followers.remove(request.user)
        return Response({"message": f"You unfollowed {username}"})


# create a view to handle searching for users by username (user search API)
class UserSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        query = request.GET.get('q','')
        users=User.objects.filter(username__icontains=query)
        result=[{"id": u.id,"username": u.username}
            for u in users]
        return Response(result)
        
        
# create a view to handle updating the profile of the authenticated user (update profile API)
class UpdateProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser,JSONParser]

    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)
    
    
# create a view to handle retrieving the public profile of a user by username (public profile API)    
class PublicProfileAPIView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User,username=username)
        profile = user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
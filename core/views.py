from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
class HomeAPIView(APIView):

    def get(self, request): # handle GET requests to the home page and return a simple JSON response with project information
        return Response({"project": "TweetUp Backend","version": "1.0","status": "running"})
        
        
def feed_page(request):# render the feed.html template when the user accesses the feed page
    return render(request,'feed.html')
def login_page(request):# render the login.html template when the user accesses the login page
    return render(request,'login.html')
def register_page(request):# render the register.html template when the user accesses the register page
    return render(request,'register.html')
def profile_page(request):# render the profile.html template when the user accesses the profile page
    return render(request,'profile.html')

def create_tweet_page(request):# render the create_tweet.html template when the user accesses the create tweet page
    return render(request,'create_tweet.html')

def edit_profile_page(request): # render the edit_profile.html template when the user accesses the edit profile page
    return render(request,'edit_profile.html')

def public_profile_page(request, username):# render the public_profile.html template when the user accesses the public profile page of another user, passing the username as context to display the correct profile information
    return render(request,'public_profile.html',{'username': username})

def search_users_page(request): # render the search_users.html template when the user accesses the search users page
    return render(request,'search_users.html')
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import (IsAuthenticated)
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tweet
from .serializers import TweetSerializer
from .permissions import (IsOwnerOrReadOnly)
from rest_framework.parsers import (MultiPartParser,FormParser)
from django.shortcuts import get_object_or_404
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.parsers import (MultiPartParser,FormParser,JSONParser) # Added JSONParser for handling JSON data in comment creation
from django.contrib.auth.models import User # Added import for User model to handle user-related operations in views
from django.db.models import Q # Added import for Q object to handle complex queries in tweet search API


# create a view to handle listing and creating tweets (tweet list/create API)
class TweetListCreateAPIView(generics.ListCreateAPIView):
    queryset = Tweet.objects.all().order_by('-created_at')
    filterset_fields = ['user']
    parser_classes = [MultiPartParser,FormParser,JSONParser]
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# create a view to handle retrieving, updating, and deleting a specific tweet (tweet detail API)
class TweetDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrReadOnly]

# create a view to handle searching for tweets by text (tweet search API)
class TweetSearchAPIView(APIView):

    def get(self, request):
        query = request.GET.get('q', '')
        tweets = Tweet.objects.filter(text__icontains=query)
        serializer = TweetSerializer(tweets,many=True)
        return Response(serializer.data)
    
# create a view to handle liking a tweet (like tweet API)
class LikeTweetAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,pk):
        tweet = get_object_or_404(Tweet,pk=pk)
        tweet.likes.add(request.user)
        return Response({"message": "Tweet liked","likes_count": tweet.likes.count()})
    
    
# create a view to handle unliking a tweet (unlike tweet API)
class UnlikeTweetAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,pk):
        tweet = get_object_or_404(Tweet,pk=pk)
        tweet.likes.remove(request.user)
        return Response({"message": "Tweet unliked","likes_count": tweet.likes.count()})


# create a view to handle creating a comment on a specific tweet (create comment API)
class CreateCommentAPIView(APIView):

    permission_classes = [IsAuthenticated] # Only authenticated users can create comments
    def post(self,request,pk):
        tweet = get_object_or_404(Tweet,pk=pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user,tweet=tweet)
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)
 
 
 # create a view to handle retrieving comments for a specific tweet (tweet comments API)   
class TweetCommentsAPIView(APIView):

    def get(self,request,pk):
        tweet = get_object_or_404(Tweet,pk=pk)
        comments = tweet.comments.all()
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data)
    
 # create a view to handle deleting a specific comment (delete comment API)   
class DeleteCommentAPIView(APIView):

    permission_classes = [IsAuthenticated] # Only authenticated users can delete comments
    def delete(self,request,pk):
        comment = get_object_or_404(Comment,pk=pk,user=request.user)
        comment.delete()
        return Response({"message": "Comment deleted"})
    
# Set parser_classes to include JSONParser for handling JSON data in comment creation    
parser_classes = [MultiPartParser,FormParser,JSONParser]


# create a view to handle retrieving the feed of tweets for the authenticated user (feed API)
class FeedAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        followed_users=User.objects.filter(profile__followers=request.user)
        tweets=Tweet.objects.filter(Q(user=request.user)|Q(user__in=followed_users)).order_by('-created_at')
        serializer=TweetSerializer(tweets,many=True)
        return Response(serializer.data)
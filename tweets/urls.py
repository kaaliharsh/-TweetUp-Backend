from django.urls import path
from .views import (TweetSearchAPIView)
from .views import (TweetListCreateAPIView,TweetDetailAPIView)
from .views import (LikeTweetAPIView,UnlikeTweetAPIView)
from .views import (CreateCommentAPIView,TweetCommentsAPIView,DeleteCommentAPIView,FeedAPIView)


urlpatterns = [
    path('',TweetListCreateAPIView.as_view(),name='tweet-list'),
    path('<int:pk>/',TweetDetailAPIView.as_view(),name='tweet-detail'),
    path('search/',TweetSearchAPIView.as_view(),name='tweet-search'),
    path('<int:pk>/like/',LikeTweetAPIView.as_view(),name='like-tweet'),
    path('<int:pk>/unlike/',UnlikeTweetAPIView.as_view(),name='unlike-tweet'),
    path('<int:pk>/comments/',CreateCommentAPIView.as_view()),
    path('<int:pk>/comments/list/',TweetCommentsAPIView.as_view()),
    path('comments/<int:pk>/delete/',DeleteCommentAPIView.as_view()),
    path('feed/',FeedAPIView.as_view(),name='feed'),
]
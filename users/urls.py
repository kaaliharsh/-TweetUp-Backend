from django.urls import path
from .views import RegisterAPIView
from django.urls import path

from .views import (
    RegisterAPIView,
    ProfileAPIView,
    FollowAPIView,
    UnfollowAPIView,
    UserSearchAPIView,
    UpdateProfileAPIView,
    PublicProfileAPIView
)
urlpatterns=[
    path('register/',RegisterAPIView.as_view(),name='register'),
    path('profile/',ProfileAPIView.as_view()),
    path('follow/<str:username>/',FollowAPIView.as_view()),
    path('unfollow/<str:username>/',UnfollowAPIView.as_view()),
    path('search/',UserSearchAPIView.as_view()),
    path('profile/update/',UpdateProfileAPIView.as_view()),
    path('<str:username>/',PublicProfileAPIView.as_view()),
]



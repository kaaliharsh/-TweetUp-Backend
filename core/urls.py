from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import(TokenObtainPairView,TokenRefreshView,)
from .views import(feed_page,login_page,register_page,profile_page,create_tweet_page,edit_profile_page,public_profile_page,search_users_page)
from drf_spectacular.views import (SpectacularAPIView,SpectacularSwaggerView)


urlpatterns=[
    path('admin/',admin.site.urls),# add a path for the admin site
    path('api/users/',include('users.urls')),# include the urls for the users app
    path('api/tweets/',include('tweets.urls')),# include the urls for the tweets app
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),# add a path for JWT authentication
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),# add paths for JWT authentication
    path('', feed_page, name='feed'),# add paths for the home page and other pages
    path('api/schema/',SpectacularAPIView.as_view(),name='schema'),# add a path for the API schema
    path('api/docs/',SpectacularSwaggerView.as_view(url_name='schema'),name='swagger-ui'), # add a path for the swagger UI to view the API documentation
    path('login-page/', login_page, name='login-page'), # add paths for the home page and other pages
    path('register-page/', register_page, name='register-page'),# add paths for the home page and other pages
    path('profile-page/', profile_page, name='profile-page'),# add paths for the home page and other pages
    path('create-tweet-page/', create_tweet_page, name='create-tweet-page'),# add paths for the home page and other pages
    path('edit-profile-page/', edit_profile_page, name='edit-profile-page'),# add paths for the home page and other pages
    path('user/<str:username>/',public_profile_page,name='public-profile-page'),# add paths for the home page and other pages
    path('search-users-page/',search_users_page,name='search-users-page')
]

urlpatterns =urlpatterns+static(# add a path to serve media files during development
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
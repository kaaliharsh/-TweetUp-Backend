from rest_framework import serializers
from .models import Tweet
from .models import Comment

# create a serializer for the Tweet model to handle serialization and deserialization of tweet data
class TweetSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ['id','username','text','photo','likes_count','created_at','updated_at']
    def get_likes_count(self,obj):
        return obj.likes.count()
    photo = serializers.ImageField(required=False)
    

# create a serializer for the Comment model to handle serialization and deserialization of comment data
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Comment
        fields = ['id','username','text','created_at']

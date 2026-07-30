from django.db import models
from django.contrib.auth.models import User



class Profile(models.Model):     # Profile model to extend the built-in User model with additional fields and relationships
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='profile')
    followers = models.ManyToManyField(User,related_name='following',blank=True)
    bio = models.TextField(blank=True,null=True)
    profile_picture = models.ImageField(upload_to='profiles/',blank=True,null=True)

    def __str__(self):
        return self.user.username

    def followers_count(self):
        return self.followers.count()

    def following_count(self):
        return self.user.following.count()
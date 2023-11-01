from django.db import models
from django.conf import settings


from django.contrib.auth.models import AbstractUser
from .manager import UserManager

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    # new added 
    name = models.CharField(max_length=500, null=True, blank=True, default="David Mark")
    short_intro = models.CharField(max_length=500, null=True, blank=True, default="Short Intro...")
    headshot = models.ImageField(upload_to='headshots/', null=True, blank=True, default='headshots/default_pp.jpg')
    collection_title = models.ImageField(upload_to='collection_title/', default="collection_title/upload_collection_title.png")
    bio = models.TextField(null=True, blank=True, default="BIO...")
    collection_statement = models.TextField(null=True, blank=True, default="Collection Statement...")
    linkedin_url = models.CharField(max_length=500, null=True, blank=True, default="www.linkedin.com/")
    instagram_url = models.CharField(max_length=500, null=True, blank=True, default="www.instagram.com/")


    student_profile_status = models.BooleanField(verbose_name="Student Profile Active? ", default=False)
    order = models.IntegerField(blank=True, null=True, unique=True)

    username = None

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    @property
    def url_to_user_page(self):
        return f"/student-dashboard/{self.id}"
    

    def __str__(self):
        return self.email


# class StudentProfile(models.Model):
#     user_profile = models.ForeignKey('User', on_delete=models.CASCADE)
#     name = models.CharField(max_length=500, null=False, blank=False)
#     short_intro = models.CharField(max_length=500, null=False, blank=False)
#     headshot = models.ImageField(upload_to='headshots/', null=False, blank=False)
#     bio = models.TextField(null=False, blank=False)
#     collection_statement = models.TextField(null=False, blank=False)
#     linkedin_url = models.CharField(max_length=500, null=False, blank=False)
#     instagram_url = models.CharField(max_length=500, null=False, blank=False)
#     email = models.CharField(max_length=500, null=False, blank=False)
#     portfolio_index = models.IntegerField(null=False, blank=False)


class StudentPortfolio(models.Model):
    student = models.ForeignKey('User', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='portfolio_images', null=False, blank=False)
    main_index = models.IntegerField(null=True, blank=True)
    minor_index = models.IntegerField(null=True, blank=True)

class StudentVideo(models.Model):
    student = models.ForeignKey('User', on_delete=models.CASCADE)
    video = models.FileField(upload_to='portfolio_video', null=False, blank=False)
    index = models.IntegerField(null=False, blank=False)

class StudentPdf(models.Model):
    student = models.ForeignKey('User', on_delete=models.CASCADE)
    pdf = models.TextField(null=True, blank=True, default="")
    index = models.IntegerField(null=False, blank=False)

class StudentMainImage(models.Model):
    student = models.ForeignKey('User', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='portfolio_images', null=False, blank=False)
    index = models.IntegerField(null=False, blank=False)
from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login as dj_login
from django.contrib.auth import logout as dj_logout
from .models import *

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.db.models import Count

User = get_user_model()

# Create your views here.
def homepage(request):
    all_portfolio = StudentPortfolio.objects.filter(student__student_profile_status=True).annotate(null_student__order=Count('student__order')).order_by('-null_student__order', 'student__order')

    # print(all_portfolio.first().student)
    context = {
        "all_portfolio":all_portfolio
    }

    return render(request, 'base/homepage.html', context)


def student_page(request, student_id):
    user = User.objects.get(id = student_id)

    all_portfolio_uploaded = user.studentportfolio_set.all()
    all_video_uploaded = user.studentvideo_set.all()
    all_mainimages_uploaded = user.studentmainimage_set.all()
    all_pdf_uploaded = user.studentpdf_set.all()

    context = {'user': user,
               'all_portfolio_uploaded': all_portfolio_uploaded,
               'all_video_uploaded': all_video_uploaded,
               'all_mainimages_uploaded':all_mainimages_uploaded,
               'all_pdf_uploaded':all_pdf_uploaded,
               }
    return render(request, 'base/student_page.html', context)



def student_dashboard(request, student_id):
    if not request.user.is_authenticated:
        return redirect('login')
    
# student_name
# short_intro
# long_student_bio
# collection_statement
# linkedin_url
# instagram_url
# email
    registered__user = request.user
    user__obj = User.objects.get(id = registered__user.id)
    if request.method == "POST":
        

        student_name = request.POST['student_name']
        short_intro = request.POST['short_intro']
        long_student_bio = request.POST['long_student_bio']
        collection_statement = request.POST['collection_statement']
        linkedin_url = request.POST['linkedin_url']
        instagram_url = request.POST['instagram_url']
        email = request.POST['email']

        # changing now

        user__obj.name = student_name
        user__obj.short_intro = short_intro
        user__obj.bio = long_student_bio
        user__obj.collection_statement = collection_statement
        user__obj.linkedin_url = linkedin_url
        user__obj.instagram_url = instagram_url
        user__obj.email = email

        user__obj.save()

        recieved__files__only = [i for i in list(request.FILES)]   
        recieved__text__only = [i for i in list(request.POST) if ("id__in__database" in i)|("pdf__uploader__" in i)]  
        delete__req = request.POST['deleted__items']
        if delete__req:
            index__list = delete__req.split(" ")
            all_portfolio_uploaded = registered__user.studentportfolio_set.filter(main_index__in=index__list)
            all_portfolio_uploaded.delete()
            all_video_uploaded = registered__user.studentvideo_set.filter(index__in=index__list)
            all_video_uploaded.delete()
            all_mainimages_uploaded = registered__user.studentmainimage_set.filter(index__in=index__list)
            all_mainimages_uploaded.delete()
            all_pdf_uploaded = registered__user.studentpdf_set.filter(index__in=index__list)    
            all_pdf_uploaded.delete()

        for i in recieved__text__only:
            text = request.POST[i]
            if i.startswith('images__id__in__database__'):
                database_id = i.split("images__id__in__database__")[1]
                print(database_id)
                obj = StudentPortfolio.objects.get(id = int(database_id))
                obj.main_index = text
                obj.save()

            if i.startswith('image__id__in__database__'):
                database_id = i.split("image__id__in__database__")[1]
                print(database_id)
                obj = StudentMainImage.objects.get(id = int(database_id))
                obj.index = text
                obj.save()

            if i.startswith('video__id__in__database__'):
                database_id = i.split("video__id__in__database__")[1]
                print(database_id)
                obj = StudentVideo.objects.get(id = int(database_id))
                obj.index = text
                obj.save()

            if i.startswith('pdf__id__in__database__'):
                database_id = i.split("pdf__id__in__database__")[1]
                print(database_id)
                obj = StudentPdf.objects.get(id = int(database_id))
                obj.index = text
                obj.save()

            if i.startswith('pdf__uploader__'):
                index = int(str(i).split('pdf__uploader__')[1])
                if (StudentPdf.objects.filter(student=request.user)):
                    if (StudentPdf.objects.filter(index= index)):
                        change_able_text = registered__user.studentpdf_set.get(index=index)
                        change_able_text.pdf = text
                        change_able_text.save()
                    else:
                        StudentPdf.objects.create(student=request.user, pdf=text, index=index)
                else:
                    StudentPdf.objects.create(student=request.user, pdf=text, index=index)


        print(recieved__files__only)
        for i in recieved__files__only:
            file = request.FILES[i]

            if i.startswith('image__'):
                main_index = int(str(i).split('image__upload__')[1].split("_")[0])
                print(main_index)
                minor_index = int(str(i).split('image__upload__')[1].split("_")[1])
                if (StudentPortfolio.objects.filter(student=request.user)):
                    if (StudentPortfolio.objects.filter(Q(main_index=main_index),Q(minor_index=minor_index))):
                        change_able_picture = registered__user.studentportfolio_set.get(Q(main_index=main_index),Q(minor_index=minor_index))
                        change_able_picture.image = file
                        change_able_picture.save()
                    else:
                        StudentPortfolio.objects.create(student=request.user, image=file, main_index=main_index,minor_index=minor_index)
                else:
                    StudentPortfolio.objects.create(student=request.user, image=file, main_index=main_index,minor_index=minor_index)



            if 'video__' in i:
                index = int(str(i).split('video__uploader__')[1])
                print(index)
                if (StudentVideo.objects.filter(student=request.user)):
                    if (StudentVideo.objects.filter(index= index)):
                        change_able_picture = registered__user.studentvideo_set.get(index=index)
                        change_able_picture.video = file
                        change_able_picture.save()
                    else:
                        StudentVideo.objects.create(student=request.user, video=file, index=index)
                else:
                    StudentVideo.objects.create(student=request.user, video=file, index=index)


            if 'single__image__' in i:
                index=int(str(i).split('single__image__upload__')[1])
                print(index)
                if (StudentMainImage.objects.filter(student=request.user)):
                    if (StudentMainImage.objects.filter(index= index)):
                        change_able_picture = registered__user.studentmainimage_set.get(index=index)
                        change_able_picture.image = file
                        change_able_picture.save()
                    else:
                        StudentMainImage.objects.create(student=request.user, image=file, index=index)
                else:
                    StudentMainImage.objects.create(student=request.user, image=file, index=index)
            print(i)
            if i == "collection__title":
                registered__user.collection_title = file
                registered__user.save()

            if i == "profile_picture":
                registered__user.headshot = file
                registered__user.save()
        
                
    registered__user = request.user
    all_portfolio_uploaded = registered__user.studentportfolio_set.all()
    all_video_uploaded = registered__user.studentvideo_set.all()
    all_mainimages_uploaded = registered__user.studentmainimage_set.all()
    all_pdf_uploaded = registered__user.studentpdf_set.all()
    context = {

        "student_id":student_id,
        "all_portfolio_uploaded": all_portfolio_uploaded,
        "all_video_uploaded": all_video_uploaded,
        "all_mainimages_uploaded": all_mainimages_uploaded,
        "all_pdf_uploaded": all_pdf_uploaded, 
        "user__obj" :user__obj,
}
    return render(request, 'base/student_dashboard.html', context)

# Login/Register Functions only 
def login(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                dj_login(request, user)
                return redirect("homepage")
            else:
                messages.error(request, 'No! Account Founded')
    else:
        return redirect('homepage')
    return render(request, 'base/login.html')

def register(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')
            again_password = request.POST.get('again__password')

            if (password == again_password):
                try:
                    user = User.objects.create_user(email=email, password=password)
                    user.save()

                    return redirect('login')
                except:
                    messages.error(request, 'Email Already Exist! Choose another Email')
            else:
                messages.error(request, 'Password not Match')
    else:
        return redirect('homepage')
    return render(request, 'base/register.html')

def logout(request):
    if request.user.is_authenticated:
        dj_logout(request)
    else:
        return redirect('login')
    return redirect('homepage')

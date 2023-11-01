from django.contrib import admin
from .models import *
# Register your models here.
# admin.site.register(StudentProfile)

class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'student_profile_status', 'order']
    readonly_fields = ('id','url_to_user_page')

admin.site.register(StudentPortfolio)
admin.site.register(StudentVideo)
admin.site.register(StudentPdf)
admin.site.register(StudentMainImage)
admin.site.register(User, UserAdmin)
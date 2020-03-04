
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('app/signup/student/', student.StudentSignUpView.as_view(), name='student_signup'),
    # path('app/signup/teacher/', teacher.TeacherSignUpView.as_view(), name='teacher_signup'),
    path('api/', include('app.api.urls')),   
]

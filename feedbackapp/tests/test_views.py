from django.test import TestCase, Client
from django.urls import reverse, resolve
from feedbackapp.models import TeacherProfile, User
from feedbackapp.api.serializer import (
    ModuleSerializer, 
    TestSerializer, 
    ProfileSerializer, 
    GradeSerializer,
    UserFeedbackSerializer,
    UserTestSerializer,
    FeedbackGeneratorSerializer,
    SavedTestFeedbackSerializer,
    TeacherUserSerializer,
    AnswersBankSerializer,
    SavedImprovementFeedbackSerializer
)
import json
client = Client()
class CreateTeacherTest(TestCase):
    '''Test view for create teacher profile '''
    def setUp(self):
        user = User(username="Barry")   
        user.save()
        self.valid_teacher = {
            'user': 1,
            'department': "EECS",
            'user_type': 'Teacher',
            'avatar': 'https://img.icons8.com/color/96/000000/user.png'
        }
        self.invalid_teacher = {
            'user': '',
            'department': "EECS",
            'user_type': 'Teacher',
            'avatar': 'https://img.icons8.com/color/96/000000/user.png'
        }
            ##  creating!!  ##
    def test_create_valid_teacher(self):
        response = client.post(
            reverse('createprofile'),
            data=json.dumps(self.valid_teacher),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
    def test_create_invalid_teacher(self):
        response = client.post(
            reverse('createprofile'),
            data=json.dumps(self.invalid_teacher),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
class GetAllTeachersTestCase(TestCase):
    '''Test view for getting all teacher profiles '''
    def setUp(self):
        user = User(username="Barry")   
        user.save()
        TeacherProfile.objects.create(
            user = user,
            department = 'EECS',
            user_type = 'Teacher',
            avatar = 'https://img.icons8.com/color/96/000000/user.png',
        )
    ##  get data!!  ##
    def test_get_all_teachers(self):
        #get API
        response = client.get(reverse('profile'))
        #get data from DB
        teacher = TeacherProfile.objects.all()
        serializer = ProfileSerializer(teacher, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, 200)
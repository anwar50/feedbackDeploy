from rest_framework import serializers
from app.models import Module
from app.models import Test
from app.models import TeacherProfile
from app.models import Grade
from app.models import FeedbackBankTwo
from app.models import Feedback
from app.models import UserTest
from app.models import SavedFeedback
from app.models import AnswersBank
from django.contrib.auth.models import User

class TeacherUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ('id','user','title', 'year_of_module','code','description', 'num_students')
        
class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'
class AnswersBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswersBank
        fields = '__all__'
class UserTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTest
        fields = ('id', 'test', 'username')
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        # extra_kwargs = {'id': {'read_only': False, 'required': False}}
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        # extra_kwargs = {'id': {'read_only': False, 'required': False}}
        fields = '__all__'
class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        # extra_kwargs = {'id': {'read_only': False, 'required': False}}
        fields = ('feedback', 'test')
class FeedbackGeneratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackBankTwo
        # extra_kwargs = {'id': {'read_only': False, 'required': False}}
        fields = ('feedback_bank', 'category', 'percentage')
class SavedTestFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedFeedback
        # extra_kwargs = {'id': {'read_only': False, 'required': False}}
        fields = '__all__'
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from feedbackapp.api.views import (
    ModuleListView, 
    ModuleDetailView, 
    ModuleCreateView,
    ModuleUpdateView,
    ModuleDeleteView,
    TestDetailView, 
    TestListView,
    TestCreateView,
    TestUpdateView,
    TestDeleteView,
    GradeCreateView,
    GradeDeleteView,
    GradeDetailView,
    GradeListView,
    GradeUpdateView,
    TeacherProfileListView,
    TeacherProfileCreateView,
    TeacherProfileUpdateView,
    FeedbackCreateView,
    FeedbackDeleteView,
    FeedbackDetailView,
    FeedbackListView,
    FeedbackUpdateView,
    SavedTestListView,
    SavedTestCreateView,
    SavedFeedbackListView,
    SavedFeedbackCreateView,
    SavedFeedbackDeleteView,
    SavedFeedbackDetailView,
    SavedFeedbackUpdateView,
    SavedImprovementFeedbackCreateView,
    SavedImprovementFeedbackDeleteView,
    SavedImprovementFeedbackDetailView,
    SavedImprovementFeedbackListView,
    SavedImprovementFeedbackUpdateView,
    AnswersBankCreateView,
    AnswersBankDeleteView,
    AnswersBankDetailView,
    AnswersBankListView,
    AnswersBankUpdateView,
    CurrentUserViewSet,
    ProcessData
)
import pytest

class TestUrls(SimpleTestCase):
    # def test_users_url_is_resolved(self):
    #     url = reverse('users')
    #     self.assertEquals(resolve(url).func.view_class, CurrentUserViewSet)
    def test_profile_url_is_resolved(self):
        url_one = reverse('profile')
        url_two = reverse('createprofile')
        url_three = reverse('updateprofile', kwargs={'pk':1})
        self.assertEquals(resolve(url_one).func.view_class, TeacherProfileListView)
        self.assertEquals(resolve(url_two).func.view_class, TeacherProfileCreateView)
        self.assertEquals(resolve(url_three).func.view_class, TeacherProfileUpdateView)
    # def test_modules_url_is_resolved(self):
    #     url_one = reverse('modules')
    #     url_two = reverse('createmodule')
    #     url_three = reverse('detailmodule', kwargs={'pk':1})
    #     url_four = reverse('updatemodule', kwargs={'pk':3})
    #     url_five = reverse('deletemodule', kwargs={'pk':2})
    #     self.assertEquals(resolve(url_one).func.view_class, ModuleListView)
    #     self.assertEquals(resolve(url_two).func.view_class, ModuleCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, ModuleDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, ModuleUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, ModuleDeleteView)
    # def test_tests_url_is_resolved(self):
    #     url_one = reverse('tests')
    #     url_two = reverse('createtest')
    #     url_three = reverse('detailtest', kwargs={'pk':2})
    #     url_four = reverse('updatetest', kwargs={'pk':22})
    #     url_five = reverse('deletetest', kwargs={'pk':12})
    #     self.assertEquals(resolve(url_one).func.view_class, TestListView)
    #     self.assertEquals(resolve(url_two).func.view_class, TestCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, TestDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, TestUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, TestDeleteView)
    # def test_answers_url_is_resolved(self):
    #     url_one = reverse('answers')
    #     url_two = reverse('createanswer')
    #     url_three = reverse('detailanswer',kwargs={'pk':2})
    #     url_four = reverse('updateanswer', kwargs={'pk':4})
    #     url_five = reverse('deleteanswer', kwargs={'pk':29})
    #     self.assertEquals(resolve(url_one).func.view_class, AnswersBankListView)
    #     self.assertEquals(resolve(url_two).func.view_class, AnswersBankCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, AnswersBankDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, AnswersBankUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, AnswersBankDeleteView)  
    # def test_grades_url_is_resolved(self):
    #     url_one = reverse('grades')
    #     url_two = reverse('creategrade')
    #     url_three = reverse('detailgrade', kwargs={'pk':9})
    #     url_four = reverse('updategrade', kwargs={'pk':3})
    #     url_five = reverse('deletegrade', kwargs={'pk':10})
    #     self.assertEquals(resolve(url_one).func.view_class, GradeListView)
    #     self.assertEquals(resolve(url_two).func.view_class, GradeCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, GradeDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, GradeUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, GradeDeleteView)
    # def test_feedback_url_is_resolved(self):
    #     url_one = reverse('feedback')
    #     url_two = reverse('createfeedback')
    #     url_three = reverse('detailfeedback', kwargs={'pk':91})
    #     url_four = reverse('updatefeedback', kwargs={'pk':31})
    #     url_five = reverse('deletefeedback', kwargs={'pk':1})
    #     self.assertEquals(resolve(url_one).func.view_class, FeedbackListView)
    #     self.assertEquals(resolve(url_two).func.view_class, FeedbackCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, FeedbackDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, FeedbackUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, FeedbackDeleteView)
    # def test_savedtest_url_is_resolved(self):
    #     url_one = reverse('savedtest')
    #     url_two = reverse('createsavedtest')
    #     self.assertEquals(resolve(url_one).func.view_class, SavedTestListView)
    #     self.assertEquals(resolve(url_two).func.view_class, SavedTestCreateView)
    
    # def test_savedfeedback_url_is_resolved(self):
    #     url_one = reverse('savedfeedback')
    #     url_two = reverse('createsavedfeedback')
    #     url_three = reverse('detailsavedfeedback', kwargs={'pk':1})
    #     url_four = reverse('updatesavedfeedback', kwargs={'pk':3})
    #     url_five = reverse('deletesavedfeedback', kwargs={'pk':5})
    #     self.assertEquals(resolve(url_one).func.view_class, SavedFeedbackListView)
    #     self.assertEquals(resolve(url_two).func.view_class, SavedFeedbackCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, SavedFeedbackDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, SavedFeedbackUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, SavedFeedbackDeleteView)
    # def test_savedimprovement_url_is_resolved(self):
    #     url_one = reverse('savedimprovementfeedback')
    #     url_two = reverse('createimprovement')
    #     url_three = reverse('detailimprovement', kwargs={'pk':13})
    #     url_four = reverse('updateimprovement', kwargs={'pk':4})
    #     url_five = reverse('deleteimprovement', kwargs={'pk':52})
    #     self.assertEquals(resolve(url_one).func.view_class, SavedImprovementFeedbackListView)
    #     self.assertEquals(resolve(url_two).func.view_class, SavedImprovementFeedbackCreateView)
    #     self.assertEquals(resolve(url_three).func.view_class, SavedImprovementFeedbackDetailView)
    #     self.assertEquals(resolve(url_four).func.view_class, SavedImprovementFeedbackUpdateView)
    #     self.assertEquals(resolve(url_five).func.view_class, SavedImprovementFeedbackDeleteView)
    # def test_process_data_url_is_resolved(self):
    #     url = reverse('processnltk', 
    #     kwargs={
    #     'test':3, 
    #     'grade':'A', 
    #     'mark':55, 
    #     'correct':50, 
    #     'incorrect':5, 
    #     'effectiveness':'Outstanding'})
    #     self.assertEquals(resolve(url).func.view_class, ProcessData)
    # def test_generateFeedback_url_is_resolved(self):
    #     url = reverse('generatefeedback')
    #     self.assertEquals(resolve(url).func.view_class, FeedbackListView)
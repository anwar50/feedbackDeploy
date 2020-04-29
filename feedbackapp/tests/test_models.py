from django.test import TestCase
from feedbackapp.models import Module
from feedbackapp.models import Test
from feedbackapp.models import TeacherProfile
from feedbackapp.models import Grade
from feedbackapp.models import FeedbackBankTwo
from feedbackapp.models import Feedback
from feedbackapp.models import UserTest
from feedbackapp.models import SavedFeedback
from feedbackapp.models import AnswersBank
from feedbackapp.models import ImprovementFeedback
from django.contrib.auth.models import User
from django.utils import timezone
# class ModuleTestCase(TestCase):
#     def test_module_model(self):
#         '''Test module for module model '''
#         user = User(username="Jonathan")
#         user.save()
#         module = Module(
#             user = user,
#             title= "Web Programming",
#             year_of_module = 3,
#             code = "ECS639U",
#             description = "backend and frontend",
#             num_students = 200
#         )
#         module.save()
#         record = Module.objects.get(id=1)
#         self.assertEqual(record.user.username, "Jonathan")
        #Test case for teacher profile
class TeacherTestCase(TestCase):
    '''Test module for teacher profile model '''
    def test_teacher_model(self):
        user = User(username="Barry")   
        user.save()
        profile = TeacherProfile(
            user = user,
            department = 'EECS',
            user_type = 'teacher',
            avatar = 'https://img.icons8.com/color/96/000000/user.png'
        )
        profile.save()
        record = TeacherProfile.objects.get(id=1)
        self.assertEqual(record.user.username, "Barry")
        #Test case for test model 
# class ExamTestCase(TestCase):
#     '''Test module for exam model '''
#     def test_exam_model(self):
#         user = User(username="Nigel")
#         user.save()
#         module = Module(
#             user = user,
#             title= "CCA",
#             year_of_module = 3,
#             code = "ECSU",
#             description = "backend and frontend",
#             num_students = 200
#         )
#         module.save()
#         test = Test(
#             name = "Time complexity",
#             test_count = 5,
#             num_subquestions = 4,
#             description = "mid term exam",
#             created_date = timezone.now(),
#             questiontype = "MCQ(Multiple choice questions)",
#             module = module
#         )
#         test.save()
#         record = Test.objects.get(id=1)
#         self.assertEqual(record.module.user.username, "Nigel")
# class UserTestCase(TestCase):
#     '''Test module for user test model '''
#     def test_usertest_model(self):
#         user = User(username="Tassos")
#         user.save()
#         module = Module(
#             user = user,
#             title= "Probability & Matrices",
#             year_of_module = 2,
#             code = "ECS419U",
#             description = "basics of probability and matrices",
#             num_students = 248
#         )
#         module.save()
#         test = Test(
#             name = "Matrices",
#             test_count = 4,
#             num_subquestions = 5,
#             description = "mid term exam",
#             created_date = timezone.now(),
#             questiontype = "short answer",
#             module = module
#         )
#         test.save()
#         user_test = UserTest(
#             test = test,
#             username = "Tassos"
#         )
#         user_test.save()
#         record = UserTest.objects.get(id=1)
#         self.assertEqual(record.test.module.user.username, "Tassos")
# class GradeTestCase(TestCase):
#     '''Test module for grade model '''
#     def test_grade_model(self):
#         user = User(username="Tony")
#         user.save()
#         module = Module(
#             user = user,
#             title= "Interaction Design",
#             year_of_module = 3,
#             code = "ECS62U",
#             description = "basics of interaction systems",
#             num_students = 240
#         )
#         module.save()
#         test = Test(
#             name = "distributed cognition",
#             test_count = 4,
#             num_subquestions = 5,
#             description = "end of year exam",
#             created_date = timezone.now(),
#             questiontype = "long answers",
#             module = module
#         )
#         test.save()
#         grade = Grade(grade = "B",grade_mark = 65,effectiveness = "Good",test = test)
#         grade.save()
#         record = Grade.objects.get(id=1)
#         self.assertEqual(record.test.module.user.username, "Tony")
# class FeedbackTestCase(TestCase):
#     '''Test module for feedback model '''
#     def test_feedback_model(self):
#         user = User(username="Alan")
#         user.save()
#         module = Module(
#             user = user,
#             title= "Database",
#             year_of_module = 2,
#             code = "ECS555U",
#             description = "basics of SQL",
#             num_students = 240
#         )
#         module.save()
#         test = Test(
#             name = "SQL",
#             test_count = 4,
#             num_subquestions = 5,
#             description = "mid term exam",
#             created_date = timezone.now(),
#             questiontype = "short answers",
#             module = module
#         )
#         test.save()
#         feedback = Feedback(
#             feedback = "Good Assumptions, all clear and relevant.",
#             test = test
#         )
#         feedback.save()
#         record = Feedback.objects.get(id=1)
#         self.assertEqual(record.test.module.user.username, "Alan")
# class SavedFeedbackTestCase(TestCase):
#     '''Test module for saved feedback model '''
#     def test_savedfeedback_model(self):
#         user = User(username="Christopher")
#         user.save()
#         module = Module(
#             user = user,
#             title= "Database",
#             year_of_module = 2,
#             code = "ECS555U",
#             description = "basics of SQL",
#             num_students = 240
#         )
#         module.save()
#         test = Test(
#             name = "SQL",
#             test_count = 4,
#             num_subquestions = 5,
#             description = "mid term exam",
#             created_date = timezone.now(),
#             questiontype = "short answers",
#             module = module
#         )
#         test.save()
#         grade = Grade(grade = "A", grade_mark = 87, effectiveness = "Outstanding", test = test)
#         grade.save()
#         saved_feedback = SavedFeedback(
#             test = test,
#             grade = grade,
#             user = user,
#             feedback = "test feedback example!",
#             percentage = 89,
#             created_by = "QMFeedback"
#         )
#         saved_feedback.save()
#         record = SavedFeedback.objects.get(id=1)
#         self.assertEqual(record.test.module.user.username, "Christopher")
# class ImprovementFeedbackTestCase(TestCase):
#     '''Test module for Improvement feedback model '''
#     def test_improvementfeedback_model(self):
#         user = User(username="Ben")
#         user.save()
#         module = Module(
#             user = user,
#             title= "fundamentals of web technology",
#             year_of_module = 4,
#             code = "ECS773U",
#             description = "basics of web technology",
#             num_students = 240
#         )
#         module.save()
#         test = Test(
#             name = "WEB TECH 1",
#             test_count = 4,
#             num_subquestions = 5,
#             description = "mid term exam",
#             created_date = timezone.now(),
#             questiontype = "short answers",
#             module = module
#         )
#         test.save()
#         improvement_feedback = ImprovementFeedback(
#             test = test,
#             area_of_improvement = "deployment",
#             user = user,
#             improvement_feedback = ""
#         )
#         improvement_feedback.save()
#         #assertions
#         record = ImprovementFeedback.objects.get(id=1)
#         self.assertEqual(record.test.module.user.username, "Ben")
# class AnswersTestCase(TestCase):
#     '''Test module for answer model '''
#     def test_answer_model(self):
#         user = User(username="Richard")
#         user.save()
#         module = Module(
#             user = user,
#             title= "TestModule",
#             year_of_module = 1,
#             code = "ECS837U",
#             description = "this is a test module",
#             num_students = 200
#         )
#         module.save()
#         test = Test(
#             name = "test one",
#             test_count = 4,
#             num_subquestions = 5,
#             description = "mid term exam",
#             created_date = "15/05/2020",
#             questiontype = "short answers",
#             module = module
#         )
#         test.save()
#         answers = AnswersBank(
#             test = test,
#             total_mark_for_question = 100,
#             topics = "test1,test2,test3",
#             total_sub_marks = 50,
#             topic_mark_breakdown = "10,10,30",
#             weakest_topic = "test1"
#         )
#         answers.save()
#         #assertions
#         record = AnswersBank.objects.get(id=1)
#         self.assertEqual(record.test.module.user.username, "Richard")

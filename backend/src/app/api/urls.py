
# from modules.api.views import (
#     ModuleViewSet,
#     QuestionViewSet,
#     # AnswerViewSet
# )
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', ModuleViewSet, base_name='modules')
# urlpatterns = router.urls

# questionrouter = DefaultRouter()
# questionrouter.register(r'', QuestionViewSet, base_name='questions')
# urlpatterns = questionrouter.urls


from django.urls import path
from .views import (
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
    AnswersBankCreateView,
    AnswersBankDeleteView,
    AnswersBankDetailView,
    AnswersBankListView,
    AnswersBankUpdateView,
    CurrentUserViewSet,
    NLTKProcess
)

urlpatterns = [
        #users profile
    path('users', CurrentUserViewSet.as_view()),
    ##profile set up
    path('list/profile/', TeacherProfileListView.as_view()),
    path('profile', TeacherProfileCreateView.as_view()),
    path('profile/<pk>/update/', TeacherProfileUpdateView.as_view()),
        ##module url
    path('modules', ModuleListView.as_view()),
    path('create/module/', ModuleCreateView.as_view()),
    path('module/<pk>', ModuleDetailView.as_view()),
    path('module/<pk>/update/', ModuleUpdateView.as_view()),
    path('module/<pk>/delete/', ModuleDeleteView.as_view()),
        ##test url
    path('test', TestListView.as_view()),
    path('create/test/', TestCreateView.as_view()),
    path('test/<pk>', TestDetailView.as_view()),
    path('test/<pk>/update/', TestUpdateView.as_view()),
    path('test/<pk>/delete/', TestDeleteView.as_view()),
        ##answers url
    path('answers', AnswersBankListView.as_view()),
    path('create/answer/', AnswersBankCreateView.as_view()),
    path('answer/<pk>', AnswersBankDetailView.as_view()),
    path('answer/<pk>/update/', AnswersBankUpdateView.as_view()),
    path('answer/<pk>/delete/', AnswersBankDeleteView.as_view()),
        ##grade url
    path('grades', GradeListView.as_view()),
    path('create/grade/', GradeCreateView.as_view()),
    path('grade/<pk>', GradeDetailView.as_view()),
    path('grade/<pk>/update/', GradeUpdateView.as_view()),
    path('grade/<pk>/delete/', GradeDeleteView.as_view()),
        ##feedback url
    path('feedback', FeedbackListView.as_view()),
    path('create/feedback/', FeedbackCreateView.as_view()),
    path('feedback/<pk>', FeedbackDetailView.as_view()),
    path('feedback/<pk>/update/', FeedbackUpdateView.as_view()),
    path('feedback/<pk>/delete/', FeedbackDeleteView.as_view()),
        ##save test information
    path('savedtests', SavedTestListView.as_view()),
    path('save/test/', SavedTestCreateView.as_view()),
        ##save feedback information
    path('savedfeedbacks', SavedFeedbackListView.as_view()),
    path('save/feedback/', SavedFeedbackCreateView.as_view()),
    path('savedfeedback/<pk>', SavedFeedbackDetailView.as_view()),
    path('savedfeedback/<pk>/update/', SavedFeedbackUpdateView.as_view()),
    path('savedfeedback/<pk>/delete/', SavedFeedbackDeleteView.as_view()),
    path('processnltk/<test>/<grade>/<mark>/<correct>/<incorrect>/<effectiveness>', NLTKProcess.as_view()),
        ##generated Feedback category
    path('generatedFeedback', FeedbackListView.as_view()),
    
]

from feedbackapp.models import Module, Test, TeacherProfile, Grade, UserTest, Feedback, FeedbackBankTwo, SavedFeedback, AnswersBank,ImprovementFeedback
from django.contrib.auth.models import User
from django.views import View
from rest_framework import viewsets
from .serializer import (
    ModuleSerializer, 
    TestSerializer, 
    ProfileSerializer, 
    GradeSerializer,
    UserFeedbackSerializer,
    UserTestSerializer,
    SavedTestFeedbackSerializer,
    TeacherUserSerializer,
    AnswersBankSerializer,
    SavedImprovementFeedbackSerializer,
    FeedbackGeneratorSerializer
)
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, redirect
    #importing libraries for sentiment analysis.
import nltk
nltk.download('all')
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews, stopwords
from nltk.stem import PorterStemmer
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
import nltk.classify.util
import warnings 
import glob
import pandas as pd
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
#from wordcloud import WordCloud
import matplotlib.pyplot as plt
import gzip
import json, string
warnings.filterwarnings("ignore")
def Features(list_words):
        return dict([(word, True) for word in list_words])
def SentimentalScore(line):
    analyzer = SentimentIntensityAnalyzer()
    pol_score = analyzer.polarity_scores(line)
    print("analysing sentence...")
                #shows the vader performance on a given feedback review.
    #print("{:-<40} {}".format(line, str(pol_score)))
    print("polarity score: " + str(pol_score))
    print("making prediction...")
    sentiment_score = pol_score['compound']
                #categorizes the feedback based on the sentiment score returned by the compound score.
    if sentiment_score >= 0.5:
        return 'positive'
    elif (sentiment_score > -0.5) and (sentiment_score < 0.5):
        return 'neutral'
    elif sentiment_score <= -0.5:
        return 'negative'
test_sentence = "It is very clear that Muhammad needs to cover a lot of content as he did not even attempt the questions"
sentiment_category = SentimentalScore(test_sentence)
print("output: " + sentiment_category)
from rest_framework.generics import (
    ListAPIView, 
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
    #user views
class CurrentUserViewSet(ListAPIView):
    queryset = User.objects.all()
    serializer_class = TeacherUserSerializer
    ##module views
class ModuleListView(ListAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleDetailView(RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleCreateView(CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleUpdateView(UpdateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleDeleteView(DestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    ##Test views
class TestListView(ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestDetailView(RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestCreateView(CreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestUpdateView(UpdateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
class TestDeleteView(DestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    ##answersBank
class AnswersBankListView(ListAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankDetailView(RetrieveAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankCreateView(CreateAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankUpdateView(UpdateAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
class AnswersBankDeleteView(DestroyAPIView):
    queryset = AnswersBank.objects.all()
    serializer_class = AnswersBankSerializer
#     ##grade views
class GradeListView(ListAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeDetailView(RetrieveAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeCreateView(CreateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeUpdateView(UpdateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
class GradeDeleteView(DestroyAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    #saved testss from user
class SavedTestListView(ListAPIView):
    queryset = UserTest.objects.all()
    serializer_class = UserTestSerializer
class SavedTestCreateView(CreateAPIView):
    queryset = UserTest.objects.all()
    serializer_class = UserTestSerializer
#     #     ##feedback views
class FeedbackListView(ListAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackDetailView(RetrieveAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackCreateView(CreateAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackUpdateView(UpdateAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
class FeedbackDeleteView(DestroyAPIView):
    queryset = FeedbackBankTwo.objects.all()
    serializer_class = FeedbackGeneratorSerializer
    #save the test feedback
class SavedFeedbackListView(ListAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackCreateView(CreateAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackDetailView(RetrieveAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackUpdateView(UpdateAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
class SavedFeedbackDeleteView(DestroyAPIView):
    queryset = SavedFeedback.objects.all()
    serializer_class = SavedTestFeedbackSerializer
 #save the improvement feedback
class SavedImprovementFeedbackListView(ListAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackCreateView(CreateAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackDetailView(RetrieveAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackUpdateView(UpdateAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
class SavedImprovementFeedbackDeleteView(DestroyAPIView):
    queryset = ImprovementFeedback.objects.all()
    serializer_class = SavedImprovementFeedbackSerializer
 #signup views..
class TeacherProfileListView(ListAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = ProfileSerializer
class TeacherProfileCreateView(CreateAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = ProfileSerializer
class TeacherProfileUpdateView(UpdateAPIView):
    queryset = TeacherProfile.objects.all()
    serializer_class = ProfileSerializer
    #Trains the model when the test results are given from the teacher.
class ProcessData(View):
        
    def get(self, request, test, grade, mark, correct, incorrect, effectiveness):
        
        totalMarks = int(incorrect) + int(correct) #total marks for the test
        upper_marks = int(0.75*totalMarks) #75% of total
        lower_marks = int(0.25*totalMarks) #25% of total        
        middle_mark = int(totalMarks/2) #half of total
            
            #arrays used to store the feedbacks generated based on calculations
        Alltop_90 = []
        Alltop_80 = []
        Alltop_70 = []
        Alltop_60 = []
        Alltop_50 = []
        Alltop_40 = []
        Alltop_Fail = []
            #top improvment feedbacks for all grades which will be later stored in a new object
        top_improv = []
        #importing the file from local directory
        file = glob.glob('C:\\Users\\anwardont delete my\\Documents\\Datasets\\Review.json')
            #process the data from the json file and store in array for the model
        Reviews = []
            #process the reviews from the json file "Review"
        with open(file[0]) as data:
            read_data = data.read()
            for review in read_data.split('\n'):
                Reviews.append(review)
        reviewFrame = []
            #use the first 2 million reviews in the reviews dataset and processes the data from json into a list of tuples
        for review in Reviews[:2000]:
            try:
                jsondata = json.loads(review)
                reviewFrame.append((jsondata['reviewerID'], jsondata['asin'], 
                    jsondata['reviewerName'], 
                    jsondata['helpful'][0], 
                    jsondata['helpful'][1], 
                    jsondata['reviewText'], 
                    jsondata['overall'], 
                    jsondata['summary'], 
                    jsondata['unixReviewTime'],
                     jsondata['reviewTime']))
            except:
                pass

        #making a dataframe using the list of tuples created earlier
        new_dataset = pd.DataFrame(reviewFrame, 
            columns=['Reviewer_ID',
            'Asin',
            'Reviewer_Name',
            'helpful_UpVote',
            'Total_Votes',
            'Review_Text','Rating','Summary',
            'Unix_Review_Time',
            'Review_Time'])
        #making a dataframe using the list of tuples created earlier
        dataset_two = pd.DataFrame(reviewFrame, columns=['Reviewer_ID','Asin','Reviewer_Name','helpful_UpVote','Total_Votes','Review_Text','Rating','Summary','Unix_Review_Time','Review_Time'])

        #########################CALCULATION OF SENTIMENT THROUGH NAIVE BAYES ANALYZER###############
        def Sentimental_Naive(line):
            blob = TextBlob(line, analyzer=NaiveBayesAnalyzer())
            sentiment_score = blob.sentiment.classification
            return sentiment_score
        def Sentimental_NaiveScore(line):
            blob = TextBlob(line, analyzer=NaiveBayesAnalyzer())
            sentiment_score = blob.sentiment.classification
            if sentiment_score >= 0.5:
                return 'positive'
            elif (sentiment_score > -0.5) and (sentiment_score < 0.5):
                return 'neutral'
            elif sentiment_score <= -0.5:
                return 'negative'
                ######################### CALCULATION OF SENTIMENT THROUGH SENTIMENT INTENSITY ANALYZER ###############
        #creating a compound score for each review
        def Sentimental(line):
            analyzer = SentimentIntensityAnalyzer()
            pol_score = analyzer.polarity_scores(line)
            sentiment_score = pol_score['compound']
            return sentiment_score
        #return the sentiment category based on the review analysis
        def SentimentalScore(line):
            analyzer = SentimentIntensityAnalyzer()
            pol_score = analyzer.polarity_scores(line)
                #shows the vader performance on a given feedback review.
            print("{:-<40} {}".format(line, str(pol_score)))
            sentiment_score = pol_score['compound']
                #categorizes the feedback based on the sentiment score returned by the compound score.
            if sentiment_score >= 0.5:
                return 'positive'
            elif (sentiment_score > -0.5) and (sentiment_score < 0.5):
                return 'neutral'
            elif sentiment_score <= -0.5:
                return 'negative'

        print("#################################################")
        Training_Data = new_dataset.head(10000)
            #calculate the sentiment score and store new column called
        Training_Data['Sentiment_Score'] = Training_Data['Review_Text'].apply(lambda x: Sentimental(x))
        Training_Data['Sentiment_Category'] = Training_Data['Review_Text'].apply(lambda x: SentimentalScore(x))
            #sort the results in ascending order
        Training_Data = Training_Data.sort_values('Sentiment_Score', ascending=True)
        
            #collect the rating and the reviews
        ratings = Training_Data['Rating']
        reviews = Training_Data['Review_Text']
        
            #collect the category and scores
        sentiment_cat = Training_Data['Sentiment_Category']
        sentiment_score = Training_Data['Sentiment_Score']

            ######## RATING OF THE FEEDBACK IS ALSO COMPARED WITH THE NUMBER OF INCORRECT!!
            ######## OF RATING IS 4 THEN LOW FEEDBACK OTHERWISE IF ITS 5 THEN HIGH FEEDBACK
            ####### 1 - VERY LOWW RATING 2 - AVERAGE RATING 3 - OKAYY RATING 4 - GOOD RATING 5 - FANTASTIC RATING
        for review, score, cat, rating in zip(reviews, sentiment_score, sentiment_cat, ratings):
            if grade == "A":
                if int(mark) >= 90 and cat == "positive":
                    if int(mark) >= 95 and score >= 0.95 and score >= 0.9: #high 90%
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_90.append(new_obj)
                        context = Alltop_90
                    elif int(mark) <= 95 and int(mark) >= 90 and score >= 0.9 and score <= 0.95:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_90.append(new_obj)
                        context = Alltop_90
                if int(incorrect) < lower_marks and cat == "negative" and (rating == 5 or rating == 4):
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(mark) >= 80 and int(mark) < 90 and score >= 0.8 and score < 0.9 and cat == "positive":
                    if int(mark) >= 85 and score >= 0.85 and score >= 0.8: #high 80%
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_80.append(new_obj)
                        context = Alltop_80
                    elif int(mark) <= 85 and int(mark) >= 80 and score >= 0.8 and score <= 0.85:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_80.append(new_obj)
                        context = Alltop_80
                if int(mark) >= 70 and int(mark) < 80 and score >= 0.7 and score < 0.8 and cat == "positive":
                    if int(mark) >= 75 and score >= 0.75 and score >= 0.7: #high 70%
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_70.append(new_obj)
                        context = Alltop_70
                    elif int(mark) <= 75 and int(mark) >= 70 and score >= 0.7 and score <= 0.75:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat,
                                    'effectiveness': effectiveness
                                    }
                        Alltop_70.append(new_obj)
                        context = Alltop_70
        # print(improvmentFeedback)
            if grade == "B":
                #students with 60% and higher
                if int(mark) >= 60 and int(mark)  < 70 and score >= 0.6 and score < 0.7 and cat == "positive":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_60.append(new_obj)
                    context = Alltop_60  
                 #negative feedback for improvment
                if int(incorrect) < lower_marks and cat == "negative" and rating == 5:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print(new_obj)
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
            if grade == "C":
                #students with 50% and higher
                if int(mark) >= 50 and int(mark) < 60 and score >= -0.7 and score < -0.5 and cat == "negative":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_50.append(new_obj)
                    context = Alltop_50
                 #negative feedback for improvment
                if int(incorrect) < lower_marks and cat == "negative" and rating == 5:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print(new_obj)
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
            if grade == "D":
                #students with 50% and higher
                if int(mark) >= 40 and int(mark) < 50 and score < -0.7 and score >= -0.8 and cat == "negative":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_40.append(new_obj)
                    context = Alltop_40
                 #negative feedback for improvment
                if int(incorrect) < lower_marks and cat == "negative" and rating == 5:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'low',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print(new_obj)
                    print("this person should be given a low imrpovement from a negative batch")
                if int(incorrect) > upper_marks and cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
                if int(incorrect) > lower_marks and int(incorrect) < middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
                if int(incorrect) == middle_mark and cat == "negative" and rating == 3:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'neutral',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a neutral feedback")
            if grade == "Fail":
                #students with Fail
                if int(mark) >= 0 and int(mark) < 40 and cat == "negative":
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness
                                }
                    Alltop_Fail.append(new_obj)
                    context = Alltop_Fail
                #negative feedback for improvment
                if cat == "negative" and rating == 1:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat,
                                'effectiveness': effectiveness,
                                'level': 'high',
                                'rating':rating
                                }
                    top_improv.append(new_obj)
                    improvmentFeedback = top_improv
                    print("this person should be given a high improvement from a negative batch")
        print(test + " " + mark + " " + correct)
        final_context = [context, improvmentFeedback]
        return JsonResponse(final_context, safe = False)






























# for review, score, cat in zip( reviews, sentiment_score, sentiment_cat):
        #     if grade == "A" and cat == "positive":
        #             #students with 90% and higher
        #         if int(mark) >= 90 and score >= 0.9:
        #             ##SPLIT INTO 4 QUARTILES 
        #             new_obj = {'score': score,
        #                         'review': review,
        #                         'category': cat,
        #                         'effectiveness': effectiveness
        #                         }
        #             top_90.append(new_obj)
        #             context = top_90
        # q3 = round(0.75*(len(context)+1))
        # q1 = round(0.25*(len(context)+1))
        # q2 = round(len(context)/2)
        # print(context[q3])
            #quartals 25, 75, 50...
                    
                        #check if the incorrect answers is above the half point, give an improvement feedback
            #         if int(incorrect) >= upper_marks and score >= 0.95:
            #             print("entered ")
            #             new_obj = {'score': score,
            #                         'review': review,
            #                         'category': cat,
            #                         'effectiveness': effectiveness
            #                         }
            #             top_90_improv.append(new_obj)
            #             improvmentFeedback = top_90_improv
            #         elif int(incorrect) < (int(totalMarks/2)) and score < 0.95 and score > 0.9:
            #             new_obj = {'score': score,
            #                         'review': review,
            #                         'category': cat,
            #                         'effectiveness': effectiveness
            #                         }
            #             top_90_improv.append(new_obj)
            #             improvmentFeedback = top_90_improv
            #         #students with 80% and higher
            #     elif int(mark) >= 80 and int(mark) < 90 and score >= 0.8 and score < 0.9:
            #         new_obj = {'score': score,
            #                     'review': review,
            #                     'category': cat,
            #                     'effectiveness': effectiveness
            #                     }
            #         top_90.append(new_obj)
            #         context = top_90
            #         #students with 70% and higher
            #     elif int(mark) >= 70 and int(mark)  < 80 and score >= 0.7 and score < 0.8:
            #         new_obj = {'score': score,
            #                     'review': review,
            #                     'category': cat,
            #                     'effectiveness': effectiveness
            #                     }
            #         top_90.append(new_obj)
            #         context = top_90
            # if grade == "B" and cat == "positive":
            #     #students with 60% and higher
            #     if int(mark) >= 60 and int(mark)  < 70 and score >= 0.6 and score < 0.7:
            #         new_obj = {'score': score,
            #                     'review': review,
            #                     'category': cat,
            #                     'effectiveness': effectiveness
            #                     }
            #         top_90.append(new_obj)
            #         context = top_90
            # if grade == "C" and cat == "negative":
            #     #students with 50% and higher
            #     if int(mark) >= 50 and int(mark) < 60 and score >= -0.5 and score < -0.7:
            #         new_obj = {'score': score,
            #                     'review': review,
            #                     'category': cat,
            #                     'effectiveness': effectiveness
            #                     }
            #         top_80.append(new_obj)
            #         context = top_80
            # if grade == "D" and cat == "negative":
            #     #students with 50% and higher
            #     if int(mark) >= 40 and int(mark) < 50 and score >= -0.7 and score < -0.8:
            #         new_obj = {'score': score,
            #                     'review': review,
            #                     'category': cat,
            #                     'effectiveness': effectiveness
            #                     }
            #         top_80.append(new_obj)
            #         context = top_80
            # if grade == "Fail" and cat == "negative":
            #     #students with Fail
            #     if int(mark) >= 0 and int(mark) < 40 and score >= -0.8 and score <= -0.9:
            #         new_obj = {'score': score,
            #                     'review': review,
            #                     'category': cat,
            #                     'effectiveness': effectiveness
            #                     }
            #         top_80.append(new_obj)
            #         context = top_80




































    # queryset = FeedbackBankTwo.objects.all()
    # print(FeedbackBankTwo.objects.values_list('feedback_bank', flat=True))
    # feedback = list(FeedbackBankTwo.objects.values_list('feedback_bank', flat=True))[1]
    # print(feedback)
    # feed3 = TextBlob(feedback)
    # print(feed3.sentiment.polarity)
    # input_feedback  = FeedbackBankTwo.objects.values_list('feedback_bank', flat=True)
    # ##training data to use, for my project I used the movie reviews in NLTK
    # positive_fileids = movie_reviews.fileids('pos')
    # negative_fileids = movie_reviews.fileids('neg')
    #     ##seperate the fields into positive and negative reviews
    # features_positive = [(Features(movie_reviews.words(fileids=[f])), 
    #        'Positive') for f in positive_fileids]
    # features_negative = [(Features(movie_reviews.words(fileids=[f])), 
    #        'Negative') for f in negative_fileids]
    #     ##here we divide into both training and testing datasets
    # threshold_factor = 0.8  #split the data into train and test (80/20)
    # threshold_positive = int(threshold_factor * len(features_positive))
    
    # print(len(features_positive))
    # threshold_negative = int(threshold_factor * len(features_negative))
    # print(len(features_negative))
    #     #extract the features from the reviews
    # features_train = features_positive[:threshold_positive] + features_negative[:threshold_negative]
    # features_test = features_positive[threshold_positive:] + features_negative[threshold_negative:]  
    # print ("\nNumber of training datapoints:", len(features_train))
    # print ("Number of test datapoints:", len(features_test))
    #     ##use NBC to define the object and train it!
    # classifier = NaiveBayesClassifier.train(features_train)
    # accuracy = nltk.classify.util.accuracy(classifier, features_test)
    # print ("\nAccuracy of the classifier:", accuracy*100)
    #     #prints the wors obtained during the analysism these define whats classified as positive or negative review!
    # print("\nTop 10 most informative words:")
    # for item in classifier.most_informative_features()[:10]:
    #         print (item[0])
    #     ##run the classifier on the sentences and obtain the predictions
    # for feedback in input_feedback:
    #     print ("\nFeedback:", feedback)
    #     probdist = classifier.prob_classify(Features(feedback.split()))
    #     predicted_sentiment = probdist.max()
    #     #print out the results
    #     print ("Predicted sentiment:", predicted_sentiment)
    #     #save the category for the feedback!
    #     query_feedback = FeedbackBankTwo.objects.get(feedback_bank=feedback)
    #     query_feedback.category = predicted_sentiment
    #     query_feedback.percentage = round(probdist.prob(predicted_sentiment), 2)*100
    #     query_feedback.save()
    #     print(query_feedback)
    #     print ("Probability:", round(probdist.prob(predicted_sentiment), 2))
    # print("\nreview: ", data["reviewText"])
    # probdist = classifier.prob_classify(Features(filtered_output.split()))
    # predicted_sentiment = probdist.max()
    # print("Predicted sentiment:", predicted_sentiment)
    # print("Probability:", round(probdist.prob(predicted_sentiment), 2))
    # input_feedback  = PreProcessedData.objects.values_list('processed_feedback', flat=True)
    # ##training data to use, for my project I used the movie reviews in NLTK
    # positive_fileids = movie_reviews.fileids('pos')
    # negative_fileids = movie_reviews.fileids('neg')
    #     ##seperate the fields into positive and negative reviews
    # features_positive = [(Features(movie_reviews.words(fileids=[f])), 
    #        'Positive') for f in positive_fileids]
    # features_negative = [(Features(movie_reviews.words(fileids=[f])), 
    #        'Negative') for f in negative_fileids]
    #     ##here we divide into both training and testing datasets
    # threshold_factor = 0.8  #split the data into train and test (80/20)
    # threshold_positive = int(threshold_factor * len(features_positive))
    
    # print(len(features_positive))
    # threshold_negative = int(threshold_factor * len(features_negative))
    # print(len(features_negative))
    #     #extract the features from the reviews
    # features_train = features_positive[:threshold_positive] + features_negative[:threshold_negative]
    # features_test = features_positive[threshold_positive:] + features_negative[threshold_negative:]  
    # print ("\nNumber of training datapoints:", len(features_train))
    # print ("Number of test datapoints:", len(features_test))
    #     ##use NBC to define the object and train it!
    # classifier = NaiveBayesClassifier.train(features_train) 
    # accuracy = nltk.classify.util.accuracy(classifier, features_test)
    # print ("\nAccuracy of the classifier:", accuracy*100)
    #     #prints the wors obtained during the analysis these define whats classified as positive or negative review!
    # print("\nTop 10 most informative words:")
    # for item in classifier.most_informative_features()[:10]:
    #         print (item[0])
    #     ##run the classifier on the sentences and obtain the predictions
    # for feedback in input_feedback:
    #     print ("\nFeedback:", feedback)
    #     probdist = classifier.prob_classify(Features(feedback.split()))
    #     predicted_sentiment = probdist.max()
    #     #print out the results
    #     print ("Predicted sentiment:", predicted_sentiment)
    #     #save the category for the feedback!
    #     query_feedback = FeedbackBankTwo()
    #     query_feedback.feedback_bank = feedback
    #     query_feedback.category = predicted_sentiment
    #     query_feedback.percentage = round(probdist.prob(predicted_sentiment), 2)*100
    #     query_feedback.save()
    #     print(query_feedback)
    #     print ("Probability:", round(probdist.prob(predicted_sentiment), 2))
# #GRADING MECHANISM FOR FEEDBACK
#FeedbankTwo.objects.all().delete()
#GRADE A --> (POSITIVE > 0.7)
#GRADE B --> (POSITIVE > 0.5)
#GRADE C --> (NEGATIVE > 0.5)
#GRADE D & FAIL --> (NEGATIVE > 0.7)

#if rating is 4 or 5 is its positive

#give feedback based on matching the review rating and the probability

#get the accuracy through false positives

#give the teacher the option to confirm and send the feedback or edit or make their own one after the feedback is generated

#train 1/3 of the dataset and test on the other 2/3.

#show the teacher the feedback percentage with the feedback so that they can decide what they want to do next. :)

#feedback for each student should be different 
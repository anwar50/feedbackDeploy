
from app.models import Module, Test, TeacherProfile, Grade, FeedbackBankTwo, UserTest, Feedback, SavedFeedback, PreProcessedData, AnswersBank
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
    FeedbackGeneratorSerializer,
    SavedTestFeedbackSerializer,
    TeacherUserSerializer,
    AnswersBankSerializer
)
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
import nltk
# from nltk.tokenize import sent_tokenize, word_tokenize
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
nltk.download('all')
from django.shortcuts import render, redirect
    #importing packages for sentiment analysis.
import nltk.classify.util
import warnings 
import glob
import pandas as pd
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews, stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
import gzip
import json, string
warnings.filterwarnings("ignore")
def Features(list_words):
        return dict([(word, True) for word in list_words])
#go through sentiment categories for all 50 data used.
        # for review in reviews and rating in ratings:
        #     #pre_processed = PreProcessedData()
        #     print(review)
            #store pre processed data with the review and the rating
        # for rating, review in zip(ratings, reviews):
        #     pre_processed = PreProcessedData()
        #     pre_processed.processed_feedback = review
        #     pre_processed.rating = rating
        #     pre_processed.save()

        # FeedbackBankTwo.objects.all().delete()
        # PreProcessedData.objects.all().delete()
        # for score, category, review in zip(sentiment_score, sentiment_cat, reviews):
        #     feedback_final = FeedbackBankTwo()
        #     feedback_final.feedback_bank = review
        #     feedback_final.category = category
        #     feedback_final.percentage = score*100
        #     feedback_final.save()
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
    print("Hellooo")
    Feedback1 = "The food at Radison was awesome"
    Feedback2 = "The food at Radison was very good"
    feed1 = TextBlob(Feedback1)
    feed2 = TextBlob(Feedback2)
    print(feed1.sentiment)
    print(feed2.sentiment)
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
    #     ##feedback views
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
class NLTKProcess(View):
    final_feedback_given = ""
    final_feedback_score = 0
    final_sentiment_score = 0
    final_feedback_category = ""
    def get(self, request, test, grade, mark, correct, incorrect):
        #total marks for the test
        totalMarks = int(incorrect) + int(correct)
            #PROCESSING TRAINGING MODEL
        file = glob.glob('C:\\Users\\anwardont delete my\\Documents\\Datasets\\Review.json')
            #process the data from the json file and store in array for the model
        Reviews = []
        top_90 = []
        top_80 = []
        top_70 = []
        top_60 = []
            #top improvment feedbacks
        top_90_improv = []
        top_80_improv = []
        top_70_improv = []
        top_60_improv = []
        with open(file[0]) as data:
            read_data = data.read()
            for review in read_data.split('\n'):
                Reviews.append(review)
        print(Reviews[0]) #prints the first review object

            #process the data from json into a list of tuples
        reviewFrame = []
        # for review in Reviews[:50]:
            #use the first 5000 reviews in the reviews dataset.
        for review in Reviews[:50]:
            try:
                jsondata = json.loads(review)
                reviewFrame.append((jsondata['reviewerID'], jsondata['asin'], jsondata['reviewerName'], jsondata['helpful'][0], jsondata['helpful'][1], jsondata['reviewText'], jsondata['overall'], jsondata['summary'], jsondata['unixReviewTime'], jsondata['reviewTime']))
            except:
                pass

        #making a dataframe using the list of tuples created earlier
        new_dataset = pd.DataFrame(reviewFrame, columns=['Reviewer_ID','Asin','Reviewer_Name','helpful_UpVote','Total_Votes','Review_Text','Rating','Summary','Unix_Review_Time','Review_Time'])

        #Calculation of sentiments for each review
        def Sentimental_Naive(line):
            blob = TextBlob(line, analyzer=NaiveBayesAnalyzer())
            sentiment_score = blob.sentiment.classification
            return sentiment_score

        #creating a compound score for each review
        def Sentimental(line):
            analyzer = SentimentIntensityAnalyzer()
            vader_score = analyzer.polarity_scores(line)
            sentiment_score = vader_score['compound']
            return sentiment_score
        #return the sentiment category based on the review analysis
        def SentimentalScore(line):
            analyzer = SentimentIntensityAnalyzer()
            vader_score = analyzer.polarity_scores(line)
            sentiment_score = vader_score['compound']
            if sentiment_score >= 0.5:
                return 'positive'
            elif (sentiment_score > -0.5) and (sentiment_score < 0.5):
                return 'neutral'
            elif sentiment_score <= -0.5:
                return 'negative'

        #taking the first 100,000 reviews
        Training_Data = new_dataset.head(10000)

        #calculate the sentiment score and store new column called
        Training_Data['Sentiment_Score'] = Training_Data['Review_Text'].apply(lambda x: Sentimental(x))
        Training_Data['Sentiment_Category'] = Training_Data['Review_Text'].apply(lambda x: SentimentalScore(x))

        #score = Training_Data.loc[Training_Data['Sentiment_Score']]
        neutral = Training_Data.loc[Training_Data['Sentiment_Category'] == 'neutral']
        positive = Training_Data.loc[Training_Data['Sentiment_Category'] == 'positive']
        negative = Training_Data.loc[Training_Data['Sentiment_Category'] == 'negative']

        print(positive)
        print(negative)
        ratings = Training_Data['Rating']
        reviews = Training_Data['Review_Text']
        sentiment_cat = Training_Data['Sentiment_Category']
        sentiment_score = Training_Data['Sentiment_Score']
        name = Training_Data['Reviewer_Name']
        train = Training_Data
        for review, score, cat in zip( reviews, sentiment_score, sentiment_cat):
            if grade == "A" and cat == "positive":
                    #students with 90% and higher
                if int(mark) >= 90 and score >= 0.9:
                    print(int(totalMarks/2))
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_90.append(new_obj)
                    context = top_90
                        #check if the incorrect answers is above the half point, give an improvement feedback
                    if int(incorrect) >= (int(totalMarks/2)) and score >= 0.95:
                        print("entered ")
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat
                                    }
                        top_90_improv.append(new_obj)
                        improvmentFeedback = top_90_improv
                    elif int(incorrect) < (int(totalMarks/2)) and score < 0.95 and score > 0.9:
                        new_obj = {'score': score,
                                    'review': review,
                                    'category': cat
                                    }
                        top_90_improv.append(new_obj)
                        improvmentFeedback = top_90_improv
                    #students with 80% and higher
                elif int(mark) >= 80 and int(mark) < 90 and score >= 0.8 and score < 0.9:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_90.append(new_obj)
                    context = top_90
                    #students with 70% and higher
                elif int(mark) >= 70 and int(mark)  < 80 and score >= 0.7 and score < 0.8:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_90.append(new_obj)
                    context = top_90
            if grade == "B" and cat == "positive":
                #students with 60% and higher
                if int(mark) >= 60 and int(mark)  < 70 and score >= 0.6 and score < 0.7:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_90.append(new_obj)
                    context = top_90
            if grade == "C" and cat == "negative":
                #students with 50% and higher
                if int(mark) >= 50 and int(mark) < 60 and score >= -0.5 and score < -0.7:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_80.append(new_obj)
                    context = top_80
            if grade == "D" and cat == "negative":
                #students with 50% and higher
                if int(mark) >= 40 and int(mark) < 50 and score >= -0.7 and score < -0.8:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_80.append(new_obj)
                    context = top_80
            if grade == "Fail" and cat == "negative":
                #students with Fail
                if int(mark) >= 0 and int(mark) < 40 and score >= -0.8 and score <= -0.9:
                    new_obj = {'score': score,
                                'review': review,
                                'category': cat
                                }
                    top_80.append(new_obj)
                    context = top_80
            
        print(test + " " + mark + " " + correct)
        print("fg")
        #context = [self.final_feedback_given, self.final_feedback_score, self.final_feedback_category]
        final_context = [context, improvmentFeedback]
        return JsonResponse(final_context, safe = False)






































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
# positive = Training_Data.loc[Training_Data['Sentiment_Category'] == 'positive']
#         negative = Training_Data.loc[Training_Data['Sentiment_Category'] == 'negative']
#         neutral = Training_Data.loc[Training_Data['Sentiment_Category'] == 'neutral']
#         print(positive)
#         print(negative)

#taking the first 100,000 reviews
        # NaivTrainingData = dataset_two.head(10000)
        # NaivTrainingData['Sentiment_Score'] = NaivTrainingData['Review_Text'].apply(lambda s: Sentimental_Naive(s))
        # # NaivTrainingData = NaivTrainingData.sort_values('Sentiment_Score', ascending=True)
        # #pos = NaivTrainingData.loc[NaivTrainingData['Sentiment_Category'] == 'positive']
        # scores = NaivTrainingData['Sentiment_Score']
        # for score in scores:
        #     print(score)
        #print(NaivTrainingData)
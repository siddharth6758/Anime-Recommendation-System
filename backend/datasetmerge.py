import pandas as pd

folder = 'D:/AnimeRecommendationSystem/backend/dataset/'
anime_d = pd.read_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime.csv')
rating_d = pd.read_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\rating.csv')

anime_d = anime_d.drop(['members'],axis=1)
rating_d = rating_d[rating_d['rating'] != -1]
new_rating = rating_d.groupby('anime_id').mean()
new_rating = new_rating.drop(['user_id'],axis=1)
new_df = anime_d.merge(new_rating,how='left',on=['anime_id'])
new_df.rename(columns={
    'rating_x':'avg_rating',
    'rating_y':'user_avg_rating'
},inplace=True)

new_df.to_csv(folder+'anime_dataset.csv')
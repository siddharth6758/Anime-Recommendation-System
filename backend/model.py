import pandas as pd
import pickle as pkl
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MaxAbsScaler
import warnings
warnings.filterwarnings("ignore")

df = pd.read_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime_dataset.csv',index_col=0)

#Preprocessing ----------------------------------------------------------------
df_type = df['type'].str.get_dummies(' ')
df_type = df_type.rename(columns={'Music':'music'})
df_genre = df['genre'].str.get_dummies(', ')

df_main = pd.concat([df['anime_id'],df_genre,df_type,df['episodes'],df['avg_rating'],df['user_avg_rating']],axis=1)
df_name = pd.concat([df['anime_id'],df['name']],axis=1)
df_main = df_main[df_main['episodes'] != 'Unknown']
df_main['user_avg_rating'] = df_main['user_avg_rating'].fillna(0.0)
df_main['avg_rating'] = df_main['avg_rating'].fillna(0.0)

mas = MaxAbsScaler()
mas.fit(df_main.iloc[:,1:].values)
df_main.iloc[:,1:] = mas.transform(df_main.iloc[:,1:].values)

#Nearest Neigbor model
nn = NearestNeighbors(n_neighbors=8)
nn.fit(df_main.iloc[:,1:])
pkl.dump(nn,open('D:\\AnimeRecommendationSystem\\backend\\recommendationsystem.pkl','wb'))
pkl.dump(mas,open('D:\\AnimeRecommendationSystem\\backend\\maxabsolutescaler.pkl','wb'))
df_name.to_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime_names.csv')
# st = '0	1	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	1	0	0	0	0	0	0.000550055	0.953041622	0.892325856'.split('\t')
# lst = [float(x) for i,x in enumerate(st)]
# index = nn.kneighbors([lst], return_distance=False)
# lst = list(index)
# for x in lst:
#     print(df_name.iloc[x]['name'])
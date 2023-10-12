import pandas as pd
import pickle as pkl
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MaxAbsScaler
import warnings
import re
warnings.filterwarnings("ignore")

df = pd.read_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime-mal.csv',index_col=0)

def gettime(time_str):
    hours = 0
    minutes = 0
    hours_match = re.search(r'(\d+) hr.', time_str)
    minutes_match = re.search(r'(\d+) min', time_str)
    if hours_match:
        hours = int(hours_match.group(1))
    if minutes_match:
        minutes = int(minutes_match.group(1))
    total_minutes = hours * 60 + minutes
    decimal_hours = total_minutes / 60
    return round(decimal_hours, 2)

#Preprocessing ----------------------------------------------------------------
df = df.reset_index(drop=True)
df = df.drop(columns=['English name','Japanese name','Studios','Premiered','Producers','Licensors','Source','Ranked','Members','Favorites', 'Watching', 'Completed', 'On-Hold', 'Dropped','Plan to Watch', 'Score-10', 'Score-9', 'Score-8', 'Score-7', 'Score-6', 'Score-5', 'Score-4', 'Score-3', 'Score-2', 'Score-1'])
df = df[df['Type'] != 'Unknown']
df['Aired'] = df['Aired'].str.split(' to ').str[0].str.split(',').str[-1]
df['Aired'] = df['Aired'].replace('Unknown',df['Aired'].mode()[0])
df['Aired'] = pd.to_numeric(df['Aired'])
dft = df[df['Episodes']!='Unknown']
df['Episodes'] = df['Episodes'].replace('Unknown',int(pd.to_numeric(dft['Episodes']).sum()/len(df['Episodes'])+2))
df['Episodes'] = pd.to_numeric(df['Episodes'])
df['Duration'] = df['Duration'].replace('Unknown',df['Duration'].mode()[0])
df['Duration'] = df['Duration'].apply(gettime)
df['Rating'] = df['Rating'].replace('Unknown',df['Rating'].mode()[0])
df_rating = {name:id for name,id in zip(df['Rating'].unique(),range(len(df['Rating'].unique())))}
df['Rating'] = df['Rating'].map(df_rating)
dft = df[df['Score']!='Unknown']
df['Score'] = df['Score'].replace('Unknown',dft['Score'].median())
df_type = df['Type'].str.get_dummies(' ')
df_type = df_type.rename(columns={'Music':'music'})
df_genre = df['Genres'].str.get_dummies(', ')
df_main = pd.concat([df_genre,df_type,df['Episodes'],df['Score'],df['Aired'],df['Duration'],df['Rating'],df['Popularity']],axis=1)
df_name = pd.DataFrame(columns=['Name'])
df_name['Name'] = df['Name']

mas = MaxAbsScaler()
mas.fit(df_main.iloc[:,:].values)
df_main.iloc[:,:] = mas.transform(df_main.iloc[:,:].values)

# #Nearest Neigbor model
nn = NearestNeighbors(n_neighbors=8)
nn.fit(df_main.iloc[:,:])
pkl.dump(nn,open('D:\\AnimeRecommendationSystem\\backend\\recommendationsystem.pkl','wb'))
pkl.dump(mas,open('D:\\AnimeRecommendationSystem\\backend\\maxabsolutescaler.pkl','wb'))
# df_main.to_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime_dataset.csv')
# df_name.to_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime_names.csv')

# st = '1	1	0	1	0	0	1	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	1	0.351651946	0.927094668	0.988625124	0.143884892	0.2	0.001764873'.split('\t')
# lst = [float(x) for x in st]
# print(len(lst))
# # index2 = nn.radius_neighbors([lst],radius=1.2,return_distance=False)
# index = nn.kneighbors([lst], return_distance=False)
# lst = list(index)
# for x in lst:
#     print(df_name.iloc[x]['Name'])
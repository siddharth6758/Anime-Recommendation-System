
#https://api.jikan.moe/v4/anime/?genres=
#https://kitsu.io/api/edge/anime?filter[categories]=adventure
import pandas as pd
from flask import Flask,jsonify,request
from flask_cors import CORS
import pickle as pkl
import json

app = Flask(__name__)
CORS(app)

mas = pkl.load(open('maxabsolutescaler.pkl','rb'))
nn = pkl.load(open('recommendationsystem.pkl','rb'))
df_name = pd.read_csv('D:\\AnimeRecommendationSystem\\backend\\dataset\\anime_names.csv')

genre_list = ['Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama','Ecchi', 'Fantasy', 'Game', 'Harem', 'Hentai', 'Historical', 'Horror','Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military', 'Music','Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai','School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen','Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power','Supernatural', 'Thriller', 'Unknown', 'Vampire', 'Yaoi', 'Yuri']

type_list = ['Movie','music','OVA','ONA','TV','Special']

result = []

@app.route('/findanime', methods=['POST'])
def animefind():
    data = request.data
    respdata = data.decode('utf-8')
    respdata = json.loads(respdata)
    test_dict = {x:1 if x in respdata['genre'] else 0 for x in genre_list}
    test_dict.update({x:1 if x in respdata['type'] else 0 for x in type_list})
    test_dict['Episodes'] = int(respdata['episodes'])
    test_dict['Score'] = float(respdata['score'])
    test_dict['Aired'] = int(respdata['aired'])
    test_dict['Duration'] = float(respdata['duration'])
    test_dict['Rating'] = int(respdata['rating'])
    test_dict['Popularity'] = int(respdata['popularity'])
    df_l = [x for x in test_dict.values()]
    df_l = mas.transform([df_l])
    index = nn.kneighbors(df_l,return_distance=False)
    for x in index:
        result.append(df_name.loc[x,'Name'].values)
    print(result)
    response = {'status':'OK','userdata':list(result[0])} #response status + anime data
    return jsonify(response)


if __name__ == '__main__':
    app.run(port="5000")
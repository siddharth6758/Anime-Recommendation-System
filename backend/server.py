
#https://api.jikan.moe/v4/anime/?genres=
#https://kitsu.io/api/edge/anime?filter[categories]=adventure
import pandas as pd
from flask import Flask,jsonify,request
from flask_cors import CORS
import pickle as pkl

app = Flask(__name__)
CORS(app)

genre_list = ['Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem', 'Hentai', 'Historical', 'Horror', 'Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural', 'Thriller', 'Vampire', 'Yaoi', 'Yuri']

@app.route('/findanime', methods=['POST'])
def animefind():
    data = request.data
    print('userdata:',data)


if __name__ == '__main__':
    app.run(port="5000")
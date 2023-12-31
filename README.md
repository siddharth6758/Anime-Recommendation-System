# Anime-Recommendation-System
The Anime Recommendation System is an innovative solution that leverages advanced algorithms and user preferences to suggest tailored anime content. 
Utilizing ReactJS and Python with Flask integration, this system harnesses the power of the Kitsu API to fetch comprehensive anime data. Users can discover and 
explore their favorite shows, benefiting from a personalized viewing experience. This project bridges the gap between anime enthusiasts and their 
ideal series, enhancing their entertainment journey.

![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/191baa1d-ffcc-4b8f-a571-71ff3b6ed9d0)

# Dataset
The dataset covers 17,500+ animes and contains the following data for each anime:
- Id : Contains unique id alloted to an anime according to [**MAL**](https://myanimelist.net/).
- Name : Name/Title of the anime.
- Score : Rating of the anime as per MAL.
- Genres : List of genres the anime belongs to.
- English Name : Name of anime in English.
- Japanese Name : Name of anime in Japanese.
- Type : Whether the anime is a TV show, Movie etc.
- Episodes : Number of episodes.
- Aired : Broadcasting date.
- Premiered : Season of premiere.
- Producers : Producers of the anime.
- Licensors : Organizations who grant local distributors the rights to localize and distribute anime in a particular market.
- Studios : Organizations for creating the animation from source.
- Source : Reference/Origin of the anime.
- Duration : Duration of each episode.
- Rating : Age Rate.
- Ranked : Position based in the score.
- Popularity : Position based in the the number of users who have added the anime to their list.
- Members : Community size related to the anime.
- Favorites : Number of users who have the anime as "favorites".
- Watching : Number of users who are watching the anime.
- Completed : Number of users who have complete the anime.
- On-Hold : Number of users who have the anime on Hold.
- Dropped : Number of users who have dropped the anime.
- Plan to Watch : Number of users who plan to watch the anime.

Dataset has been taked from [**Kaggle**](https://www.kaggle.com/datasets/hernan4444/anime-recommendation-database-2020).
The Dataset has been cleaned and unnecessary columns has been removed, missing values have been filled/removed.

# FrontEnd - ReactJs
ReactJS and the [**react-particle-images**](https://github.com/malerba118/react-particle-image) library have been used to craft an engaging and visually appealing frontend for our project. ReactJS provides the foundation 
for building dynamic and interactive user interfaces, while react-particle-images adds a layer of captivating visual effects through particle animations. Together, they 
enhance the user experience by creating an attractive and immersive interface that elevates the overall aesthetics of our application.

![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/ef0a5adf-35d2-42c6-aaaa-72201912db44)

# Backend - Python + Flask
Python and Flask play a crucial role in our project by handling the data and enabling seamless integration with our ReactJS frontend. Python is used to clean and 
preprocess the anime dataset, making sure the information is accurate and ready for analysis. Additionally, it helps create a Nearest Neighbor model, which allows us 
to find and recommend anime that are similar to the user's preferences.

Flask, on the other hand, acts as a bridge between our ReactJS frontend and Python backend. It facilitates communication, ensuring that when users request recommendations
or interact with the model, the information flows smoothly. In simpler terms, Flask helps connect the frontend's visual interface with the backend's data processing and 
recommendation capabilities, making the entire system work together seamlessly.

# Nearest Neighbors - python model
The principle behind Nearest Neighbors is to return those data points in training sample which are closest to the test-datapoint. The number of neighbors the user want to retrieve 
can be defined in the **sklearn.NearestNeighbors()** parameters 'n_neighbors'. The points can be retrieved using **NearestNeighbors.kneighbors()** method which takes the test-datapoint as an 
argument.

![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/5f9ec0ce-402a-4c9f-93c4-93edb6f1b030)

# Features
This project provides 2 methods to user to provide input:

- # Custom User Choice:
  Where the user manually inserts the information of anime such as genre, episodes, type etc., on the basis of which the model provides a list of anime which are nearest/almost similar
  to the data provided by the user.

  ![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/7b9b03c4-07ee-4d20-bbc6-5c48f82c2baf)
  
  ![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/6252fa79-f242-4f22-949f-2e86320f9bf0)
  
  ![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/67afc576-2da5-490c-ae53-f4bb744c7a29)


- # Name Search Choice:
  The user needs to only provide the name of the anime on the basis of which it will get recommendations

  ![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/3adf19be-1f77-439d-bc2a-17f083bf5498)

  On entering the name of anime, an API call will be made using [**Kitsu API Docs**](https://kitsu.docs.apiary.io/#introduction/json:api) , which will first fetch the data of the
  anime provided by user, and use its data to get the list of recommended animes.

  ![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/6e358351-eb69-4035-b7c6-2a1bc0bd2552)

# Result
The result would be displayed as a clickable box of 8 anime recommendations.

![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/20614035-e58d-455b-a863-551c9456e229)

On clicking the Anime, would provide the user with detailed information that is fetched using **Kitsu API docs** on a pop-up modal.

![image](https://github.com/siddharth6758/Anime-Recommendation-System/assets/90406492/6ff0e733-e762-42a2-a58d-3e67d3a614ce)












# Meal Matchers <img src="./frontend/src/Icons/tinderEats.svg" alt="drawing" width="20"/>
Its like *Tinder* but for restaurant and you always get a match 😋. This project idea stems from my inability to decide where to eat.

This project uses `React` as the frontend, `Express` as the backend, `Firestore` as the database and `Firebase` for user authentication. It also uses Google's Places API to get nearby restaurants. 

After the users login with their gmail accounts they will be greeted by the main page where they can swipe away! Similar to Tinder, if they are interested in the restaurant, they can swipe right which will save the restaurant id to their firestore document.
<p align="center">
 <img src="./pics/HomePage.png" alt="drawing" width="500" />
</p><br/>

Each card has information such as rating, price category, address, open status and reviews if they exist. There will be future implementation to display restaurants Uber Eat's menu using UE's menu API. 

<p align="center">
 <img src="./pics/Reviews.png" alt="drawing" width="300" />
</p><br/>

There is a page where users can view thier matches and decide a restaurant they want to eat at or use the 'random' button to pick for them. 
<p align="center">
 <img src="./pics/MatchPage.png" alt="drawing" width="500" />
</p>

## Demo
A demo of this project can be found [here](https://drive.google.com/file/d/1cAlvxHhAGJXi15AjkgUKm8tW-myaw2sI/view?usp=sharing)
<br/>
<br/>
# How to run
1. Generate a [Google API key](https://support.google.com/googleapi/answer/6158862?hl=en) with Google Places API enabled and a billing account linked. 
2. Go to the `./frontend/.env` & `./backend/.env` and replace `YOUR_KEY` with the key you generated. 
3. We can either boot it with Docker or normally with the following commands.
    ### Docker
    > `docker-up compose`
    ### Without Docker
    > `npm start`

The 
# Cosmic Bubble

[Cosmic Bubble live][prodlink]

Cosmic Bubble is a single player browser game built with JavaScript, jQuery, HTML5, Canvas and CSS.

![Cosmic Bubble home page: http://dtailor90.github.io/cosmic-bubble][home_page]

## Features & Implementation

Cosmic Bubble has a dynamically engineered collision detection system for the floating objects. I calculated the distance between the center of the 2 floating objects to accomplish this.

I implemented an algorithm to allow the user to play through infinite levels. I was able to accomplish this by storing a variable to keep track of the remaining floating objects, and when there was only 1 object left, I would generate more floating objects with an increased velocity.

At every level the color palette for the bubbles changes. I stored the colors in an array and used the level indicator to choose 4 colors appropriate colors.

HTML5 canvas was used to render and animate the floating objects. I implemented a recursive function using requestAnimationFrame to animate the floating objects at 60 Frames Per Second.

Using CSS3 I was able to give the game a user friendly and easy to navigate front end. I was very attentive to detail while developing this game and used various css properties to make the page visually appealing and engaging.

I used jQuery to show and hide the pause screen, the loose screen and the home screen. jQuery's various methods such as toggle, and css allowed me to accomplish this feature.

![Cosmic Bubble Gameplay Page][game_play]

![Cosmic Bubble Loose Page][loose_page]


###User Experience

One of the primary goals for this project was to create a visually appealing browser game and to engage the user to keep wanting to play this game over and over again. I was able to accomplish these goals by implementing an infinite level algorithm as well as a using a multiple visually appealing color palettes to style the front end.

##Future directions

Cosmic bubble has some goals to accomplish in the near future:

###Mobile responsive design

Currently Cosmic Bubble is not mobile responsive as it only utilizes a keyboard to function. I would like to develop a mobile friendly version so that users never have to stop playing.

###Special Objects

I'd like to expand Cosmic Bubble's gameplay by adding various special objects that would change the way the user interacts with the game.


[prodlink]: http://dtailor90.github.io/cosmic-bubble
[home_page]: ./docs/screenshots/homepage.png "Cosmic Bubble home page"
[game_play]: ./docs/screenshots/gameplay-page.png "Game Play Page""
[loose_page]: ./docs/screenshots/loose-page.png "Loose Page"

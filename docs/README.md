## Cosmic Bubble

### Background

Cosmic Bubble is a popular planets game, where you start off as a small planet. The point of the game is to absorb smaller planets and grow in size, until you become the biggest planet. If you get close to a bigger planet, you will be absorbed and loose the game.

### Functionality & MVP  

With Cosmic Bubble, Users will be able to:

- [ ] Start and Pause the game.
- [ ] Move their planet with the arrow keys.
- [ ] Absorb smaller planets witht the goal of becoming the largest planet.

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start and Stop buttons.

![wireframes](https://github.com/dtailor90/cosmic-crush/docs/wireframes/cosmic-bubble.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `planet` object to connect to the `game` object.  Then, use `game.js` to create and render moving planets.

- Complete the `planets.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`

**Day 3**: Add logic to the game.

-Only a planet larger in size can absorb a planet smaller than itself.
-Add ability to navigate users planet using the arrow keys.


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls stop and start
- Have a styled `Canvas`, nice looking controls and title

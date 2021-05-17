# TicTacToe

Tech stack of application: Backend Java 11 + spring boot, Frontend Angular 12 + Angular material

1. To run the application two action must be taken:
- (Backend) Spring Boot application needs to be runned (Go to TicTacToeApplication and run the main method), it will automatically lunch tomcat server on port 8089
- (Frontend) Angular application needs to be runned by executing command 'ng serve --proxy-config proxy.conf.json' which will run the application by default at port 4200 and it will automatically proxy all of backend request to port 8089

2. Information about backend:

For java application I've decided to use spring boot. This choice allows me to not worry about chosing and providing server as it comes with build-in tomcat server. Another of many benefits is f.e. dependency management.
I've used it to inject beans through constructor injection as it is for me more elegant solution than seter injection. I've included another benefit of spring boot which are rest controllers.

I've split my code into 6 packages each representing different level of abstraction. First of we have controllers which are responsible only to get request form user send it to appropriate service and return a response.
We have GameController which is responsible sctrict gamre related action such as getting the user, setting point and of course getting and reseting the board.
Another controller is StatusController which only return informations about current status of game.

Second package contains all of the POJO Data Objects used by the apllication. BoardDO having board object. I've decided for ArrayList instead of 2d array because it is in my opinion more java appropriate solution.
Because of use of Arrays.asList(new Player[9]) I was able to create a list that is modifiable but not resizeable. GameDO constains two fields - game status and current player. Those are initialized with appropriate value "In progress" and "X".
PointDO is a simple object holding one int fields corresponding to coordinates of the point.

We have two enums -> Game status which can be either IN_PROGRESS, DRAW or WON and Player which can take value X and O.

I've customised exceptions InvalidGameException occurs when the point is submitted but the game is already finished (can happend in case of using postman instead of gui). InvalidPointException occurs
in case of point given that is out of the board scope. Both exception are to be given with status HTTP.BAD_REQUEST.

There are only two services as the application is, in my opinion, too small to split it to more pieces. GameService sets the point on board, changes user to the next one and changes the status, we can also reset game which will assign
default values to DOs. We can also get current player and get the board. It uses StatusService which is responsible of determing wether of not the game has finised with status draw or won. 
It also uses GameValidator which is responsible of making sure that the point has correct coordinates and the game is in correct state, otherwise throws an error.

I've tested 100% of code besides the main class as this would not be resonable.

3. Information about frontend:

I've used Angular 12 with angular material just because I never used it and I though it would be nice to get to know this. I've used simple css instead of scss because project, in my opinion, is too small to benefit from using scss.

I've split my code into api which is responsible for making requests into backend and return the response. Those apis corresponds to controllers.
Next we have facade which actually does something with the return values.
Each facade hold information about reponse as an observable to which we can later on subscibe in our components.
In GameFacade we store player and board and also we use it to store the tempPoint. This way we reuse the capabilities of angulars singleton injection between components.
I've created three models that correspond to enums and do.
We have 4 components:
-Error which intercepts error from backend and displays the message as snackbar (for exaplme when submiting point without picking a square)
-Tictactoe which contains board component and two buttons that will either submit the tempPoint or reset the game. It will also monitor the games status and if the game finished it will open up the dialog component.
  - Dialog component responsible for displaying given message
  - Board component which stores the tempPoint and displays the board.
  
  The frontend code is tested in almost 100% using karma and jasmine.

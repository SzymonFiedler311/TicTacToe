# TicTacToe

Application technology stack: Backend Java 11 + spring boot, Frontend Angular 12 + Angular material.

1. There are two steps to run the application:
- (Backend) The Spring Boot application must be started (Go to TicTacToeApplication and run the main method), it will automatically start the tomcat server on port 8089.
- (Frontend) Angular application must be started by executing 'ng serve --proxy-config proxy.conf.json' command, which will start the application on port 4200 by default and automatically redirect all backend requests to port 8089

2. Backend information:

For the java application I decided to use spring boot. This choice allows me not to worry about selecting and provisioning a server, as it has a tomcat server built in. Another of the many advantages is for example dependency management.
I use it to inject beans through constructor injection, as this is a more elegant solution for me than seter injection. I also took into account another advantage of Spring Boot which is rest controllers.

I split my code into 6 packages, each representing a different level of abstraction. First, we have controllers that are only responsible for taking a request from a user, sending it to the appropriate service and returning a response.
We have the GameController which is responsible for game actions such as fetching the user, setting the point and of course fetching and resetting the board.
Another controller is the StatusController, which only returns information about the current state of the game.

The second package contains all the POJO Data Objects used by the application. BoardDO which holds the board object. I decided to use ArrayList instead of 2d array as it is in my opinion a more suitable java solution.
By using Arrays.asList(new Player[9]) I was able to create a list that is modifiable but not resizable. GameDO contains two fields - the game state and the current player. These are initialised with the respective values "In progress" and "X".
PointDO is a simple object storing one field of type int corresponding to the coordinates of a point.

We have two enums -> Game status which can be IN_PROGRESS, DRAW or WON and Player which can take the values X and O.

I've also customised exceptions. InvalidGameException exceptions occur when a point has been sent, but the game is already finished (this can happen when using postman instead of gui). An InvalidPointException occurs when a point is given that is outside the scope of the board. Both exceptions are to be given with the status HTTP.BAD_REQUEST.

There are only two services, as the application is too small in my opinion to split it into more pieces. GameService sets the point on the board, changes the user to the next one and changes the status, we can also reset the game which will assign default values for DO. We can also get the current player and the board. Uses StatusService, which is responsible for determining whether the game ended in a draw or a win. 
It also uses a GameValidator, which is responsible for making sure the point has the correct coordinates and the game is in the correct state, otherwise it throws an error.

I have tested 100% of the code outside of the main class as it would not be reasonable to do so.

3. Frontend info:

I used Angular 12 with angular material just because I've never used it and thought it would be cool to get familiar with it. I used simple css instead of scss because the project, in my opinion, is too small to benefit from using scss.

I split my code into api's which are responsible for making requests to the backend and returning responses. These api's correspond to controllers.
Then we have facades, which actually do something with the values returned by the api.
Each facade stores the response information as an observable that we can then subscribe our components to.
We store player and board information in the GameFacade, and use it to store tempPoint. In this way we use the capabilities of angular singleton injection between components.
I created three models that correspond to enums and do.
We have 4 components:
- Error, which intercepts an error from the backend and displays the message as a snackbar (e.g. when sending a point without selecting a square)
- Tictactoe, which contains a board component and two buttons that will either send a point or reset the game. It will also monitor the game status and if the game ends it will open a dialogue component.
  - The dialogue component responsible for displaying a particular message
  - The board component that stores the tempPoint and displays the array.
  
The frontend code is almost 100% tested using karma and jasmine.

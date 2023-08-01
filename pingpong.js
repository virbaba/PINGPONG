// Scoring Variable
var maxScore = 0;
var rod1Score = 0;
var rod2Score = 0;
var winScore = 0;

// Set into the local Storage
localStorage.setItem('MaxScore', maxScore);
localStorage.setItem("WinScore", winScore);

// Window outerHeight
var windHeight = window.innerHeight;
console.log(windHeight)

var windWidth = window.innerWidth;
console.log(windWidth);

// Container Object
var container = document.getElementById('container');
var conCoords = container.getBoundingClientRect();
var conHeight = conCoords.height;

// Rod 1 object
var rod1 = document.getElementById('rod1');
var rod1Coord = rod1.getBoundingClientRect();
var rod1Width = rod1Coord.width;

// Ball Object
var ball = document.getElementById('ball');

// Ball Coordination
var ballCoords = ball.getBoundingClientRect();

// Rod 2 object
var rod2 = document.getElementById('rod2');
var rod2Coord = rod2.getBoundingClientRect();

// Rendering function
function render(){
    ball.style.position = 'absolute';
    ball.style.top = windHeight / 2 + 'px';
    ball.style.left = windWidth / 2 + 'px';

    rod1.style.left = (windWidth / 2 - rod1Width / 2) + 'px';

    rod2.style.top = conHeight - 20 + 'px';
    rod2.style.left = (windWidth / 2 - rod1Width / 2) + 'px';
}

// Render Rod1, Ball and Rod2 to the webpage
window.addEventListener('load', render);

window.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        alert("Match Start: Max Score Is: "+localStorage.getItem('MaxScore'));
        start();
    }
})

function start(){
    

// Now Handling The Event  of Button A and D and moving rod left and right respectively
window.addEventListener('keydown', (e)=>{
    var rod1offsetLeft = rod1.offsetLeft;
    var rod2offsetLeft = rod2.offsetLeft;
    var totalRight = rod1offsetLeft + rod1Coord.width;

    // Moving Left
    if(rod1offsetLeft > 0 && e.key === 'a' || e.key === 'A'){

        rod1.style.left = rod1offsetLeft - 20 + 'px';
        rod2.style.left = rod2offsetLeft - 20 + 'px';

    }

    // Moving Right
    else if(totalRight < windWidth-20 && e.key === 'd' || e.key === 'D'){

        rod1.style.left = rod1offsetLeft + 20 + 'px';
        rod2.style.left = rod2offsetLeft + 20 + 'px';

    }
})


// The Process Of Moving The Ball

    var leftDir = 10;
    var topDir = 10;
let clear = setInterval(()=>{
    // Shift the to the left side
    ball.style.left = ball.offsetLeft - leftDir + 'px';
    // Shift the to the top side
    ball.style.top  = ball.offsetTop - topDir + 'px';

    // width of ball include left side screen
    var ballDiameter = ball.offsetLeft + ballCoords.width;
    // height of ball include top side screen
    var ballTopDaimeter = ball.offsetTop + ballCoords.height;

    
    // If Ball Miss Player 1 
    if(ball.offsetTop < 0){
        winScore = rod2Score - rod1Score;
        // console.log(rod2Score, rod1Score, winScore);
        localStorage.setItem("WinScore", ""+winScore);
        if(maxScore < rod2Score){
            maxScore = rod2Score;
            localStorage.setItem('MaxScore',""+maxScore);
        }

        alert('Player-2 win by '+ localStorage.getItem('WinScore') +' to Player-1 and Max Score: '+localStorage.getItem('MaxScore'));
        render();
        clearInterval(clear);
    }

    // If ball hit rod1
    else if(ball.offsetTop <= rod1Coord.height && ballDiameter >= rod1.offsetLeft && ball.offsetLeft <= (rod1.offsetLeft + rod1Coord.width)){
        rod1Score += 10;
        topDir = -topDir;
    }

    // If ball hit rod2

    else if(ballTopDaimeter >= (conHeight - rod2Coord.height) && ballDiameter >= rod2.offsetLeft && ball.offsetLeft <= (rod2.offsetLeft + rod2Coord.width)){
        rod2Score += 10;
        topDir = -topDir;
    }

    // if ball touch left most part of the window or right most part of window
    else if(ball.offsetLeft < 0 ||  ballDiameter > windWidth-10){
        leftDir = -leftDir;
    }


    // If the ball miss from Player 2 
    else if(ballTopDaimeter > windHeight){
        winScore = rod1Score - rod2Score;
        localStorage.setItem('WinScore',""+ winScore);

        if(maxScore < rod1Score){
            maxScore = rod1Score;
            localStorage.setItem('MaxScore',""+maxScore);
        }

        alert('Player-1 win by '+ localStorage.getItem('WinScore') +' to Player-2 and Max Score: '+localStorage.getItem('MaxScore'));
        render();
        clearInterval(clear);
    }
    
},100);
}
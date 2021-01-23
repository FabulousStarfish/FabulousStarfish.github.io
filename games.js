var firebaseConfig = {
    apiKey: "AIzaSyBweuVUFZjU1u8AnBLKbI5R3SINR9sKlFM",
    authDomain: "yep-2020.firebaseapp.com",
    databaseURL: "https://yep-2020.firebaseio.com",
    projectId: "yep-2020",
    storageBucket: "yep-2020.appspot.com",
    messagingSenderId: "653623928823",
    appId: "1:653623928823:web:6679c1f971dc5cc59230f2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebaseConfig);

/* function create(){
  firebase.database().ref("/Tickets").child("MGMTST34").update({    
      Status:'New',
      TicketNumber:'MGMTST34'
  });
  console.log("created");
}
create(); */
/*window.onbeforeunload = function () {
  localTicketNumber=localStorage.getItem("TicketNumber");
    
    ticketRef.child(localTicketNumber).update({
      RemainingTime:distance
    });
};*/

function showElements(){
  if(localStorage.getItem("TicketNumber")===null){    
    document.getElementById("logout").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "hidden";    
  }
  else{    
    document.getElementById("logout").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "visible";
  }
}
showElements();


var distance=0;

this.database = firebase.database();
ticketRef=this.database.ref('/Tickets');
hextrisRef=this.database.ref('/Hextris');
pacmanRef=this.database.ref('/PacMan');
twozerofoureightRef=this.database.ref('/TZFE');

var topTenHextris=this.database.ref("/Hextris").orderByChild("Score").limitToLast(10);

topTenHextris.once('value', function(snapshot){
    console.log("hello")
    if(snapshot.exists()){
        var content = '';
        let scoresAr=[];
        snapshot.forEach(function(data){
            var val = data.val();
            scoresAr.push(val);
        });
        scoresAr=scoresAr.reverse();
        scoresAr.forEach(function(val){
          content +='<tr>';
          content += '<td class="name_column">' + val.UserName + '</td>';
          content += '<td>' + mask(val.TicketNumber) + '</td>';
          content += '<td class="score_column">' + val.Score + '</td>';
          content += '</tr>';
        });
        $('#LeaderboardH').append(content);
    }
});

if(localStorage.getItem("TicketNumber")!=null){
  ticketNumber= localStorage.getItem("TicketNumber");
  firebase.database().ref(`Hextris/${ticketNumber}`).once("value",snapshotHUser =>{
    if(snapshotHUser.exists()){
      var name_footer=snapshotHUser.child("UserName").val();
      var score_footer=snapshotHUser.child("Score").val();
      var content = '';
      content +='<tfoot>';
      content += '<td class="name_footer">' + name_footer + '</td>';
      content += '<td class="ticket_footer">' + ticketNumber + '</td>';
      content += '<td class="score_footer">' + score_footer + '</td>';
      content += '</tfoot>';

    }
    $('#LeaderboardH').append(content);
  });
    
}

var topTenPacMan=this.database.ref("/PacMan").orderByChild("Score").limitToLast(10);

topTenPacMan.once('value', function(snapshot){
    console.log("hello")
    if(snapshot.exists()){
      var content = '';
      let scoresAr=[];
      snapshot.forEach(function(data){
          var val = data.val();
          scoresAr.push(val);
      });
      scoresAr=scoresAr.reverse();
      scoresAr.forEach(function(val){
        content +='<tr>';
        content += '<td class="name_column">' + val.UserName + '</td>';
        content += '<td>' + mask(val.TicketNumber) + '</td>';
        content += '<td class="score_column">' + val.Score + '</td>';
        content += '</tr>';
      });
      $('#LeaderboardP').append(content);
  }
});  

if(localStorage.getItem("TicketNumber")!=null){
  ticketNumber= localStorage.getItem("TicketNumber");
  firebase.database().ref(`PacMan/${ticketNumber}`).once("value",snapshotPUser =>{
    if(snapshotPUser.exists()){
      var name_footer=snapshotPUser.child("UserName").val();
      var score_footer=snapshotPUser.child("Score").val();
      var content = '';
      content +='<tfoot>';
      content += '<td class="name_footer">' + name_footer + '</td>';
      content += '<td class="ticket_footer" >' + ticketNumber + '</td>';
      content += '<td class="score_footer">' + score_footer + '</td>';
      content += '</tfoot>';

    }
    $('#LeaderboardP').append(content);
  });
    
}

var topTen2048=this.database.ref("/TZFE").orderByChild("Score").limitToLast(10);

topTen2048.once('value', function(snapshot){
    console.log("hello")
    if(snapshot.exists()){
      var content = '';
      let scoresAr=[];
      snapshot.forEach(function(data){
          var val = data.val();
          scoresAr.push(val);
      });
      scoresAr=scoresAr.reverse();
      scoresAr.forEach(function(val){
        content +='<tr>';
        content += '<td class="name_column">' + val.UserName + '</td>';
        content += '<td>' + mask(val.TicketNumber) + '</td>';
        content += '<td class="score_column">' + val.Score + '</td>';
        content += '</tr>';
      });
      $('#LeaderboardT').append(content);
  }
});  

if(localStorage.getItem("TicketNumber")!=null){
  ticketNumber= localStorage.getItem("TicketNumber");
  firebase.database().ref(`TZFE/${ticketNumber}`).once("value",snapshotTUser =>{
    if(snapshotTUser.exists()){
      var name_footer=snapshotTUser.child("UserName").val();
      var score_footer=snapshotTUser.child("Score").val();
      var content = '';
      content +='<tfoot>';
      content += '<td class="name_footer">' + name_footer + '</td>';
      content += '<td class="ticket_footer">' + ticketNumber + '</td>';
      content += '<td class="score_footer">' + score_footer + '</td>';
      content += '</tfoot>';

    }
    $('#LeaderboardT').append(content);
  });
    
}

function mask(input){
  /*let firstPart=input.slice(0,4);*/
  let maskChar='*';
  let maskedPart=maskChar.repeat(4);
  let maskedInput=maskedPart+input.slice(input.length-4);
  return maskedInput;
}

var prevScoreinDB=0;

  function login(){
    gameName=localStorage.getItem("gameName");
    ticketNumber=document.getElementById("ticketNumber").value;  
    userName=document.getElementById("userName").value; 
    
    if(userName==""){      
      document.getElementById("error_text").innerHTML="Please Enter Your Name"  ;    
    }
    else{
      firebase.database().ref(`Tickets/${ticketNumber}/TicketNumber`).once("value", snapshot => {
      if (snapshot.exists()){
        firebase.database().ref(`Tickets/${ticketNumber}`).once("value",snapshotTickets =>{
          var user_status=snapshotTickets.child("Status").val();
       if(user_status!='Expired'){  
         if(user_status=='New'){   
         console.log("exists!");
         ticketRef.child(ticketNumber).set({
           TicketNumber: ticketNumber,
           UserName: userName,
           Status:'Started',
           RemainingTime:1200000
         });
         console.log("Hello");
         var endTime = new Date().getTime() + 1200000;
         localStorage.setItem("UserName",userName);
         localStorage.setItem("TicketNumber",ticketNumber);
         localStorage.setItem("EndTime",endTime);
        }
        else if(user_status='Started'){
          userName=snapshotTickets.child("UserName").val();
          var remaining_time=snapshotTickets.child("RemainingTime").val();
          console.log("Hello");
          var endTime = new Date().getTime() + remaining_time;
          localStorage.setItem("UserName",userName);
          localStorage.setItem("TicketNumber",ticketNumber);
          localStorage.setItem("EndTime",endTime);
        }
         document.getElementById("logout").style.visibility = "visible";
         if(gameName=='hextris')
         {


         firebase.database().ref(`Hextris/${ticketNumber}`).once("value", snapshotHextris => {
          if (snapshotHextris.exists())
          {
            prevScoreinDB=snapshotHextris.child("Score").val();
            //prevScoreinDB=555;
            var prevScoreArray="";
            prevScoreArray=prevScoreArray.concat("[",prevScoreinDB,"]");
            localStorage.setItem("highscores",prevScoreArray);
          } 
          else 
          {
            hextrisRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

         window.location="/hextris/index.html";
        }
        else if(gameName=='pacman')
        {


        firebase.database().ref(`PacMan/${ticketNumber}`).once("value", snapshotPacMan => {
         if (snapshotPacMan.exists())
         {
           var prevScoreinDB=snapshotPacMan.child("Score").val();
           localStorage.setItem("previousHighScore",prevScoreinDB);
         } 
         else 
         {
           pacmanRef.child(ticketNumber).set({
           TicketNumber: ticketNumber,
           UserName: userName,
           Score : 0
         });
         }
        });

        window.location="/pacman-canvas-master/index.htm";
       } 
         else if(gameName=='2048')
        {

          firebase.database().ref(`TZFE/${ticketNumber}`).once("value", snapshot2048 => {
            if (snapshot2048.exists())
            {
              prevScoreinDB=snapshot2048.child("Score").val();
              localStorage.setItem("highestScore",prevScoreinDB);
            } 
            else 
            {
              twozerofoureightRef.child(ticketNumber).set({
              TicketNumber: ticketNumber,
              UserName: userName,
              Score : 0
            });
            }
           });

          window.location="/2048-master/index.html";
        }    
         console.log(gameName);
        }
        else{
          document.getElementById("error_text").innerHTML="Expired Ticket";
        }});
      }
      else{
        document.getElementById("error_text").innerHTML="Invalid Ticket";
      }
   });

    }
    }
function openForm(game) 
{
  distance = endDate - now;
  ticketNumber=localStorage.getItem('TicketNumber');
  firebase.database().ref(`Tickets/${ticketNumber}/TicketNumber`).once("value", snapshot => 
  {
    if (snapshot.exists() && distance > 0)
    {      
      localStorage.setItem("gameName",game);

      if(game=='hextris')
      {
        firebase.database().ref(`Hextris/${ticketNumber}`).once("value", snapshotHextris => {
          if (snapshotHextris.exists())
          {
            prevScoreinDB=snapshotHextris.child("Score").val();
            //prevScoreinDB=555;
            var prevScoreArray="";
            prevScoreArray=prevScoreArray.concat("[",prevScoreinDB,"]");
            localStorage.setItem("highscores",prevScoreArray);
          } 
          else 
          {
            hextrisRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

        window.location="/hextris/index.html";
      }
      else if(game=='pacman')
      {
        firebase.database().ref(`PacMan/${ticketNumber}`).once("value", snapshotPacMan => {

					if (snapshotPacMan.exists())
					{
					  prevScoreinDB=snapshotPacMan.child("Score").val();
            localStorage.setItem("previousHighScore",prevScoreinDB);
          } 
          else 
          {
            pacmanRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

        window.location="/pacman-canvas-master/index.htm";
      }   
      else if(game=='2048')
      {
        firebase.database().ref(`TZFE/${ticketNumber}`).once("value", snapshot2048 => {
          if (snapshot2048.exists())
          {
            prevScoreinDB=snapshot2048.child("Score").val();
            localStorage.setItem("highestScore",prevScoreinDB);
          } 
          else 
          {
            twozerofoureightRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score : 0
          });
          }
         });

        window.location="/2048-master/index.html";
       }
    }
    else
    {
      document.getElementById("myForm").style.display = "block";
      localStorage.setItem("gameName",game);
    };
  });
}
 
var now=0;

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/*function login(){
  gameName=localStorage.getItem("Game_Name");

  firebase.database().ref("/Tickets/").push({
    Ticket_Number:ticketCode,
    Name:name_of_user,
    Status:'Playing'
  });
  console.log("Hello");
  if(gameName='hextris'){
    window.location="/hextris/index.html";
  }
  else if(gameName='pacman'){
    window.location="faqs.html";
  };
  console.log(gameName);

}*/

// Set the date we're counting down to
var endDate = localStorage.getItem("EndTime");

// Update the count down every 1 second
var x = setInterval(function() 
{

  // Get today's date and time
  now = new Date().getTime();
    
  // Find the distance between now and the count down date
  distance = endDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) 
  {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    localTicketNumber=localStorage.getItem("TicketNumber");
    
    ticketRef.child(localTicketNumber).update({
      Status:'Expired',
      RemainingTime:0
    });
    localStorage.clear("TicketNumber");
    localStorage.clear("UserName");
  }
}, 1000);



function logout(){
  localTicketNumber=localStorage.getItem("TicketNumber");
    
    ticketRef.child(localTicketNumber).update({
      RemainingTime:distance
    });
  localStorage.clear("TicketNumber");
  localStorage.clear("UserName");
  document.getElementById("logout").style.visibility = "hidden";
  document.getElementById("timer").style.visibility = "hidden";
}
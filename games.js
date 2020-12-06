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

  /*function Hello(){
  firebase.database().ref("/Tickets").child("MGMTST08").update({    
      TicketNumber: 'MGMTST08',
      UserName: 'Test_User_8',
      Status:'Playing'
  });
  console.log("Hello");
}
Hello();*/
this.database = firebase.database();
ticketRef=this.database.ref('/Tickets');
hextrisRef=this.database.ref('/Hextris');
pacmanRef=this.database.ref('/PacMan');
twozerofoureightRef=this.database.ref('/2048');
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
          content += '<td>' + val.UserName + '</td>';
          content += '<td>' + val.TicketNumber + '</td>';
          content += '<td>' + val.Score + '</td>';
          content += '</tr>';
        });
        $('#LeaderboardH').append(content);
    }
});

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
        content += '<td>' + val.UserName + '</td>';
        content += '<td>' + val.TicketNumber + '</td>';
        content += '<td>' + val.Score + '</td>';
        content += '</tr>';
      });
      $('#LeaderboardP').append(content);
  }
});  
var topTen2048=this.database.ref("/2048").orderByChild("Score").limitToLast(10);

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
        content += '<td>' + val.UserName + '</td>';
        content += '<td>' + val.TicketNumber + '</td>';
        content += '<td>' + val.Score + '</td>';
        content += '</tr>';
      });
      $('#LeaderboardT').append(content);
  }
});  

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
         console.log("exists!");

         ticketRef.child(ticketNumber).set({
           TicketNumber: ticketNumber,
           UserName: userName,
           Status:'Playing'
         });
         console.log("Hello");
         localStorage.setItem("UserName",userName);
         localStorage.setItem("TicketNumber",ticketNumber);
         if(gameName=='hextris'){
           hextrisRef.child(ticketNumber).set({
             TicketNumber: ticketNumber,
             UserName: userName,
             Score:0
           });
           window.location="/hextris/index.html";
         }
         else if(gameName=='pacman'){
           pacmanRef.child(ticketNumber).set({
             TicketNumber: ticketNumber,
             UserName: userName,
             Score:0
           });
           window.location="/pacman-canvas-master/index.htm";
         }   
         else if(gameName=='2048'){
          twozerofoureightRef.child(ticketNumber).set({
            TicketNumber: ticketNumber,
            UserName: userName,
            Score:0
          });
          window.location="/2048-master/index.html";
        }    
         console.log(gameName);
      }
      else{
        document.getElementById("error_text").innerHTML="Invalid Ticket"
      }
   });

    }
    }
function openForm(game) {
  document.getElementById("myForm").style.display = "block";
  localStorage.setItem("gameName",game);
  console.log(game);
}

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
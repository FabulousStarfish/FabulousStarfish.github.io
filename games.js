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
  firebase.database().ref("/").child("2049").update({
    
      TicketNumber: 'Test_Number',
      UserName: 'Test_User',
      Status:'Playing',
    purpose:"Adding Ticket Code"
  });
  console.log("Hello");
}
Hello();*/
this.database = firebase.database();
ticketRef=this.database.ref('/Tickets');
hextrisRef=this.database.ref('/Hextris');
pacmanRef=this.database.ref('/PacMan');
twozerofoureightRef=this.database.ref('/2048');

  function login(){
    gameName=localStorage.getItem("gameName");
    ticketNumber=document.getElementById("ticketNumber").value;  
    userName=document.getElementById("userName").value; 

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
         console.log(gameName);
      }
      else{
        document.getElementById("error_text").innerHTML="Invalid Ticket"
      }
   });
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
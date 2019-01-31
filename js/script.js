var name;
var key;
var i = 1;
var messages = [];
var hostPPAP;
var joinPPAP;
var kullu;
var ayush;
var powerHost;
var angleHost;
var moveHost;
var weaponsHost;

var powerJoin;
var angleJoin;
var moveJoin;
var weaponJoin;

var emailHost="";
var emailJoin="";

var arrX = [];
var arrY = [];
var pos = -1;
var pos2 =6; 
var joinX=[],joinY=[];


var corX=[2051];
var corY=[2051];
var slope=[7];

var zx=0;
var lullu;
var xx=1850;

function signOut() {

  firebase.auth().signOut().then(function () {
    window.location = "index.html";
    // Sign-out successful.
  }).catch(function (error) {
    window.alert("Error :" + error);
    // An error happened.
  });

}

function login() {

  var email = document.getElementById("emailTextView").value;
  var password = document.getElementById("passwordTextView").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
    window.location = "home.html";
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
    // ...
  });
}

function signUp() {

  var email = document.getElementById("emailTextView").value;
  var password = document.getElementById("passwordTextView").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    window.location = "home.html";
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
    // ...
  });

}

function chat() {

  var x = document.getElementById("hello");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else if (x.style.display === "block") {
    x.style.display = "none";
  }
  check();
  var s = document.getElementById("chatLog");
  s.scrollTop = 10000;

}

function enter(event) {
  var x = event.which || event.keyCode;
  if (x == 13) {
    send();
    gl = 1;
    // document.getElementById("textMsg").value = "";
  }



}

function enter2(event) {
  var x = event.which || event.keyCode;
  if (x == 13)
    login();
}

function send() {

  if (name == "host") {
    firebase.database().ref(name).push().set(document.getElementById("textMsg").value);

  } else {
    firebase.database().ref(name).push().set(document.getElementById("textMsg").value);
  }
  // var ch =document.getElementById("textMsg").value;
  setTimeout(function () {
    document.getElementById("textMsg").value = ""
  }, 100);

  check();
  var s = document.getElementById("chatLog");
  s.scrollTop = 10000;

  // soundPlay(ch);





}

function soundPlay(ch) {
  switch (ch) {

    case "BI":
      sound("bi");
      break;

    case "CB":
      sound("cb");
      break;

    case "CM":
      sound("cm");
      break;

    case "GG":
      sound("gg");
      break;

    case "GS":
      sound("gs");
      break;

    case "LG":
      sound("lg");
      break;

    case "NN":
      sound("nn");
      break;

    case "WP":
      sound("wp");
      break;



    default:

  }
}

function sound(c) {
  var audio = document.getElementById(c);
  audio.play();
}

function singlePlay() {


  document.getElementById("game").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("startGame").style.display = "block";

  document.getElementById("player2ID").innerHTML="Computer";

  var user = firebase.auth().currentUser;
  var  email;
  
  if (user != null) {    
    email = user.email;   
  
  }   
 var single="";
  for(var i=0;i<email.length;i++){
    if(email[i]=='@')
    break;
    else
    {
      single+=email[i];
    }
    
  }
  var x = document.getElementById("player1ID");
  x.innerHTML=single;

  tarrainDraw(arrX,arrY);
  

}

function multiPlay() {

  document.getElementById("game").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("startGame").style.display = "block";

  document.getElementById("player1ID").innerHTML="";
  document.getElementById("player2ID").innerHTML="";

  tarrainDraw(arrX,arrY);



}

function host() {
  document.getElementById("chatButton").style.display = "block";
  document.getElementById("game").style.display = "none";

  document.getElementById("canvas").style.display = "block";
  document.getElementById("startGame").style.display = "block";

  name = "host";
  key = "pt22";

  playerName(name);

  tarrainHostData();

  tarrainDraw(arrX,arrY);

  firebase.database().ref("hostFirePress").set(1);
  firebase.database().ref("joinFirePress").set(0); 

  point(arrY[0],arrY[1],arrY[2],arrY[3],arrY[4],arrY[5],arrY[6],arrY[7]);

  
}

function join() {
  document.getElementById("chatButton").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("startGame").style.display = "block";

  name = "join";
  playerName(name);

  tarrainJoinData();

  setTimeout(function () {
   start();
  }, 3000);
}

function start(){

   tarrainDraw(joinX,joinY);
}







function check() {


  if (name == "host") {

    var f = firebase.database().ref("host");

    f.on("child_added", function (snapshot) {



      if (!messages.find(function (a) {
          return a == (snapshot.Ce.path.n)[1];
        })) {
        messages.push((snapshot.Ce.path.n)[1]);
        var t = document.createElement("div");
        t.className = "chat host";
        t.innerHTML = "<div class=\"userPhoto\"><img src=\"https://scontent.fjai2-1.fna.fbcdn.net/v/t1.0-9/26167280_915615495281041_7737913029814273901_n.jpg?_nc_cat=0&oh=ed41e80ba02f1bff0b042a755359d921&oe=5B532357\">  </div><p class=\"chatMsg\">" + snapshot.val() + "</p>";
        // var z = document.createElement("");

        // t.innerText = snapshot.val();
        document.getElementById("chatLog").appendChild(t);

        hostPPAP = snapshot.val();
        soundPlay(hostPPAP);





      }

    });
    document.getElementById("chatLog").scrollTo = document.getElementById("chatLog").style.height;

    checkJoin();



  } else {



    var f = firebase.database().ref("join");

    f.on("child_added", function (snapshot) {


      if (!messages.find(function (a) {
          return a == (snapshot.Ce.path.n)[1];
        })) {
        messages.push((snapshot.Ce.path.n)[1]);
        var t = document.createElement("div");
        t.className = "chat host";
        t.innerHTML = "<div class=\"userPhoto\"><img src=\"https://scontent.fjai2-1.fna.fbcdn.net/v/t1.0-0/p206x206/298704_111586658945472_1069776233_n.jpg?_nc_cat=0&oh=565ab6f5d1d3e600af764607899df1bf&oe=5B5C488A\">  </div><p class=\"chatMsg\">" + snapshot.val() + "</p>";
        // var z = document.createElement("");

        // t.innerText = snapshot.val();
        document.getElementById("chatLog").appendChild(t);

        joinPPAP = snapshot.val();
        soundPlay(joinPPAP);


      }

    });
    document.getElementById("chatLog").scrollTo = document.getElementById("chatLog").style.height;

    checkHost();


  }




}

function checkJoin() {


  var f = firebase.database().ref("join");

  f.on("child_added", function (snapshot) {


    if (!messages.find(function (a) {
        return a == (snapshot.Ce.path.n)[1];
      })) {
      messages.push((snapshot.Ce.path.n)[1]);
      var t = document.createElement("div");
      t.className = "chat join";
      t.innerHTML = "<div class=\"userPhoto\"><img src=\"https://scontent.fjai2-1.fna.fbcdn.net/v/t1.0-0/p206x206/298704_111586658945472_1069776233_n.jpg?_nc_cat=0&oh=565ab6f5d1d3e600af764607899df1bf&oe=5B5C488A\">  </div><p class=\"chatMsg\">" + snapshot.val() + "</p>";
      // var z = document.createElement("");

      // t.innerText = snapshot.val();
      document.getElementById("chatLog").appendChild(t);
      joinPPAP = snapshot.val();
      soundPlay(joinPPAP);







    }

  });
  document.getElementById("chatLog").scrollTo = document.getElementById("chatLog").style.height;

}

function checkHost() {



  var f = firebase.database().ref("host");

  f.on("child_added", function (snapshot) {



    if (!messages.find(function (a) {
        return a == (snapshot.Ce.path.n)[1];
      })) {
      messages.push((snapshot.Ce.path.n)[1]);
      var t = document.createElement("div");
      t.className = "chat join";
      t.innerHTML = "<div class=\"userPhoto\"><img src=\"https://scontent.fjai2-1.fna.fbcdn.net/v/t1.0-9/26167280_915615495281041_7737913029814273901_n.jpg?_nc_cat=0&oh=ed41e80ba02f1bff0b042a755359d921&oe=5B532357\">  </div><p class=\"chatMsg\">" + snapshot.val() + "</p>";
      // var z = document.createElement("");

      // t.innerText = snapshot.val();
      document.getElementById("chatLog").appendChild(t);

      hostPPAP = snapshot.val();
      soundPlay(hostPPAP);

    }

  });
  document.getElementById("chatLog").scrollTo = document.getElementById("chatLog").style.height;
}






//................................Canvas....................................................................

var stage;
var stage2;
var canvas;
var x;
var y;
var temp;
var context;


var t = 0;
var tankX;
var tankY;



function init() {
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = 820;
  stage = new createjs.Stage(canvas);

   context = canvas.getContext('2d');

  

  x = canvas.width;
  y = canvas.height;

  
  tarrainHost();

  checkFire();
  turnByFire();

  rectangle();
  rectangle2();

  


 
  
    


 
}


function bet(min, max) {
  return Math.random() * (max - min) + min;
}

function tarrainHost() {

  for (i = -50; i <= 2100; i += 300) {
    temp = bet(300, 700);
    arrX[t] = i;
    arrY[t++] = temp;
  }
  //linemaker(arrX[0], arrY[0], arrX[1], arrY[1]);

 

}

function tarrainDraw(hostX,hostY){

  // var context = canvas.getContext('2d');
  context.beginPath();

  context.moveTo(-50, y / 2 + 400);

  for (i = 0; i < t; i++) {


    context.lineTo(hostX[i], hostY[i]);
    context.lineWidth = 10;
    //context.graphics.beginStroke("assets/grass.jpg");
    context.strokeStyle = "#99ff4a";
  }
  context.lineTo(1853, y / 2 + 400)

  context.closePath();
  context.fillStyle = "#4b5c09";
  context.fill();
  context.stroke();
  
  
}




function linemaker(x1, y1, x2, y2) {
  var m = Math.random() * (x2 - x1) + x1;
  var l = m * (y2 - y1) / (x2 - x1) + (y1 * x2 - y2 * x1) / (x2 - x1);
  //window.alert(x1+" "+x2+" "+y1+" "+y2+" "+m+" "+l);
  tankX = m;
  tankY = l;
}

function rota(x1, y1, x2, y2) {
  return Math.atan((x1 - x2) / (y2 - y1));

}

function tarrainHostData(){

  firebase.database().ref("Tarrain-Host:X").set(arrX);
  firebase.database().ref("Tarrain-Host:Y").set(arrY);

}

function tarrainJoinData(){  

  var x = firebase.database().ref("Tarrain-Host:X");
  x.on("value", function (snapshot) {        
      joinX=snapshot.val();      
   
    });

    var  y= firebase.database().ref("Tarrain-Host:Y");
  y.on("value", function (snapshot) {        
      joinY=snapshot.val();   
      //window.alert(joinY[7]);   

    });        
}

//....................play buttons fucntions...........................


//..........................Power button....................

function powerUp(){

  var text = document.getElementById("powerText");
  var x=text.value;
  if(x>=0 && x<100)
  text.value++;



}

function powerDown(){
  var text = document.getElementById("powerText");
  var x=text.value;
  if(x>0 && x<=100)
  text.value--;

}

//.............................Angle buton.............................

function decAngle(){
  var text = document.getElementById("angleText");
  var x=text.value;
  if(x>0 && x<=360)
  text.value--;



}

function incAngle(){

  var text = document.getElementById("angleText");
  var x=text.value;
  if(x>=0 && x<360)
  text.value++;


}


//..............................................Fire button................

function fire(){ 

  if(name=="host"){  

    var hostFire=[]; 
    
    var e = document.getElementById("mySelect");
    var strUser = e.options[e.selectedIndex].value;
    weaponsHost = strUser;

    var pwr = document.getElementById("powerText").value;
    powerHost=pwr;

    var angl = document.getElementById("angleText").value;
    angleHost=angl;

    var mv=document.getElementById("moveNumber").value;
    moveHost=mv;   

    //window.alert("Weapon: "+weaponsHost + " Power: " + powerHost+" Angle: " + angleHost + " Move: "+ moveHost);
    
    // hostFire[0]=weaponsHost; 
    // hostFire[1]=angleHost;
    // hostFire[2]=powerHost;
    // firebase.database().ref(name+"Fire").set(hostFire);

    firebase.database().ref(name+"FireW").push(weaponsHost);
    firebase.database().ref(name+"FireA").push(angleHost);
    firebase.database().ref(name+"FireP").push(powerHost);
    firebase.database().ref(name+"Check").push("Fired");
    


  }
  else{  

    var joinFire=[];

    var e = document.getElementById("mySelect");
    var strUser = e.options[e.selectedIndex].value;
    weaponsJoin = strUser;

    var pwr = document.getElementById("powerText").value;
    powerJoin=pwr;

    var angl = document.getElementById("angleText").value;
    angleJoin=angl;

    var mv=document.getElementById("moveNumber");
    moveJoin=mv; 

    // joinFire[0]=weaponsJoin;
    // joinFire[1]=angleJoin;
    // joinFire[2]=powerJoin;
    // firebase.database().ref(name+"Fire").set(joinFire);  

     firebase.database().ref(name+"FireW").push(weaponsJoin);
    firebase.database().ref(name+"FireA").push(angleJoin);
    firebase.database().ref(name+"FireP").push(powerJoin);
    firebase.database().ref(name+"Check").push("Fired");
  }

 

         
    

    //firebase.database().ref(name+"FireM").push().set(moveHost);   

    
    
    
    

    //firebase.database().ref(name+"FireM").push().set(moveHost);
  
 


    // var f = firebase.database().ref("joinFire");
    // f.on("child_changed", function (snapshot) {
  
    //   window.alert("Join Fired");
  
  
    // });      

 

   
     
    checkFire();
 
  

  

}


//........................................................................

//.................................Player ID Funtion...........................................


function playerName(name){

 if(name=="host"){

  var user = firebase.auth().currentUser;
  var  email;
  
  if (user != null) {    
    email = user.email;   
  
  }   
 
  for(var i=0;i<email.length;i++){
    if(email[i]=='@')
    break;
    else
    {
      emailHost+=email[i];
    }
    
  }
  var x = document.getElementById("player1ID");
  x.innerHTML=emailHost;

  firebase.database().ref(name+"ID").set(emailHost);

  window.setInterval(function(){
    /// call your function here
  
  var f = firebase.database().ref("joinID");

  f.once('value').then(function(snapshot){

    var y = document.getElementById("player2ID");
    var a=snapshot.val();
    y.innerHTML=a;   

  });
}, 1000);



}



  

else{

  var user = firebase.auth().currentUser;
  var  email;
  
  if (user != null) {    
    email = user.email;   
  
  }   
 
  for(var i=0;i<email.length;i++){
    if(email[i]=='@')
    break;
    else
    {
      emailJoin+=email[i];
    }
    
  }
  var x = document.getElementById("player2ID");
  x.innerHTML=emailJoin;

  firebase.database().ref(name+"ID").set(emailJoin);


  window.setInterval(function(){
  var f = firebase.database().ref("hostID");

  f.once('value').then(function(snapshot){

    var y = document.getElementById("player1ID");
    var a=snapshot.val();
    y.innerHTML=a;   

  });
}, 1000);

 

  


}
}
//..................................................................................
  
function checkFire(){


  

    
    var hostA,hostW,hostP,hostC;

  var w = firebase.database().ref("hostFireW");
  w.on("child_added", function (snapshot) {         
      //document.getElementById("fireCheck").innerHTML="Host Fired Weapon: >"+snapshot.val();  
      hostW=snapshot.val();      
  });

  var a = firebase.database().ref("hostFireA");
  a.on("child_added", function (snapshot) {         
      //document.getElementById("fireCheck").innerHTML="Host Fired Angle:>"+snapshot.val();    
      hostA=snapshot.val();
  });

  var p = firebase.database().ref("hostFireP");
  p.on("child_added", function (snapshot) {         
      //document.getElementById("fireCheck").innerHTML="Host Fired Power: >"+snapshot.val();    
      hostP=snapshot.val();
  });

  var hostC = firebase.database().ref("hostCheck");
  hostC.on("child_added", function (snapshot) {         
      
    displayData();

  });

  function displayData(){
      if(name=="join"){
      //put your fucntion here to fire on Join as host host click fire button
   document.getElementById("fireCheck").innerHTML="Host Fired : Angle=>"+hostA+" Weapon="+hostW+" Power"+hostP; 
          // window.alert("Host Fired : Angle=>"+hostA+" Weapon="+hostW+" Power"+hostP)

      }

  }
  //...................................Join Fire.................................

  var joinA,joinW,joinP,joinC;

  var w1 = firebase.database().ref("joinFireW");
  w1.on("child_added", function (snapshot) {         
      //document.getElementById("fireCheck").innerHTML="Host Fired Weapon: >"+snapshot.val();  
      joinW=snapshot.val();      
  });

  var a1 = firebase.database().ref("joinFireA");
  a1.on("child_added", function (snapshot) {         
      //document.getElementById("fireCheck").innerHTML="Host Fired Angle:>"+snapshot.val();    
      joinA=snapshot.val();
  });

  var p1 = firebase.database().ref("joinFireP");
  p1.on("child_added", function (snapshot) {         
      //document.getElementById("fireCheck").innerHTML="Host Fired Power: >"+snapshot.val();    
      joinP=snapshot.val();
  });

  var joinC = firebase.database().ref("joinCheck");
  joinC.on("child_added", function (snapshot) {         
      
    displayData2();

  });

  function displayData2(){
      if(name=="host"){

    //put your fucntion here to fire on Host as join click fire button
   document.getElementById("fireCheck").innerHTML="Join Fired : Angle=>"+joinA+" Weapon"+joinW+" Power"+joinP; 

    // window.alert("Join Fired : Angle=>"+joinA+" Weapon"+joinW+" Power"+joinP);

  }
}

  

}




var hostFirePress,joinFirePress;
var hostFirePress2,joinFirePress2;

function turnByFire(){

  
  if(name=="host"){
    
    
                var x = firebase.database().ref("hostFirePress");
                  x.on("value", function (snapshot) {      
                      
                     hostFirePress=snapshot.val();
                  
                    });

                    var y = firebase.database().ref("joinFirePress");
                  y.on("value", function (snapshot) {      
                      
                     joinFirePress=snapshot.val();
                  
                    });

              if(hostFirePress==1){

                //fire();
                window.alert("Host Fired");             
                
                firebase.database().ref("hostFirePress").set(0);
                firebase.database().ref("joinFirePress").set(1);
                


                
              }
              else if(hostFirePress==0){
                window.alert("You cannot fire..!!...wait for the opponent(join)..!!");
              }
              


  }
  else if(name=="join") {


    var q = firebase.database().ref("hostFirePress");
    q.on("value", function (snapshot) {      
        
       hostFirePress2=snapshot.val();
     
      });

      var w = firebase.database().ref("joinFirePress");
    w.on("value", function (snapshot) {      
        
       joinFirePress2=snapshot.val();
    
      });

                        if(joinFirePress2==1){

                          //fire();
                          window.alert("Join Fired");             
                          
                          firebase.database().ref("hostFirePress").set(1);
                          firebase.database().ref("joinFirePress").set(0);
                          


                          
                        }
                        else if(joinFirePress2==0){
                          window.alert("You cannot fire..!!...wait for the opponent(host)..!!");
                        }



  }



}


   

var flag = true;
var flag2 = true;


function rectangle(){

   

      
  context.clearRect(0,0,canvas.width,canvas.height);
  tarrainDraw(arrX,arrY);
  //context.rotate(1);

  if(zx == 0 || zx == 150){

    pos = 0;
    console.log(-slope[pos])

  }else if( zx%300 == 250){
    console.log(pos);
    pos = pos+1;
    console.log(-slope[pos])

  }

context.save();

 if(slope[pos] > 0){
  context.translate(corX[zx]-75,corY[zx]);
    context.rotate(-slope[pos]);

 context.fillStyle = "red";

  context.fillRect(0,0,70,40);

    flag = true;
 }else{
  if(flag){
    context.translate(corX[zx],corY[zx]);

    flag = false;
  }else{
    context.translate(corX[zx],corY[zx]);
    flag = false;

  }
    context.rotate(Math.PI-slope[pos]);

 context.fillStyle = "red";

  context.fillRect(0,0,70,40);

}
 
 context.restore();

 zx+=1; 
 
 if(zx>1800){
  zx=0;
  pos = -1;
 }
 if(zx==150)
 clearInterval(lullu);


 if(zx==50 || zx==250 || zx==350 || zx==450 || zx==550){

  clearInterval(kullu);
 } 

 }
 




 function SlopeVAl(){

window.alert(slope[0]+" "+corY[0]+" "+corY[1]);


 }         
 
 
 

 lullu =setInterval(function(){

    rectangle();
    rectangle2();
    
}, 10);





 






function point(corY0,corY1,corY2,corY3,corY4,corY5,corY6,corY7)
{
 corX[0]=0;
 for(var i=1;i<2051;i++)
  corX[i]=i;
  //for line between point1 and point 2
  for(i=0;i<251;i++)
  corY[i]=corY0+((corY1-corY0)/300)*(corX[i]+50);
  slope[0]=(Math.atan((corY0-corY1)/300));
//for line between point2 and point 3
  for(i=251;i<551;i++)
  corY[i]=corY1+((corY2-corY1)/300)*(corX[i]-250);
  slope[1]=(Math.atan((corY1-corY2)/300));
//for line between point3 and point 4
for(i=551;i<851;i++)
corY[i]=corY2+((corY3-corY2)/300)*(corX[i]-550);
slope[2]=(Math.atan((corY2-corY3)/300));
//for line between point3 and point 4
for(i=851;i<1151;i++)
corY[i]=corY3+((corY4-corY3)/300)*(corX[i]-850);
slope[3]=(Math.atan((corY3-corY4)/300));
//for line between point4 and point 5
for(i=1151;i<1451;i++)
corY[i]=corY4+((corY5-corY4)/300)*(corX[i]-1150);
slope[4]=(Math.atan((corY4-corY5)/300));
//for line between point5 and point 6
for(i=1451;i<1751;i++)
corY[i]=corY5+((corY6-corY5)/300)*(corX[i]-1450);
slope[5]=(Math.atan((corY5-corY6)/300));
//for line between point6 and point 7
for(i=1751;i<2051;i++)
corY[i]=corY6+((corY7-corY6)/300)*(corX[i]-1750);
slope[6]=(Math.atan((corY6-corY7)/300));

}

var jk=0;
var slp=0;
function  recTank(){

    
  
    ball(corX[jk],corY[jk],slope[slp]);
    jk=jk+50;
  




}

function rectangleL(){

      
  context.clearRect(0,0,canvas.width,canvas.height);
  tarrainDraw(arrX,arrY);
  //context.rotate(1);

  if(zx == 0 || zx == 150){

    pos = 0;
    console.log(-slope[pos])

  }else if( zx%300 == 250){
    console.log(pos);
    pos = pos-1;
    console.log(-slope[pos])

  }

context.save();

 if(slope[pos] > 0){
  context.translate(corX[zx]-75,corY[zx]);
    context.rotate(-slope[pos]);

 context.fillStyle = "red";

  context.fillRect(0,0,70,40);

    flag = true;
 }else{
  if(flag){
    context.translate(corX[zx],corY[zx]);

    flag = false;
  }else{
    context.translate(corX[zx],corY[zx]);
    flag = false;

  }
    context.rotate(Math.PI-slope[pos]);

 context.fillStyle = "red";

  context.fillRect(0,0,70,40);

}
 
 context.restore();

 zx-=1; 
 
 if(zx>1800){
  zx=0;
  pos = -1;
 }
 if(zx==150)
 clearInterval(lullu);


 if(zx==80 || zx==250 || zx==350 || zx==450 || zx==550 ){

  clearInterval(ayush);
 } 

}

//.........................Tank 2...........................................

function rectangle2(){




  if(xx == 1850){

    pos2 = 6;
    console.log(-slope[pos2])

  }else if( xx%300 == 250){
    console.log(pos2);
    pos2 = pos2-1;
    console.log(-slope[pos2])

  }

context.save();

 if(slope[pos2] > 0){

  context.translate(corX[xx]-75,corY[xx]);
    context.rotate(-slope[pos2]);

    context.fillStyle = "yellow";
    context.fillRect(0,0,70,40);

    flag2 = true;
 }else{
  if(flag2){
    context.translate(corX[xx],corY[xx]);

    flag2 = false;
  }else{
    context.translate(corX[xx],corY[xx]);
    flag2 = false;

  }
    context.rotate(Math.PI-slope[pos2]);

 context.fillStyle = "yellow";

  context.fillRect(0,0,70,40);

}
 
 context.restore();

 xx-=1; 
 
 if(xx<4){
  xx=1850;
  pos2 = 6;
 }
 if(xx==150)
 clearInterval(lullu);


 if(xx==80 || xx==250 || xx==350 || xx==450 || xx==550 ){

  clearInterval(ayush);
 } 
}




//....................Move button....................................

function moveLeft() {

  var text = document.getElementById("moveNumber");  
  var x =text.value;
  if(x>0){
  text.value--;
  if(zx>80)
  { 
    ayush=setInterval(function(){
    rectangleL();
  }, 10);
}

}
}
  
  




function moveRight() {

  var text = document.getElementById("moveNumber");  
  var x =text.value;
  if(x>0){
  text.value--;

    
    kullu = setInterval(function(){  
    rectangle();
 }, 10);
}
 
}

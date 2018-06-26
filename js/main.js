 function overlay() {
     document.getElementById('myModal').style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 function closespan() {
     document.getElementById('myModal').style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == document.getElementById('myModal')) {
         document.getElementById('myModal').style.display = "none";
     }
 }

 function openNav() {
     var x = document.getElementById("myTopnav");
     if (x.className === "topnav") {
         x.className += " responsive";
         document.getElementsByClassName("responsive")[0].style.width = "250px";
     } else {
         x.className = "topnav";
     }
     //console.log(document.getElementsByClassName("responsive")[0])

 }

 /* Set the width of the side navigation to 0 */
 function closeNav() {
     var x = document.getElementById("myTopnav");
     if (x.className === "topnav") {
         x.className += " responsive";
         document.getElementsByClassName("responsive")[0].style.width = "0";
     } else {
         x.className = "topnav";
         document.getElementsByClassName("topnav")[0].style.width = "676px";

     }

 }
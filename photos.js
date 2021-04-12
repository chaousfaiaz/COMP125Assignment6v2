/*    JavaScript 6th Edition
 *    Chapter 11 - Assignment 6
 *    Chapter case

 *    Photo gallery
 *    Variables and functions
 *    Author: Julio Vinicius A. de Carvalho
 *    Date: April 1st, 2021

 *    Filename: photos.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var waitingTime;
var autoAdvance; // = setInterval(rightAdvance,waitingTime);
var currentFigureIndex = 0;
var jsonFile = {};

// Loads the JSOn file.
function loadJsonFile()
{
   var client = new XMLHttpRequest();
   client.open("GET", "imageList.json", true);
   client.send();
   client.onreadystatechange = function () {
      if (client.readyState == 4) {
         if(client.status === 200) { 
            jsonFile = JSON.parse(client.responseText);
            populateFigures(true);
        } else {
            alert('An error occurred during your request: ' +  client.status + ' ' + client.statusText);
        } 
      };
   };
}

/* add src values to img elements based on order specified in jsonFile */
function populateFigures(advance) {

   // If it is to move to left
   if (!advance && advance !== undefined)
   {
      currentFigureIndex -= 1;

      // If it get a negative index, decrease from the last object index.
      if(currentFigureIndex < 0)
      {
         currentFigureIndex = jsonFile.ImageList.length + currentFigureIndex;
      }
   }
   // if it's to move to right
   else 
   {
      // If the index is the last, reset the counter.
      if (currentFigureIndex === (jsonFile.ImageList.length - 1))
      {
         currentFigureIndex = 0 ;
      }
      else {
         // Just move foward. 
         currentFigureIndex++;
      }
   }
         
   // Gets the objetc in the current index and sets the image and the waitingTime.
   var currentFigure = jsonFile.ImageList[currentFigureIndex];
   document.getElementById("image").src = currentFigure.name;
   document.getElementById("imgName").innerText = currentFigure.name.substring(currentFigure.name.indexOf("/")+1);
   waitingTime = currentFigure.time;

   // Resets the setInterval.
   clearInterval(autoAdvance);
   autoAdvance = setInterval(rightAdvance,waitingTime);
}

/* Calls rightAdvance() function */
function rightArrow() {
   rightAdvance();
}

/* Shifts the image to the left. Used via setInterval and rightArrow */
function rightAdvance() {   
   populateFigures(true);
}

/* Shifts the image to right */
function leftArrow() {   
   populateFigures(false);
}

/* create event listeners for left arrow, right arrow, and center figure element */
function createEventListeners() {
   var leftarrow = document.getElementById("leftarrow");
   if (leftarrow.addEventListener) {
     leftarrow.addEventListener("click", leftArrow, false); 
   } else if (leftarrow.attachEvent)  {
     leftarrow.attachEvent("onclick", leftArrow);
   }

   var rightarrow = document.getElementById("rightarrow");
   if (rightarrow.addEventListener) {
     rightarrow.addEventListener("click", rightArrow, false); 
   } else if (rightarrow.attachEvent)  {
     rightarrow.attachEvent("onclick", rightArrow);
   }  
}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   loadJsonFile();
   
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}

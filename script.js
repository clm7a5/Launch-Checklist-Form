// Write your JavaScript code here!
const pilotName = document.getElementById('pilotName')
const coPilotName = document.getElementById('coPilotName')
const fuelLevel = document.getElementById('fuelLevel')
const cargoMass = document.getElementById('cargoMass')

window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let index = 0;
         //console.log(json[index].name);
         
         document.getElementById("missionTarget").innerHTML = `
         <h2><center>Mission Destination</center></h2>
         <ul>
         <li><center>Name: ${json[index].name}</center></li>
         <li><center>Diameter: ${json[index].diameter}</center></li>
         <li><center>Star: ${json[index].star}</center></li>
         <li><center>Distance: ${json[index].distance}</center></li>
         <li><center>Moons: ${json[index].moons}</center></li>
         </ul>
         <img src="${json[index].image}">`;
      });
   });

   let form = document.querySelector("form");
   
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");

      let coPilotName = document.querySelector("input[name=copilotName]");

      let fuelLevel = document.querySelector("input[name=fuelLevel]");

      let cargoMass = document.querySelector("input[name=cargoMass]");

      let fuelLevelAllowed = false;

      let cargoMassAllowed = false;
     
      let checked = false;
      //Alert section
      //All fields plus have to use preventDefault()
      if (pilotName.value === "" || coPilotName.value === "" || fuelLevel.value === "" || isNaN(fuelLevel.value) || cargoMass.value === "" || isNaN(cargoMass.value))  {
         alert("All fields are required");
         event.preventDefault();
         checked = false;
      //Pilot Name Field has to be string - can't just be NaN
      } else if (typeof String(pilotName.value) !== "string" || pilotName.value.length === 0) {
         alert("Pilot Name field is required");
         event.preventDefault();
         fieldCheck = false;      
   
      } else if (!isNaN(Number(pilotName.value)) && pilotName.value.length > 0) {
         alert("This is a field that must include at least one letter - Make sure to enter valid information for each field");
         event.preventDefault();
         checked = false;
         
      //Co-pilot Name Field has to be string - can't just be NaN
      } else if (typeof String(coPilotName.value) !== "string" || coPilotName.value.length === 0) {
         alert("Co-Pilot Name field is required");
         event.preventDefault();
         checked = false;
         
      } else if (!isNaN(Number(coPilotName.value)) && coPilotName.value.length > 0) {
         alert("This is a field that must include at least one letter - Make sure to enter valid information for each field");
         event.preventDefault();
         checked = false;
         document.getElementById("faultyItems").style.visibility = "hidden";

      //Fuel Level and Cargo Mass both have to be numbers
      } else if (typeof Number(fuelLevel.value) !== "number" || isNaN(Number(fuelLevel.value))) {
         alert("This is a number-only field - Make sure to enter valid informaiton for each field");
         event.preventDefault();
         checked = false;
         
      } else if (typeof Number(cargoMass.value) !== "number" || isNaN(Number(cargoMass.value))) {
         alert("This is a number-only field - Make sure to enter valid informaiton for each field");
         event.preventDefault();
         checked = false;
     
      } else {
         checked = true;
      }

      if (Number(fuelLevel.value) < 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";

         document.getElementById("fuelStatus").innerText = `There is not enough fuel for the journey.`

         document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch';
         
         document.getElementById('launchStatus').style.color= "#ff0000";
         
         event.preventDefault();
         
      } else {
         fuelLevelAllowed = true;
      }
      //Shuttle Requirement section
      if (Number(cargoMass.value) > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("cargoStatus").innerText = `There is too much mass for the shuttle to take off.`
         document.getElementById('launchStatus').innerText = 'Shuttle not ready for launch';
         document.getElementById('launchStatus').style.color= "#ff0000";
         cargoMassAllowed = false;
         event.preventDefault();

      } else {
         cargoMassAllowed = true;
      }

      if (fuelLevelAllowed && cargoMassAllowed && checked) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById('launchStatus').innerText = 'Shuttle is ready for launch';
         document.getElementById('launchStatus').style.color= "00ff00";
         event.preventDefault() 

      //Status of Launch
      document.getElementById('launchStatus').innerText = 'Awaiting Information Before Launch';

      document.getElementById("pilotStatus").innerText = `Pilot ${pilotName.value} is ready for launch`;

      document.getElementById("copilotStatus").innerText = `Co-pilot ${coPilotName.value} is ready for launch`;

      document.getElementById("fuelStatus").innerText = "Fuel Level high enough for launch";
      
      document.getElementById("cargoStatus").innerText = "Cargo Mass low enough for launch";

      }
   });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

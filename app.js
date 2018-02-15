window.addEventListener("load", initModal);

var findMeBtns=document.getElementsByClassName("findme");


for(var i=0;i<findMeBtns.length;i++){
  findMeBtns[i].addEventListener("click",getLocation);
}



var mainContainer=document.getElementsByClassName("mainContainer")[0];
var searchBar=document.getElementsByClassName("searchInput")[0];
searchBar.addEventListener("click",clearInputField);



function clearInputField(e){

  e.target.value="";
}//end of clearInputField



//////





function initModal(){


  var addBtn=document.getElementById("addBtn");
  var closeBtn=document.getElementById("closeBtn");
  var modalContainer= document.getElementById("modalContainer");
  var modalBox=  document.getElementsByClassName("modal")[0];
  var modalInput=document.getElementsByClassName("modalInput")[0];

  modalInput.addEventListener("click",clearInputField);

  window.addEventListener("click",modalActions);



  function pushModalIn(){
      modalBox.style.top="10%";
      addBtn.style.opacity=0.03;

  }



  function modalActions(e){

     var target=e.target;

     function action(target){

          if(target===addBtn){
              modalContainer.style.display="block";
              timeout= window.setTimeout(pushModalIn,1,true);
            }
          else if(target===closeBtn || target === modalContainer){
              modalContainer.style.display="none";
              modalBox.style.top="-500px";
              addBtn.style.opacity=1;


          }
     }

     action(target);



  }





}//end of Init modal

function getLocation(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

            } else {
                alert("Geolocation is not supported by this browser.");
            }

            function showPosition(position) {

              var lat=position.coords.latitude;
              var lon=position.coords.longitude;

              getWeather(lat,lon);

            }

      }

//async request to FCC  weather API based on lat-lon given by the user
function getWeather(lat,lon){

          var theUrl="https://fcc-weather-api.glitch.me/api/current?"+"lat="+lat+"&lon="+lon;  
          // var theUrl="http://api.openweathermap.org/data/2.5/forecast/daily?"+"lat="+lat+"&lon="+lon+"&cnt=7&appid=84a6ea6d73fe4881295e5ad1deb2bb66";
          // var theUrl="http://api.openweathermap.org/data/2.5/forecast?"+"lat="+lat+"&lon="+lon+"&units=metric&appid=84a6ea6d73fe4881295e5ad1deb2bb66";
          console.log(theUrl);


          var xhr = new XMLHttpRequest();

              xhr.open("GET", theUrl, true);

              xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {

                    var data=JSON.parse(xhr.responseText);
                    //
                    data.list=data.list.filter(function(item,index){
                      return  index%8===0;
                    });

                    console.log(data);


                    newCard(cardObj,data);

                    }
                   else {

                    console.error(xhr.statusText);
                  }
                }
              };

              xhr.onerror = function (e) {

                console.error(xhr.statusText);
              };

              xhr.send(null);


  }



  var cardObj={

    cardContainer: {
      quantity:1,
      className: "cardContainer",
      htmlElement: "div",


    },


    card:{
      quantity:1,
      className:"card",
      htmlElement:"article",

    },

    currentWeather:{
      quantity:1,
      className:"currentWeather",
      htmlElement:"div",

    },


    currentWeatherText:{
      quantity:6,
      className: ["cityName","date","temperature","minTemp","maxTemp","weatherDescription"],
      htmlElement:"p",

    },


    currentWeatherIcon:{
      quantity:1,
      className: "weatherIcon",
      htmlElement:"object",

    },

    weatherForecast:{
      quantity:1,
      className: "weatherForecast",
      htmlElement:"div",

    },

    weatherForecastDailyBox:{
      quantity:4,
      className: "weatherForecastDailyBox",
      htmlElement:"div",
    },

    weatherForecastDate:{
      quantity:4,
      className:"weatherForecastDate",
      htmlElement:"p",

    },

    weatherForecastIcon:{
      quantity:4,
      className:"weatherForecastIcon",
      htmlElement:"object",

    },
    weatherForecastMinTemp:{
      quantity:4,
      className:"weatherForecastMinTemp",
      htmlElement:"p",

    },

    weatherForecastMaxTemp:{
      quantity:4,
      className:"weatherForecastMaxTemp",
      htmlElement:"p",

    },

      cardFooter:{
          quantity:1,
          className: "cardFooter",
          htmlElement:"div",

        },

    moreInfoIcon:{

      quantity:1,
      className: "showMore",
      htmlElement:"div",

    },

    removeBtn:{
      quantity:1,
      className:"cardActions removeCardBtn",
      htmlElement:"button",

    }

  }


function newCard(obj,data){

    var modal = document.getElementById("modalContainer");
    var modalBox=  document.getElementsByClassName("modal")[0];

    if(modal.style.display="block"){
      modalBox.style.top="-500px";
      modal.style.display="none";

    }

  //hide add button and message on home
    var instructions=document.getElementsByClassName("instructions")[0];
    instructions.style.display="none";

    addBtn.style.opacity=1;




    for(var key in cardObj){

          if(cardObj.hasOwnProperty(key)){

                var quantity= cardObj[key].quantity;
                var htmlElement= cardObj[key].htmlElement;
                var className=cardObj[key].className;

              }

          createCardElements(htmlElement,quantity,className);

      }


  function createCardElements(htmlElement,quantity,className){
      for(var i=1;i<=quantity;i++){
        var elem=document.createElement(htmlElement);
        Array.isArray(className)? elem.className=className[i-1]:elem.className=className;

        if(elem.className==="cardContainer"){
          mainContainer.appendChild(elem);

        }else if(elem.className==="card"){
          lastElement("cardContainer",1).appendChild(elem);
        }
        else{
          lastElement("card",1).appendChild(elem);
        }

       }
    }





    assembleCards();

    function assembleCards(){

        lastElement("cardContainer",1).appendChild(lastElement("cardFooter",1));
        lastElement("cardFooter",1).appendChild(lastElement("showMore",1));
        lastElement("cardFooter",1).appendChild(lastElement("removeCardBtn",1));

        function appendElement(elem,parent){

          //
          if (parent==="weatherForecastDailyBox"){

              for(var i=0;i<lastElement("card",1).getElementsByClassName(parent).length;i++){

              // console.log("ciao");
              lastElement("card",1).getElementsByClassName(parent)[i].appendChild(lastElement("card",1).getElementsByClassName(elem)[i]);
            } //end of if for loop

          }//end of if
          else{
            for(var i=0;i<lastElement("card",1).getElementsByClassName(elem).length;i++){



                  lastElement(parent,1).appendChild(lastElement("card",1).getElementsByClassName(elem)[i]);


            }//end of else for loop
          }


        }


        appendElement("weatherForecastDailyBox","weatherForecast");
        appendElement("weatherForecastDate","weatherForecastDailyBox");
        appendElement("weatherForecastIcon","weatherForecastDailyBox");
        appendElement("weatherForecastMinTemp","weatherForecastDailyBox");
        appendElement("weatherForecastMaxTemp","weatherForecastDailyBox");
        appendElement("cityName","currentWeather");
        appendElement("date","currentWeather");
        appendElement("temperature","currentWeather");
        appendElement("minTemp","currentWeather");
        appendElement("maxTemp","currentWeather");
        appendElement("weatherDescription","currentWeather");
        appendElement("weatherIcon","currentWeather");




    }//end assemble cards



    populateElements();

    function populateElements(){


        var date=String(moment(data.list[0].dt_txt.substr(0,10))).substr(4,6);

        var propertyArray=[data.city.name,date,data.list[0].main.temp, data.list[0].main.temp_min, data.list[0].main.temp_max, data.list[0].weather[0].main];

        var currentWeatherElements=lastElement("currentWeather",1).children;



        function chooseIconFromID(el,index){

          var id=data.list[index].weather[0].id;

                    if(id >=200  && id <=232){

                      el.data="img/thunderstorm.svg";
                      el.type="image/svg+xml";
                    }
                    else if(id >=300  && id <=321){

                      el.data="img/drizzle.svg";
                      el.type="image/svg+xml";

                    }
                    else if(id >=500  && id <=531){

                      el.data="img/rain.svg";
                      el.type="image/svg+xml";

                    }
                    else if(id >=600  && id <=622){

                      el.data="img/snow.svg";
                      el.type="image/svg+xml";

                    }
                    else if(id >=701  && id <=781){

                      el.data="img/fog.svg";
                      el.type="image/svg+xml";

                    }
                    else if(id ==800){

                      el.data="img/sun.svg";
                      el.type="image/svg+xml";

                    }
                    else{

                      el.data="img/cloud.svg";
                      el.type="image/svg+xml";

                    }

        }//close fn

        for(var i=0;i<currentWeatherElements.length;i++){

                if(i===6){

                     chooseIconFromID(currentWeatherElements[i],0);

                }

                // var propertyArray=[data.name,data.main.temp,data.main.temp_min,data.main.temp_max,data.weather[0].main];


                else{

                  if(i==0){
                    currentWeatherElements[i].innerHTML=propertyArray[i]+ ", " + data.city.country;
                  }
                  else if(i==2 || i==3 || i==4){
                    if(document.getElementsByClassName("convertBtn")[0].classList.contains("celsiusOn")){

                      currentWeatherElements[i].innerHTML=Math.round(propertyArray[i])+"°C";

                    }

                    else{


                      currentWeatherElements[i].innerHTML=Math.round((((parseInt(propertyArray[i],10)*9)/5)+32))+"°F";



                    }


                    }

                      else {

                          currentWeatherElements[i].innerHTML= propertyArray[i];

                      }


                  }
            }//close for loop

            //

              lastElement("removeCardBtn",1).innerHTML="Delete";
              lastElement("removeCardBtn",1).addEventListener("click",removeCard);




        var weatherForecastElements=lastElement("weatherForecast",1).children;


        function assignContent(arr){



          for(var j=0;j<arr.length;j++){
            if(arr===lastElement("weatherForecast",1).getElementsByClassName("weatherForecastIcon")){

                chooseIconFromID(arr[j],j+1);


            }

            else if(arr===lastElement("weatherForecast",1).getElementsByClassName("weatherForecastDate")){

              arr[j].innerHTML=data.list[j+1].dt_txt;
              arr[j].innerHTML=String(moment(data.list[j+1].dt_txt.substr(0,10))).substr(0,10);

              // arr[j].innerHTML="day " + (j+1);



            }

            else{
              if(arr===lastElement("weatherForecast",1).getElementsByClassName("weatherForecastMinTemp")){
                // arr[j].innerHTML="min temp " + (j+1);

                if(document.getElementsByClassName("convertBtn")[0].classList.contains("celsiusOn")){
                  arr[j].innerHTML=Math.round(data.list[j+1].main.temp_min)+"°";

                }
                else{
                  arr[j].innerHTML=Math.round(((parseInt(data.list[j+1].main.temp_min)*9)/5)+32)+"°";
                }



              }
              else if(lastElement("weatherForecast",1).getElementsByClassName("weatherForecastMaxTemp")){
                // arr[j].innerHTML="max temp" + (j+1);
                if(document.getElementsByClassName("convertBtn")[0].classList.contains("celsiusOn")){
                  arr[j].innerHTML=Math.round(data.list[j+1].main.temp_max)+"°";

                }
                else{
                  arr[j].innerHTML=Math.round(((parseInt(data.list[j+1].main.temp_max)*9)/5)+32)+"°";
                }


              }
              // arr[j].innerHTML=data.list[j+1].main.temp_max;
            }

          }//end of for
        }//end of assignContent


        assignContent(lastElement("weatherForecast",1).getElementsByClassName("weatherForecastIcon"));
        assignContent(lastElement("weatherForecast",1).getElementsByClassName("weatherForecastDate"));
        assignContent(lastElement("weatherForecast",1).getElementsByClassName("weatherForecastMinTemp"));
        assignContent(lastElement("weatherForecast",1).getElementsByClassName("weatherForecastMaxTemp"));






    }


      // }/end of populateElements

      moveDateWithCityName();

      function moveDateWithCityName(){

        var dateContainer=document.createElement("div");
        dateContainer.className="dateContainer";

        lastElement("currentWeather",1).appendChild(dateContainer);

        lastElement("dateContainer",1).appendChild(lastElement("cityName",1));
        lastElement("dateContainer",1).appendChild(lastElement("date",1));

      }








      setCityNameHeight();



            waitSVGload();

            function waitSVGload(){

              lastElement("weatherIcon",1).addEventListener("load",getSubDocument);

              for(var i=0;i<lastElement("card",1).getElementsByClassName("weatherForecastIcon").length;i++){
                lastElement("card",1).getElementsByClassName("weatherForecastIcon")[i].addEventListener("load",getSubDocument);
              }

              lastElement("showMore",1).addEventListener("click",expandCardDiv);

            }



            // fetches the document for the given embedding_element
            	function getSubDocument(e,embedding_element){

                var weatherIcon=lastElement("weatherIcon",1);


                e=event.target;
                embedding_element=e;


                  var subdoc=embedding_element.contentDocument;
                  var subEl=subdoc.getElementById("Capa_1");
                  console.log(subEl);
                  subEl.setAttribute("fill","#4fc3f7");

              }//end of get Subdoc




                  function expandCardDiv(e){

                    console.log(e.currentTarget);
                    var parentCard=(e.currentTarget.parentNode).parentNode.getElementsByClassName("card")[0];
                    console.log(parentCard);



                    if(e.currentTarget.classList.contains("rotated")){
                      e.currentTarget.className="showMore";
                      parentCard.style.height="250px";
                      parentCard.getElementsByClassName("weatherForecast")[0].style.zIndex="-1";

                      // parentCard.getElementsByClassName("weatherForecast")[0].style.top="-30px";






                    }
                    else{
                      e.currentTarget.className+=" rotated";

                       var viewportWidth=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

                      if(viewportWidth<=400){

                        parentCard.style.height="400px";

                      }
                      else{
                        parentCard.style.height="500px";

                      }
                      parentCard.getElementsByClassName("weatherForecast")[0].style.zIndex="1";
                      // parentCard.getElementsByClassName("weatherForecast")[0].style.top="0";


                    }


                    //
                    // lastElement("card",1).style.height="auto";
                    // lastElement("weatherForecast",1).style.display="flex";

                      // lastElement("card",1).style.alignContent="flex-start";

                      // e.currentTarget.parentNode.style.transform="rotateX(180deg)";
                      // e.currentTarget.style.zIndex="2";



                  }//end of expandCardDiv








}



google.maps.event.addDomListener(window, 'load', formAutocomplete);


function formAutocomplete(){


    var input=[document.getElementsByClassName("modalInput")[0], document.getElementsByClassName("searchInput")[0]];
    var options={
      types:["geocode"]
    };

    var modalInput=new google.maps.places.Autocomplete(input[0],options);
    var searchBarInput=new google.maps.places.Autocomplete(input[1],options);

    initAutocompleteInputField(modalInput);
    initAutocompleteInputField(searchBarInput);


    function initAutocompleteInputField(inputField){

      google.maps.event.addListener(inputField, 'place_changed', function () {

      var place = inputField.getPlace();

      var lat=place.geometry.location.lat();
      var lon=place.geometry.location.lng();

         getWeather(lat,lon);
         // console.log(lat,lon);
      });

    }


    //prevent page from refreshing when enter is hitted and gt weather data
    document.getElementsByClassName('modalForm')[0].addEventListener('keypress', processUserText);
    document.getElementById('searchForm').addEventListener('keypress', processUserText);



    function processUserText(event){

      event = event || window.event;
      var elem = event.srcElement || event.target;

      if(event.keyCode == 13) {


          event.preventDefault();


        }
      }//end of processUserText



}//close formAutocomplete




function removeCard(event){

  var parentCard=(event.currentTarget.parentNode).parentNode;
  parentCard.remove();

  if(document.getElementsByClassName("instructions")[0].style.display==="none" && document.getElementsByClassName("card").length===0){
    document.getElementsByClassName("instructions")[0].style.display="block";

  }

}

document.getElementsByClassName("convertBtn")[0].addEventListener("click",convertDegrees);


function convertDegrees (){

   var convertBtn=document.getElementsByClassName("convertBtn")[0];
   var toggleSquare=document.getElementsByClassName("square")[0];
   var celsiusText=document.getElementsByClassName("celsiusText")[0];
   var farenheitText=document.getElementsByClassName("farenheitText")[0];
   var temperature=document.getElementsByClassName("temperature");
   var minTemp=document.getElementsByClassName("minTemp");
   var maxTemp=document.getElementsByClassName("maxTemp");
   var forecastMin=document.getElementsByClassName("weatherForecastMinTemp");
   var forecastMax=document.getElementsByClassName("weatherForecastMaxTemp");


   var tempArr=[temperature,minTemp,maxTemp,forecastMin,forecastMax];



   if(convertBtn.classList.contains("celsiusOn")){

      toggleSquare.className+=" farenheitOn";
      celsiusText.style.right="-20px";
      farenheitText.style.left="20px";

      convertBtn.classList.remove("celsiusOn");

      for(var i=0;i<tempArr.length;i++){
        for(var j=0;j<tempArr[i].length;j++){
            if(i==3 ||i==4){
              tempArr[i][j].innerHTML= Math.round((((parseInt(tempArr[i][j].innerHTML,10)*9)/5)+32))+"°";

            }
            else{
              tempArr[i][j].innerHTML= Math.round((((parseInt(tempArr[i][j].innerHTML,10)*9)/5)+32))+"°F";

            }

      }//end of for loop
    }


   }//end of if
   else{
     toggleSquare.classList.remove("farenheitOn");
     celsiusText.style.right="20px";
     farenheitText.style.left="-20px";
     convertBtn.className+=" celsiusOn";



           for(var i=0;i<tempArr.length;i++){
             for(var j=0;j<tempArr[i].length;j++){

                  if(i==3||i==4){
                    tempArr[i][j].innerHTML= Math.round((((parseInt(tempArr[i][j].innerHTML,10)-32)/9)*5))+"°";

                  }
                  else{
                    tempArr[i][j].innerHTML= Math.round((((parseInt(tempArr[i][j].innerHTML,10)-32)/9)*5))+"°C";

                  }


             }
           }//end of for loop
   }//end of outer  else



}//function convertDegrees

function lastElement(el,length){

   var lastEl= document.getElementsByClassName(el)[document.getElementsByClassName(el).length-length];
   return lastEl;
}


window.addEventListener("resize",setCityNameHeight);

function setCityNameHeight(){


    var previousName=lastElement("dateContainer",2);
    var currentName=lastElement("dateContainer",1);

    if(typeof previousName==="undefined"){
      // console.log("undefined");
    }
    else{

      var previousHeight=previousName.offsetHeight;
      var currentNameHeight=currentName.offsetHeight;

      // console.log(previousHeight,currentNameHeight);

      if(currentNameHeight>previousHeight){
            var i=0;
            var length= document.getElementsByClassName("dateContainer").length;
            for(i;i<length-1;i++){

                  document.getElementsByClassName("dateContainer")[i].style.height=currentNameHeight+"px";


            }//end of for loop
      }
      else if(currentNameHeight<previousHeight){

        currentNameHeight=previousHeight;

        currentName.style.height=previousHeight +"px";

      }

      //se quello di dopo è maggiore, allora aggiorna tutti i precedenti
      //se quello di dopo e minore alllora aggiorna quello di dopo
    }//end of main else statement


}//end of setCardHeight


//
// google-chrome --enable-web-security --user-data-dir
// google-chrome --disable-web-security --user-data-dir

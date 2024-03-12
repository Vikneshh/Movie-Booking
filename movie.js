const container=document.getElementById("screenContainer");
const seats=document.querySelectorAll(".row .seat:not(.occupied)");
const count=document.getElementById("count");
const total=document.getElementById("total");
const movieSelect=document.getElementById("movie");
const button=document.getElementById("button")

//For the local storage purpose

populateUI();

//Getting the value of price and as it is a string we are converting them to a number by the parseint functions.
let ticketPrice=parseInt(movieSelect.value);


//Saving selected movie index and the price
function setMovieData(movieIndex,moviePrice){
localStorage.setItem("selectedMovieIndex",movieIndex)
localStorage.setItem("selectedMoviePrice",moviePrice)

}


//creating a function to store the count of selected seats to project the prices.

function updateCount(){
    const selectedSeats=document.querySelectorAll(".row .seat.available");

//copy the selected seats into an array
//map through the array
//return a newly created array of indexes

 const seatsIndex=[...selectedSeats].map((seat)=>{
    return [...seats].indexOf(seat);
 });
//Storing the selected seats in the local storage for retrieval purpose
//wrapping in json stringify bcoz we are actually passing an array so we are converting them to a string

localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));

    const selectedSeatsCount=selectedSeats.length;

    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
    console.log(ticketPrice)
}


//Get datas from localstorage and populate it in the UI

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats!==null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("available");
            }
        })
    }

    //now we are doing it for the count and ticket price

     const selectedMovieIndex=localStorage.getItem("selectedMovieIndex");
     if(selectedMovieIndex!==null){
        movieSelect.selectedIndex=selectedMovieIndex;
     }
}


//Clickevent for the  movie.This will upadte the ticket price count whenever we change the movie in the movie selector.

movieSelect.addEventListener("change",(e)=>{
        ticketPrice=parseInt(e.target.value);
        setMovieData(e.target.selectedIndex,e.target.value)
        updateCount();
})


//clickevent for seats
container.addEventListener("click",(e)=>{
   if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied"))
   {
    e.target.classList.toggle("available");
   
    updateCount();
   }
})

//initial count and total set
updateCount();

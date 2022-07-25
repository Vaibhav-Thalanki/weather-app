console.log("client side");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
document.addEventListener("submit",(event)=>{
    document.querySelector("p#msg").textContent ="Loading...";
    event.preventDefault();
    const location = searchLocation.value;
    fetch('/?location='+location).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error)
        document.querySelector("p#msg").textContent = data.error;
        else{
            document.querySelector("p#msg").textContent = data.forecast;
            let html = ""
            for(let i =0;i<data.pictures.length;i++){
                html+="<img src='"+data.pictures[i]+"' class='weather-icons'><br>"
            }
            document.querySelector("div#pics").innerHTML = html;
        }
    });
});
});
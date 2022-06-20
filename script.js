
const wrapper=document.querySelector('.wrapper'),
inputpart=wrapper.querySelector('.input-part'),
infoTxt=inputpart.querySelector('.info-txt'),
inputField=inputpart.querySelector('input'),

locationbtn=inputpart.querySelector('button'),
icon=document.querySelector('.weather-part img'),
back=document.querySelector('header i');
let api;
locationbtn.addEventListener('click',e=>{

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onSucess,onError);
    }
    else {
  alert("Your browers dosen't support geolocation API");
    }
})

function onError(error){console.error();}

function onSucess(position){ 

    const {latitude,longitude}=position.coords;

    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4fcb5a0d0898100e787e4a2712440c02`;

    fetchdata();
}

inputField.addEventListener('keyup',e=>{

    if(e.key== "Enter"&& inputField.value!="")
    {requestapi(inputField.value);}
})


function requestapi(city)
{
   api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4fcb5a0d0898100e787e4a2712440c02`;
  fetchdata();


}

function fetchdata()
{
    infoTxt.classList.add('pending');
    infoTxt.innerHTML="getting details";
    
   
     fetch(api).then(response=>response.json().then(result=>weatherdetails(result)));
}
function weatherdetails(info)
{
    infoTxt.classList.replace('pending','error');
    
    if(info.cod=="404")
    {
        infoTxt.innerHTML=`${inputField.value} is not a valid ciy`;

    }
    else {

        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like,humidity,temp}=info.main;

        if(id==800)
        {
            icon.src="sun.svg";
        }

        else if(id>=200 && id<=232) icon.src="storm.svg";

        else if(id>=600 && id<=622) icon.src="snow.svg";

        else if(id>=701 && id<=781) icon.src="haze.svg";

        else if(id>=801 && id<=804) icon.src="cloud.svg";

        
        else if((id>=300 && id<=321)||(id>500 && id<=531) )icon.src="rain.svg";

        wrapper.querySelector('.temp .numb').innerHTML=Math.floor(temp);
        wrapper.querySelector('.weather').innerHTML=description;
        wrapper.querySelector('.location span').innerHTML=`${city},${country}`;
        wrapper.querySelector('.temp .numb-2').innerHTML=Math.floor(feels_like);
        wrapper.querySelector('.humidity span').innerHTML=`${humidity}%`;

        infoTxt.classList.remove('pending','error');
        wrapper.classList.add('active');
    }
    
    
}

back.addEventListener('click',e=>{
  document.getElementById('in').value="";
    wrapper.classList.remove('active');
})
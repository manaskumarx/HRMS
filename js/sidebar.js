const menuButton=document.getElementById("menuToggle");

const sidebar=document.querySelector(".sidebar");

const overlay=document.getElementById("sidebarOverlay");


if(menuButton && sidebar && overlay){


menuButton.addEventListener("click",()=>{


sidebar.classList.toggle("active");

overlay.classList.toggle("active");


});


overlay.addEventListener("click",()=>{


sidebar.classList.remove("active");

overlay.classList.remove("active");


});



document.querySelectorAll(".sidebar a").forEach(link=>{


link.addEventListener("click",()=>{


if(window.innerWidth < 992){


sidebar.classList.remove("active");

overlay.classList.remove("active");


}


});


});


}

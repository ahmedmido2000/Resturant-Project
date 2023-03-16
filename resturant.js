let header =document.querySelector("header")
let images=["./images/1.webp","./images/2.jpeg","./images/3.webp","./images/4.jpg"]
let i=0
let yes = document.querySelector(".yes")
let no = document.querySelector(".no")
let backgroundContainer=document.querySelector(".background-container")
let imagesArray=Array.from(document.querySelectorAll(".background-container img"))

let colors=Array.from(document.querySelectorAll(".color ul li"))


function changeColor(){
    if(localStorage.getItem("color" )!== null){
        document.documentElement.style.setProperty("--main-color",localStorage.getItem("color" ))
        colors.forEach(function(li){
            li.classList.remove("active")
            if(li.getAttribute("color")===localStorage.getItem("color" )){
                li.classList.add("active")
            }
        })
    }
}
changeColor()



colors.forEach(function(color){
    color.addEventListener("click",function(e){
        document.documentElement.style.setProperty("--main-color",e.target.getAttribute("color"))
        localStorage.setItem("color",e.target.getAttribute("color"))
        changeColor()
    })
})

 function back(){
    if(localStorage.getItem("x") && localStorage.getItem("no")){
        let y=localStorage.getItem("x")
        header.style.backgroundImage="url('"+images[y]+"')"
        yes.classList.remove("active")
        no.classList.add("active")
        console.log(y);
    }
}
back()
imagesArray.forEach(img => {
    img.addEventListener("click" , (e)=>{
        let y=e.target.getAttribute("num")
        localStorage.setItem("x",y)
        let z=localStorage.getItem("x")
        header.style.backgroundImage="url('"+images[z]+"')"
    })
});


function changeBGColor(){
    if(yes.classList.contains("active")){
        header.style.backgroundImage="url('"+images[i]+"')"
        backgroundContainer.style.display="none"

        i++
        if(i===4){
            i=0
        }
        setTimeout(function() {
            changeBGColor()
        }, 3000);
    }
    if(no.classList.contains("active")){
        backgroundContainer.style.display="block"
        localStorage.setItem("no","active")
    }
  
}
changeBGColor()


let settings=document.querySelector(".settings")
let settingsIcon=document.querySelector(".fa-gear")
settingsIcon.onclick=function(){
        settings.classList.toggle("open")
        settingsIcon.classList.toggle("fa-spin")
}




yes.onclick=function(){
    no.classList.remove("active")
    yes.classList.add("active")
    changeBGColor()
    localStorage.clear()
}
no.onclick=function(){
    yes.classList.remove("active")
    no.classList.add("active")
}


document.querySelector(".overlay").remove()
let gallery=document.querySelectorAll(".gallery .container img")
gallery.forEach((img)=> {
    img.addEventListener("click",(e)=>{
        let overlay=document.createElement("div")
        overlay.classList.add("overlay")
        document.body.appendChild(overlay) 
        let imageContainer =document.createElement("div")
        imageContainer.classList.add("myDiv")
        let head = document.createElement("h2")
        let myhead=document.createTextNode(img.getAttribute("alt"))
        head.appendChild(myhead)
        imageContainer.appendChild(head)
        let image =document.createElement("img")
        imageContainer.appendChild(image) 
        image.src=img.src
        let span =document.createElement("span")
        let close =document.createTextNode("x")
        span.classList.add("close")
        span.appendChild(close)
        imageContainer.appendChild(span)
        document.body.appendChild(imageContainer) 
    })
});
document.addEventListener("click",function(e){
    if(e.target.classList.contains("close")){
        document.querySelector(".overlay").remove()
        document.querySelector(".myDiv").remove()
    }

})
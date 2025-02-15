// https://www.p5js.org
// this code comes from this tutorial
// command(osx)console(win) / is the comment command in any language

var schmoDiv = document.getElementById("schmo malony");
// schmoDiv.hidden = true;
if(schmoDiv === null){
    //do something!
}
console.log(schmoDiv);

// ----------------------------------------------||
// https://www.w3schools.com/tutorial/onclicked
// ----------------------------------------------||

function ourDivWasClicked(){
    if(schmoDiv.innerHTML === "Yoohoo!"){
        schmoDiv.innerHTML = "WoopWoop!";
    }else{
        schmoDiv.innerHTML = "Yoohoo!";
    }
}

schmoDiv.onclick = ourDivWasClicked;
// end tutorial code
// ----------------------------------------------||
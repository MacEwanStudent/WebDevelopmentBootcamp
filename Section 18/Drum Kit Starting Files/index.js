document.addEventListener("keydown", handleEvent)
const buttons = document.querySelectorAll(".drum");

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        // Identify which button was clicked
        const clickedButton = event.target; // The button element that was clicked
        const className = clickedButton.className;

        console.log(`You clicked: ${clickedButton.id}`);
        playSound(className[0])
        // Perform actions based on the clicked button
        
    });
});

function handleEvent(event){
    const keyUserInput = event.key;
    console.log(`${keyUserInput}`);
    playSound(keyUserInput);
}

function playSound(sound_choice){
    buttonAnimation(sound_choice);
    switch (sound_choice) {
        case "w":
            var audio= new Audio('./sounds/crash.mp3');
            audio.play();
            break;
        case "a":
            var audio= new Audio('./sounds/kick-bass.mp3');
            audio.play();
            break;
        case "s":
            var audio= new Audio('./sounds/snare.mp3');
            audio.play();
        case "d":
            var audio= new Audio('./sounds/tom-1.mp3');
            audio.play();
            break;
        case "j":
            var audio= new Audio('./sounds/tom-2.mp3');
            audio.play();
            break;
        case "k":
            var audio= new Audio('./sounds/tom-3.mp3');
            audio.play();
            break;
        case "l":
            var audio= new Audio('./sounds/tom-4.mp3');
            audio.play();
            break;
        default:
            console.log("Unknown button clicked");
    }
}

function buttonAnimation(currentKey){

    var delayInMilliseconds = 100; //1 second
    var activeButton = document.querySelector("."+ currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed")
    }, delayInMilliseconds);
    
}
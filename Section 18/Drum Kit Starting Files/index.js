const buttons = document.querySelectorAll(".drum");

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        // Identify which button was clicked
        const clickedButton = event.target; // The button element that was clicked
        const className = clickedButton.className;
        console.log(`You clicked: ${clickedButton.id}`);

        // Perform actions based on the clicked button
        switch (className) {
            case "w drum":
                var audio= new Audio('./sounds/crash.mp3');
                audio.play();
                break;
            case "a drum":
                var audio= new Audio('./sounds/kick-bass.mp3');
                audio.play();
                break;
            case "s drum":
                var audio= new Audio('./sounds/snare.mp3');
                audio.play();
            case "d drum":
                var audio= new Audio('./sounds/tom-1.mp3');
                audio.play();
                break;
            case "j drum":
                var audio= new Audio('./sounds/tom-2.mp3');
                audio.play();
                break;
            case "k drum":
                var audio= new Audio('./sounds/tom-3.mp3');
                audio.play();
                break;
            case "l drum":
                var audio= new Audio('./sounds/tom-4.mp3');
                audio.play();
                break;
            default:
                console.log("Unknown button clicked");
        }
    });
});


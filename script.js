const shi = document.getElementById('shi');
const fu = document.getElementById('fu');
const mi = document.getElementById('mi');
const player = document.getElementById('player');
const ia = document.getElementById('ia');
const command = document.getElementById('command');
const scorePlayer = document.getElementById('score-player');
const scoreIa = document.getElementById('score-ia');
const score = document.querySelector('.score');
const restart = document.getElementById('restart');

shi.addEventListener('click', () => play('shi'));

fu.addEventListener('click', () => play('fu'));

mi.addEventListener('click', () => play('mi'));

// Pour le reste, a vous de jouer
function play(userChoice)
{
    ia.classList.remove('translate-right');
    player.classList.remove('translate-left');

    reset_animation();

    console.log(userChoice)
    const choices = ["shi", "fu", "mi"];

    const randomIndex = Math.floor(Math.random() * choices.length);
    const iaChoice = choices[randomIndex];
    console.log(iaChoice);

    ia.src = "img/"+iaChoice+".png";
    ia.classList.add("translate-right");

    player.src = "img/"+userChoice+".png";
    player.classList.add("translate-left");

    let currentPlayerScore = parseInt(scorePlayer.textContent);
    let currentIaScore = parseInt(scoreIa.textContent);

    if((userChoice == 'shi' && iaChoice == 'fu') 
        || ( userChoice == 'fu' && iaChoice == 'mi')
        || ( userChoice == 'mi' && iaChoice == 'shi')
    ) {
        console.log('j\'ai gagné :)');
        currentPlayerScore++;
    } else if ((userChoice == 'shi' && iaChoice == 'mi')
        ||(userChoice == 'fu' && iaChoice == 'shi')
        || (userChoice == 'mi' && iaChoice == 'fu')
    ) {
        currentIaScore++;
    } else {
        console.log('égalité :|');
        currentIaScore++;
        currentPlayerScore++;
    }

    scorePlayer.textContent = currentPlayerScore;
    scoreIa.textContent = currentIaScore;

    if(currentIaScore == 3 || currentPlayerScore == 3) {

        command.classList.add('hidden');

        const messageElt = document.createElement('h3');
        if(currentPlayerScore == currentIaScore) 
        {
            messageElt.textContent = "Match Nul !";
        } else if (currentPlayerScore > currentIaScore) {
            messageElt.textContent = "Vous avez gagné !";
        } else {
            messageElt.textContent = "Vous avez perdu !";
        }
        score.insertAdjacentElement('afterend',messageElt);

        restart.classList.remove('hidden');

        restart.addEventListener('click', () => {
            restart.classList.add('hidden');
            command.classList.remove('hidden');
            scoreIa.textContent = 0;
            scorePlayer.textContent = 0;
            messageElt.remove();
        }, {once: true});
    }
}

function reset_animation()
{
    ia.style.animation = 'none';
    ia.offsetHeight; /* trigger reflow */
    ia.style.animation = null; 
    player.style.animation = 'none';
    player.offsetHeight; /* trigger reflow */
    player.style.animation = null;
}
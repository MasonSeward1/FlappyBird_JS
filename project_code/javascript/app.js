document.addEventListener('DOMContentLoaded', () => 
{
    const audio = document.getElementById("flap");
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const gravity = 2
    const gap = 430
    const gameTimerID = setInterval(configureStart, 20)

    let birdLeft = 220
    let birdBottom = 250
    let isGameOver = false
    let score = -1

    document.addEventListener('keyup', handleKeyInput)
    generateObstacles()

    function configureStart() 
    {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    function handleKeyInput(e) 
    {
        if (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 87)
        {
            jump()
            audio.play();
        }
    }
    
    function jump() 
    {
        if (birdBottom <  500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    
    function generateObstacles()
    {
        const obstacleBottom = Math.random() * 60
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        let obstacleLeft = 500
        let timerId = setInterval(moveObstacle, 20)

        if (!isGameOver) 
        {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
            score += 1;
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle()
        {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60)
            {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) || 
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }

        if (!isGameOver) setTimeout(generateObstacles, 3000)
    }

    function gameOver()
    {
        clearInterval(gameTimerID)
        isGameOver = true
        document.removeEventListener('keyup', handleKeyInput)
        console.log('game over')
        window.alert(`Your score was: ${score}`);
    }
})
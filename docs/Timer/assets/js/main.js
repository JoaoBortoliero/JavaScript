function clock() {
    function getTimeFromSeconds(seconds) {
        const date = new Date(seconds * 1000);
        return date.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        });
    }

    const clock = document.querySelector('.clock');
    let seconds = 0;
    let timer;
    
    function startTimer() {
        timer = setInterval(function () {
            seconds++;
            clock.innerHTML = getTimeFromSeconds(seconds)
        }, 1000);
    }
        
    document.addEventListener('click', function(e) {
    const element = e.target;
        
        if (element.classList.contains('start')) {
            clock.classList.remove('paused');
            clearInterval(timer);
            startTimer();        
        }
        
        if (element.classList.contains('pause')) {
            clearInterval(timer);      
        }
        
        if (element.classList.contains('reset')) {
            clock.classList.remove('paused');
            clearInterval(timer);
            clock.innerHTML = '00:00:00';
            seconds = 0;        
        }
    });
}
clock();



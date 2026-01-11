let [milliseconds, seconds, minutes, hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int;

let isStarted = false;
let isPaused = false;
let isReset = false;

document.getElementById('startBtn').addEventListener('click', ()=>{
    int = setInterval(displayTimer,10);;
    startBtn.disabled = true;
});

document.getElementById('pauseBtn').addEventListener('click', ()=>{
    startBtn.disabled = false;
    clearInterval(int);
});

document.getElementById('resetBtn').addEventListener('click', ()=>{
    startBtn.disabled = false;
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0,0,0,0];
    timerRef.innerHTML = '00 : 00 : 00 : 000'
});

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes< 10 ? "0" + minutes : minutes;
    let s = seconds< 10 ? "0" + seconds : seconds;
    let ms = milliseconds< 10 ? "00" + milliseconds : milliseconds;
    milliseconds < 100 ? "0" + milliseconds:milliseconds
    
    timerRef.innerHTML = `${h}: ${m}: ${s}: ${ms}`;
}


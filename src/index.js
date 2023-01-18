require('./style.css');


const container = document.querySelector('#d-day-container');
const messageContainer = document.querySelector('#d-day-message');
const savedDate = localStorage.getItem('saved-date')

const intervalIdArr = []

const dateFormMaker = function () {
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`
    return dateFormat;
}

const counterMaker = function (data) {
    if (data !== savedDate) {
        localStorage.setItem('saved-date', data)
    }
    const nowDate = new Date();
    const targetDate = new Date(data).setHours(0, 0, 0, 0);
    const remaining = (targetDate - nowDate) / 1000;

    if (remaining === 0 || remaining < 0) {
        container.style.display = 'none'

        messageContainer.style.display = 'flex';
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
        setClearInterval();
        return;
    } else if (isNaN(remaining)) {
        container.style.display = 'none'
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval();

        return;
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 60,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    }
    const format = function (time) {
        if (time < 10) {
            return '0' + time;
        } else {
            return time
        }
    }

    const documentArr = ['days', 'hours', 'min', 'sec']
    const timeKeys = Object.keys(remainingObj);

    let i = 0;
    for (let tag of documentArr) {
        const remainingTime = format(remainingObj[timeKeys[i]]);
        document.getElementById(tag).textContent = remainingTime;
        i++
    }
}

const starter = function (targetDateInput) {
    console.log(targetDateInput)
    if (!targetDateInput) {
        targetDateInput = dateFormMaker()
    }
    dateFormMaker();
    localStorage.setItem('saved-date', targetDateInput)
    const savedDate = localStorage.getItem('saved-date')
    container.style.display = 'flex'
    messageContainer.style.display = 'none'
    setClearInterval();
    counterMaker(targetDateInput)
    const intervalId = setInterval(() => { counterMaker(targetDateInput) }, 1000);
    intervalIdArr.push(intervalId)
}

const setClearInterval = function () {
    localStorage.removeItem('saved-date')
    for (let i = 0; i < intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i])
    }

}

const resetTimer = function () {
    container.style.display = 'none'
    messageContainer.innerHTML = '<h3>D-Day를 입력해주세요.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval();
}

if (savedDate) {
    starter(savedDate)
} else {
    container.style.display = 'none'
    messageContainer.innerHTML = '<h3>D-Day를 입력해주세요.</h3>';
}

//0. 유효한 인풋데이터가 아니면 '유효한 시간대가 아닙니다' 
//1. 유효한 인풋데이터가 들어오면 카운트다운 실행
//2. 이미 지난 데이터가 들어오면 '종료된 어쩌고'
//3. 'clear'버튼으로 초기화
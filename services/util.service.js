export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    convertDateToTxt
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color' ,'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1 ) txt += ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function animateCSS(el, animation='bounce') {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function convertDateToTxt(date){
    const dateNow = Date.now()
    const dateTimestamp = new Date(date).getTime()
    console.log(dateTimestamp);
    
    const MINUTE = 1000 * 60
    const HOUR = MINUTE * 60
    const DAY = 24 * HOUR
    const YEAR = 365 * DAY

    const diff = dateNow - dateTimestamp

    if (diff < MINUTE)
    {
        const diffInSeconds = Math.floor(diff / 1000);  // Convert to seconds
        return diffInSeconds + " seconds ago";
    }

    if (diff < HOUR)
    {
        const diffInMinutes = Math.floor(diff / MINUTE);  // Convert to minutes
        return diffInMinutes + " minutes ago";
    }

    if(diff < DAY)
    {
        const diffInHours = Math.floor(diff / HOUR);  // Convert to hours
        return diffInHours + " hours ago";
    }

    if(diff < YEAR)
    {
        const diffInDays = Math.floor(diff / DAY);  // Convert to days
        return diffInDays + " days ago";
    }

    const diffInYears = Math.floor(diff / YEAR);  // Convert to years
    return diffInYears + " years ago";
}
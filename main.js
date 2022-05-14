let currentDate = new Date()

let referToTag = (selector) => {
	return document.querySelector(selector)
}

let referToTags = (selector) => {
	return document.querySelectorAll(selector)
}

let setTime = () => {
	currentDate = new Date()
	referToTag('.time').innerHTML = currentDate.getHours() + ':' + currentDate.getMinutes()
}

document.onmousemove = e => {
	let biasX = window.innerWidth/2
	let biasY = window.innerHeight/2
	let textShadowParameters = `${(e.clientX - biasX)/biasX*2.5}px ${(e.clientY - biasY)/biasY*2.5}px 7.5px #0000001f`
	let shadowParameters = `${(e.clientX - biasX)/biasX*2.5}px ${(e.clientY - biasY)/biasY*2.5}px 30px 5px #0000001f, inset ${(e.clientX - biasX)/biasX*50}px ${(e.clientY - biasY)/biasY*50}px 256px 50px #5544330f`
	referToTags('.shadow').forEach(item => {item.style['text-shadow'] = textShadowParameters})
	referToTag('.right-side').style['box-shadow'] = shadowParameters
}

referToTag('.time').innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`
referToTag('.date').innerHTML = `${currentDate.toLocaleString('default', {month: 'long'})} ${currentDate.getDate()}`
referToTag('.day-ofz-week').innerHTML = `${currentDate.toLocaleString('default', {weekday: 'long'})}`
referToTag('.about-day').style.width = `${referToTag('.date').clientWidth}px`
setInterval(() => {referToTag('.about-day').style.width = `${referToTag('.date').clientWidth}px`}, 20)

setInterval(setTime, 1000)

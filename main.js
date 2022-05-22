// Visual
let setShadow = (selector, props) => {
	if (props.shadowType == 'textShadow') {
		referToTag(selector).style['text-shadow'] = `${props.bias.x}px ${props.bias.y}px ${props.blur}px ${props.color}`
		return
	}
	if (props.shadowType == 'innerShadow') {
		referToTag(selector).style['box-shadow'] = `${referToTag(selector).style['box-shadow']}, inset ${props.bias.x}px ${props.bias.y}px ${props.blur}px ${props.size}px ${props.color}`
		console.log(referToTag(selector).style['box-shadow'])
		return
	}
	referToTag(selector).style['box-shadow'] = `${props.bias.x}px ${props.bias.y}px ${props.blur}px ${props.size}px ${props.color}`
}

let referToTag = (selector) => {
	return document.querySelector(selector)
}

let setTime = () => {
	currentDate = new Date()
	referToTag('.time').innerHTML = currentDate.getHours() + ':' + currentDate.getMinutes()
}

let currentDate = new Date()
let shadow = {
	textShadow: {
		elements: ['.time', '.date', '.week-day', '.weather'],
		config: {shadowType: 'textShadow', bias: {x: 5, y: 5}, blur: 7.5, color: '#5544333f'}
	},
	boxShadow: {
		elements: ['.right-side', '.desk-text', '.image-card'],
		config: {bias: {x: 5, y: 5}, blur: 15, size: 0, color: '#5544332f'}
	},
	innerShadow: {
		elements: ['.right-side', '.desk-text', '.image-card'],
		config: {shadowType: 'innerShadow', bias: {x: 15, y: 15}, blur: 64, size: 25, color: '#5544331f'}
	}
}

// document.onmousemove = e => {
// 	let bias = {x: (e.clientX - window.innerWidth/2)/(window.innerWidth/2), y: (e.clientY - window.innerHeight/2)/(window.innerHeight/2)}
// 	let boxShadowConfig = JSON.parse(JSON.stringify(shadow.boxShadow.config))
// 	let textShadowConfig = JSON.parse(JSON.stringify(shadow.textShadow.config))
// 	let innerShadowConfig = JSON.parse(JSON.stringify(shadow.innerShadow.config))
// 	textShadowConfig.bias.x *= -bias.x
// 	textShadowConfig.bias.y *= -bias.y
// 	boxShadowConfig.bias.x *= -bias.x
// 	boxShadowConfig.bias.y *= -bias.y
// 	innerShadowConfig.bias.x *= -bias.x
// 	innerShadowConfig.bias.y *= -bias.y
// 	shadow.textShadow.elements.forEach(i => {setShadow(i, textShadowConfig)})
// 	shadow.boxShadow.elements.forEach(i => {setShadow(i, boxShadowConfig)})
// 	shadow.innerShadow.elements.forEach(i => {setShadow(i, innerShadowConfig)})
// }

referToTag('.time').innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`
referToTag('.date').innerHTML = `${currentDate.toLocaleString('en-US', {month: 'long'})} ${currentDate.getDate()}`
referToTag('.week-day').innerHTML = `${currentDate.toLocaleString('en-US', {weekday: 'long'})}`
referToTag('.about-day').style.width = `${referToTag('.date').clientWidth}px`
setInterval(() => {referToTag('.about-day').style.width = `${referToTag('.date').clientWidth}px`}, 200)

setInterval(setTime, 1000)

// Logic
referToTag('.desk-text').onchange = () => {
	console.log(referToTag('.desk-text').value)
}

referToTag('.submit').onclick = () => {
	const loginfo = {email: referToTag('.email').value, pass: referToTag('.password').value}
	if (loginfo.email == '' | loginfo.password == '') return
	const APIKey = 'AIzaSyDNz8AQfMbhQy1-MTmpygFJggNhetKEE8k'
	fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`, {
		method: 'POST',
		body: JSON.stringify({
			email: loginfo.email, password: loginfo.pass, returnSecureToken: true
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => console.log(data))
}

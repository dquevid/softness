let referToTag = (selector) => {
	return document.querySelector(selector)
}

let referToTags = (selector) => {
	return document.querySelectorAll(selector)
}

document.onmousemove = e => {
	let biasX = window.innerWidth/2
	let biasY = window.innerHeight/2
	let textShadowParameters = `${(e.clientX - biasX)/biasX*2.5}px ${(e.clientY - biasY)/biasY*2.5}px 7.5px #0000001f`
	let shadowParameters = `${(e.clientX - biasX)/biasX*2.5}px ${(e.clientY - biasY)/biasY*2.5}px 30px 5px #0000001f`
	let innerShadowParameters = `inset ${(e.clientX - biasX)/biasX*15}px ${(e.clientY - biasY)/biasY*15}px 128px 5px #0000001f`
	referToTags('.shadow').forEach(item => {item.style['text-shadow'] = textShadowParameters})
	referToTag('.right-side').style['box-shadow'] = shadowParameters
	console.log(referToTag('.right-side::after'))
}

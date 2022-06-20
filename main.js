// Visual
const view = {
	getTag: selector => {return document.querySelector(selector)},
	getTags: selector => {return document.querySelectorAll(selector)},
	updateTheDate: () => {
		const currentDate = new Date
		view.getTag('.time').innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`
		view.getTag('.date').innerHTML = `${currentDate.toLocaleString('en-US', {month: 'long'})} ${currentDate.getDate()}`
		view.getTag('.week-day').innerHTML = `${currentDate.toLocaleString('en-US', {weekday: 'long'})}`
	},
	theme: {
		themeConfigs: {
			'LIGHT': {
				themeName: 'LIGHT',
				appBackground: '#fff8f0',
				textColor: '#ccbbaa',
				deskColor: '#eeddcc',
				deskTextareaBackground: 'repeating-linear-gradient(#fff8f0 0px, #fff8f0 1em, #5544333f 1.25em)',
				deskTextColor: '#554433',
				textShadowConfig: '2.5px 2.5px 15px #0000001f',
				boxShadowConfig: '0px 0px 30px 0 #0000001f',
				antiAccent: '#1a1c1f'
			},
			'DARK': {
				themeName: 'DARK',
				appBackground: '#1a1c1f',
				textColor: '#506070',
				deskColor: '#506070',
				deskTextareaBackground: 'repeating-linear-gradient(#f0f8ff 0px, #f0f8ff 1em, #3344553f 1.25em)',
				deskTextColor: '#334455',
				textShadowConfig: '2.5px 2.5px 15px #ffffff1f',
				boxShadowConfig: '0px 0px 30px 0 #ffffff3f',
				antiAccent: '#fff8f0'
			}
		},
		currentTheme: 'LIGHT',
		changeTheme: (theme) => {
			view.theme.currentTheme = theme.themeName
			view.getTags('.shadow').forEach(item => {
				item.style.color = theme.textColor
				item.style.textShadow = theme.textShadowConfig
			})
			view.getTag('body').style.background = theme.appBackground
			view.getTag('.desk').style.background = theme.deskColor
			view.getTag('.desk').style.boxShadow = theme.boxShadowConfig
			view.getTag('.desk-textarea').style.backgroundImage = theme.deskTextareaBackground
			view.getTag('.desk-textarea').style.boxShadow = theme.boxShadowConfig
			view.getTag('.desk-textarea').style.color = theme.deskTextColor
		}
	}
}

setInterval(view.updateTheDate, 500)

view.getTag('.general-info').onclick = () => {
	if (view.theme.currentTheme === 'LIGHT') {
		view.theme.changeTheme(view.theme.themeConfigs['DARK'])
		return
	}

	view.theme.changeTheme(view.theme.themeConfigs['LIGHT'])
}

view.theme.changeTheme(view.theme.themeConfigs['LIGHT'])

view.getTag('body').innerHTML += `
<div class="authorization">
	<div class="container">
		<div class="auth-fields">
			<input class="auth-input username" type="text" placeholder="Username">
			<input class="auth-input password" type="password" placeholder="Password">
			<div class="hint">Some text</div>
		</div>
		<button class="auth-btn log-in">Log in</button>
		<button class="auth-btn sign-in">Registration</button>
	</div>
</div>`

if (localStorage.getItem('authToken')) {
	view.getTag('.authorization').style.display = 'none'
}

const URL = 'http://localhost:5000/'
const sendRequest = (method, url, headers = {}, body = null) => {
	return fetch(url, {
		method,
		body: JSON.stringify(body),
		headers
	})
}
let token = ''

view.getTag('.authorization').style.display = 'none'
token = localStorage.getItem('authToken')
fetch(URL+'user/', {headers: {'Authorization': `Bearer ${token}`}})
.then(res => res.json())
.then(res => {
	view.getTag('.desk-textarea').value = res.note
})

const logIn = (body) => {
	sendRequest('POST', URL+'login/', {'Content-Type': 'application/json'}, body)
	.then(res => {
		if (res.status == 404) {
			console.log('404')
			view.getTag('.hint').innerHTML = 'There is no user with this username'
			view.getTag('.hint').style.opacity = 1
		}
		return res.json()
	})
	.then(res => {
		token = res.token
		localStorage.setItem('authToken', token)
		fetch(URL+'user/', {headers: {'Authorization': `Bearer ${token}`}})
		.then(res => res.json())
		.then(res => {
			view.getTag('.desk-textarea').value = res.note
			view.getTag('.authorization').style.display = 'none'
			view.getTag('.username').value = ''
			view.getTag('.password').value = ''
		})
	})
}

view.getTag('.log-in').onclick = () => {
	const username = view.getTag('.username').value
	const password = view.getTag('.password').value

	if (username.isEmpty || password.isEmpty || password.length < 4 || password.length > 16) {
		view.getTag('.hint').innerHTML = 'Fields must be filled in. your password length must be more then 4 and less then 16 characters'
		view.getTag('.hint').style.opacity = 1
		return
	}

	logIn({username, password})
}

view.getTag('.log-out').onclick = () => {
	view.getTag('.authorization').style.display = 'flex'
}

view.getTag('.sign-in').onclick = () => {
	const username = view.getTag('.username').value
	const password = view.getTag('.password').value

	if (username.isEmpty || password.isEmpty || password.length < 4 || password.length > 16) {
		view.getTag('.hint').innerHTML = 'Fields must be filled in. Your password length must be more then 4 and less then 16 characters'
		view.getTag('.hint').style.opacity = 1
		return
	}

	const body = {username, password}
	sendRequest('POST', URL+'signin/', {'Content-Type': 'application/json'}, body)
	.then(res => {
		setTimeout(logIn(username, password), 2000)
		return res
	})
}

view.getTag('.auth-input').onfocus = () => {
	view.getTag('.hint').style.opacity = 0
}

view.getTag('.desk-textarea').onchange = (e) => {
	const body = e.srcElement.value
	sendRequest('POST', URL+'note/', {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}, {note: body})
}

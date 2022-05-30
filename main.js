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

setInterval(view.updateTheDate, 200)

view.getTag('.general-info').onclick = () => {
	if (view.theme.currentTheme == 'LIGHT') {
		view.theme.changeTheme(view.theme.themeConfigs['DARK'])
		return
	}

	view.theme.changeTheme(view.theme.themeConfigs['LIGHT'])
}

view.theme.changeTheme(view.theme.themeConfigs['LIGHT'])

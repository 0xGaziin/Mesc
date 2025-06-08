import React, { useState } from 'react';

import LoginPage from './components/LoginPage.jsx'
import './App.css';

const App = () => {
	const [userInfo, setUserInfo] = useState([ // - It's only a test.
		{
			id: 1,
			email: 'test@gmail.com',
			password: 'test1234',
			isLoggedIn: false,
		}
	]);

	if (userInfo[0].isLoggedIn === false) {
		return <LoginPage userInfoAddition={userInfo}/>
	}

	return <h1>Hello, world!</h1>
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListComponent from "./components/ListComponent";
import AddComponent from "./components/AddComponent";
import EditComponent from "./components/EditComponent";
const ReactDOM = require('react-dom');

function App() {
	return (
		<div className="container">
			<ListComponent />
		</div>
	);
}

export default App;

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

import React from 'react';
import ListComponent from "./components/ListComponent";
const ReactDOM = require('react-dom');

function App() {
	return (
		<div className="container">
			<ListComponent />
		</div>
	);
}

export default App;

const root = ReactDOM.createRoot(document.getElementById("react"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React from 'react'
import ReactDOM from 'react-dom'
import Graph from './Graph'

ReactDOM.render(<Graph 
	vertices={[
		"HTML",
		"CSS",
		"JavaScript",
		"PHP",
		"Python"
	]}
	edges={[
		["HTML","CSS"],
		["CSS","JavaScript"],
		["CSS", "PHP"],
		["PHP", "Python"],
	]}

/>, document.getElementById('root'))
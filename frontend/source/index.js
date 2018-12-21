import React from 'react'
import ReactDOM from 'react-dom'
import Graph from './Graph'

ReactDOM.render(<Graph 
	vertices={[
		"HTML",
		"CSS",
		"jQuery",
		"JavaScript",
		"PHP",
		"Python",
		"Perl",
		"Ruby"
	]}
	edges={[
		["HTML","CSS"],
		["CSS", "jQuery"],
		["jQuery","JavaScript"],
		["jQuery", "PHP"],
		["PHP", "Python"],
		["Python", "Perl"],
		["Python", "Ruby"]
	]}
	orientation="horizontal"
/>, document.getElementById('root'))
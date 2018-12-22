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
	width={window.innerWidth}
	height={167}
	vertexStroke="#df6766"
	edgeStroke="#ebb2b2"
	edgeWidth={2}
	vertexRadius={10}
/>, document.getElementById('root'))
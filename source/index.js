import React from 'react'
import ReactDOM from 'react-dom'
import Graph from './Graph'

const onClick = (label, index, extras) => {
	console.log(label, index, extras)
}

const vertices = [
	{ label: "Here it begins", onClick, extras: "Some helper data" },
	{ label: "HTML", onClick },
	{ label: "CSS", onClick },
	{ label: "Sass", onClick },
	{ label: "JavaScript", onClick },
	{ label: "Bootstrap", onClick },
	{ label: "jQuery", onClick },
	{ label: "ReactJS", onClick },
	{ label: "Jest", onClick },
	{ label: "Angular", onClick },
	{ label: "Vue", onClick },
	{ label: "Redux", onClick },
	{ label: "React Material", onClick },
	{ label: "Vuetify", onClick },
]

const edges = [
	["Here it begins", "HTML"],
	["HTML", "CSS"],
	["CSS", "JavaScript"],
	["CSS", "Sass"],
	["JavaScript", "jQuery"],
	["jQuery", "Bootstrap"],
	["jQuery", "ReactJS"],
	["jQuery", "Angular"],
	["jQuery", "Vue"],
	["ReactJS", "Redux"],
	["Redux", "React Material"],
	["React Material", "Jest"],
	["Vue", "Vuetify"],
]


ReactDOM.render(<Graph 
	vertices={vertices}
	edges={edges}
	orientation="horizontal"
	width={window.innerWidth}
	height={window.innerHeight}
	vertexStroke="#df6766"
	edgeStroke="#ebb2b2"
	edgeWidth={2}
	vertexRadius={10}
/>, document.getElementById('root'))
import React from 'react'
import ReactDOM from 'react-dom'
import Graph from './Graph'

const onClick = (label, index, extras) => {
	console.log(label, index, extras)
}

const vertices = [
	{ label: "HTML", onClick },
	{ label: "CSS", onClick },
	{ label: "Sass", onClick, disabled: false },
	{ label: "JavaScript", onClick, disabled: false },
//	{ label: "Bootstrap", onClick, disabled: false },
//	{ label: "jQuery", onClick, disabled: false },
	{ label: "React.js", onClick, disabled: false },
	{ label: "Angular", onClick, disabled: false },
	{ label: "Vue", onClick, disabled: false },
//	{ label: "Redux", onClick, disabled: false },
//	{ label: "Vuetify", onClick, disabled: false },
	{ label: "Node.js", },
	{ label: "GitHub", },
	//{ label: "GitHub", },
	//{ label: "MongoDB", },
	//{ label: "MySQL", },
	{ label: "PHP", },
	{ label: "Python", },
	{ label: "Express", },
	//{ label: "nginx", },
	//{ label: "Apache", },
]

const edges = [
	["HTML", "CSS"],
	["CSS", "JavaScript"],
	["CSS", "Sass"],
	//["Sass", "Vue"],
	["JavaScript", "React.js"],
	["JavaScript", "Angular"],
	["JavaScript", "Vue"],
	["Angular", "GitHub"],
	["React.js", "GitHub"],
	["Vue", "GitHub"],
	["GitHub", "Node.js"],
	["GitHub", "PHP"],
	["GitHub", "Python"],
	["Node.js", "Express"],
	//["React.js", "Redux"],
	//["Vue", "Vuetify"],
]


ReactDOM.render(<Graph 
	vertices={vertices}
	edges={edges}
	width={window.innerWidth}
	height={window.innerHeight}
	vertexStroke="#df6766"
	edgeStroke="#ebb2b2"
	edgeWidth={2}
	vertexRadius={15}
	vertexGap={200}
	labelFontSize={20}
	perfectlyCenter={true}
/>, document.getElementById('root'))
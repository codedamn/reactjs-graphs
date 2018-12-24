import React from 'react'
import ReactDOM from 'react-dom'
import Graph from './Graph'

const onClick = (label, index, extras) => {
	console.log(label, index, extras)
}

const vertices = [
	{ label: "HTML", onClick },
	{ label: "CSS", onClick },
	{ label: "JavaScript", onClick, disabled: false },
	{ label: "Sass", onClick, disabled: false },
	{ label: "React.js", onClick, disabled: false },
	{ label: "Angular", onClick, disabled: false },
	{ label: "Vue", onClick, disabled: false },
	{ label: "GitHub", },
	{ label: "Node.js", },
	{ label: "PHP", },
	{ label: "Python", },
	{ label: "Backend", },
	//{ label: "Express", },
	{ label: "nginx", },
	{ label: "Apache", },
]

const edges = [
	["HTML", "CSS"],
	["CSS", "JavaScript"],
	["JavaScript", "Sass"],
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
	["Python", "Backend"],
	["PHP", "Backend"],
	//["Node.js", "Express"],
	["Node.js", "Backend"],
	["Backend", "nginx"],
	["Backend", "Apache"],
	//["React.js", "Redux"],
	//["Vue", "Vuetify"],
]


ReactDOM.render(<Graph 
	vertices={vertices}
	edges={edges}
	width={window.innerWidth}
	height={500}
	autoWidth={true}
	vertexStroke="#df6766"
	edgeStroke="#ebb2b2"
	edgeWidth={2}
	vertexRadius={15}
	vertexGap={200}
	labelFontSize={20}
	centerInCanvas={true}
/>, document.getElementById('root'))
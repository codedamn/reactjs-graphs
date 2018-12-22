# ReactJS Graphs
A simple react component to draw branched graphs consisting of vertices and edges.

# How To Use?

1. Install using `npm install reactjs-graphs --save`
2. Import in your react project: `import Graph from 'reactjs-graphs'`
3. Use directly in render function. Here's an example explaining all possible props you can pass:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Graph from 'reactjs-graphs'

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
	{ label: "ReactJS", onClick, extras: "Could be anything, literally" },
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
```

4. The example above would render the following graph:

![Demo](https://raw.githubusercontent.com/codedamn/reactjs-graphs/master/graph.png)
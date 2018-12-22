# ReactJS Graphs
A simple react component to draw branched graphs consisting of vertices and edges.

# How To Use?

1. Install using `npm install reactjs-graphs --save`
2. Import in your react project: `import Graph from 'reactjs-graphs'`
3. Use directly in render function. Here's an example explaining all possible props you can pass:

```jsx
<Graph
	vertices={[ // all possible edges
		"HTML",
		"CSS",
		"jQuery",
		"JavaScript",
		"PHP",
		"Python",
		"Perl",
		"Ruby"
	]}
	edges={[ // edges between nodes. Please draw a graph on paper first and see for yourself how the edges flow to place a suitable array value here
		["HTML","CSS"],
		["CSS", "jQuery"],
		["jQuery","JavaScript"],
		["jQuery", "PHP"],
		["PHP", "Python"],
		["Python", "Perl"],
		["Python", "Ruby"]
	]}
	orientation="horizontal" // orientation of graph (whether horizontal or vertical)
	width={window.innerWidth} // width of graph
	height={window.innerHeight} // height of graph
	vertexStroke="#df6766" // color of border of vertices
	edgeStroke="#ebb2b2" // color of edge
	edgeWidth={2} // thickness of edge
	vertexRadius={10} // radius of vertex -> bigger the radius, larger the vertex size
/>
```

4. The example above would render the following graph:

![Demo](https://raw.githubusercontent.com/codedamn/reactjs-graphs/master/graph.png)
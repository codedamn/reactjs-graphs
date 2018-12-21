import React from 'react'
import "./styles.css"
import { Stage, Layer } from 'react-konva'
import Vertex from './Vertex'
import Edge from './Edge'

/*
['Layer', 'FastLayer', 'Group', 'Label', 'Rect', 'Circle', 'Ellipse', 'Wedge', 'Line', 'Sprite', 
'Image', 'Text', 'TextPath', 'Star', 'Ring', 'Arc', 'Tag', 'Path', 'RegularPolygon', 'Arrow', 
'Shape', 'Transformer']
*/

export default class Graph extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			list: {},
			vertexCoordinates: {}
		}

		props.vertices.forEach((vertex, index) => {
			this.state.list[vertex] = []
		})

		props.edges.map(edge => {
			this.state.list[edge[0]].push(edge[1])
		})

		let mainIndex = 1
		
		let yCenter = 100
		let totalYAllowed = yCenter*2

		for(let mainVertex in this.state.list) {
		//	debugger
			const edgesTo = this.state.list[mainVertex]
			let partitionLength = totalYAllowed/(edgesTo.length + 1)

			if(this.state.vertexCoordinates[mainVertex]) {
				// if mainVertex is already set, take partitionLength from it (to keep it at same Y coordinate)
				partitionLength = this.state.vertexCoordinates[mainVertex].y * 2/(edgesTo.length + 1)
			}

			for(let i=0;i<edgesTo.length;i++) {
				this.state.vertexCoordinates[edgesTo[i]] = {
					x: 100 + 150*mainIndex,
					y: (i + 1)*partitionLength
				}
			}

			if(edgesTo.length > 1) {
				// the vertex had branched into 2 subgraphs, do not update x-coordinate
			} else {
				mainIndex++
			}
		}

		this.state.vertexCoordinates["HTML"] = { x : 100, y: yCenter }
	}

	getEdges() {
		const list = this.state.list
		const vertexCoordinates = this.state.vertexCoordinates

		const elems = []
		for(let key in list) {
			const vertex = key
			const edgesTo = list[key]

			const { x: parentX, y: parentY } = vertexCoordinates[vertex]

			for(let i=0;i<edgesTo.length;i++) {
				const { x, y } = vertexCoordinates[edgesTo[i]]
				elems.push(<Edge
							points={[parentX, parentY, (parentX + x)/2, (parentY + y + (Math.floor(Math.random()*20) - 10))/2, x, y]}
						/>)
			}
		}
		return elems
	}



	componentDidMount() {
	
	}

	render() {

		const vertices = this.props.vertices
		const list = this.state.list

		const vertexCoordinates = this.state.vertexCoordinates

		return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer>
				{
					this.getEdges()
				}
			</Layer>
			<Layer>
				{vertices.map((vertex, index) => {
					return <Vertex
								key={index}
								x={vertexCoordinates[vertex].x}
								y={vertexCoordinates[vertex].y}
								label={vertex}
								onClick={_ => alert(vertex)}
							/>
					})
				}
			</Layer>
			
		</Stage>
		)
	}
}
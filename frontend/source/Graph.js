import React from 'react'
import "./styles.css"
import { Stage, Layer } from 'react-konva'
import Vertex from './Vertex'
import Edge from './Edge'
import PropTypes from 'prop-types'

/*
['Layer', 'FastLayer', 'Group', 'Label', 'Rect', 'Circle', 'Ellipse', 'Wedge', 'Line', 'Sprite', 
'Image', 'Text', 'TextPath', 'Star', 'Ring', 'Arc', 'Tag', 'Path', 'RegularPolygon', 'Arrow', 
'Shape', 'Transformer']
*/

export default class Graph extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			list: [],
			vertexCoordinates: {}
		}

		props.vertices.forEach((vertex, index) => {
			this.state.list.push({ name: vertex, next: [] })
		})

		props.edges.map(edge => {
			this.state.list.find(e => e.name == edge[0]).next.push(edge[1])
		})

		let mainIndex = 1
		
		let yCenter = 100
		let totalYAllowed = yCenter*2
		let vertexGap = 150

		console.log(this.state.list)

		this.state.list.map(mainVertex => {
			
			const edgesTo = mainVertex.next

			let partitionLength = totalYAllowed/(edgesTo.length + 1)

			const mainVertexCoordinates = this.state.vertexCoordinates[mainVertex.name]
			
			
			let childX = 100 + vertexGap*mainIndex

			debugger

			if(mainVertexCoordinates) {
				// if mainVertex is already set, take partitionLength from it (to keep it at same Y coordinate)
				// also take x coordinate from the same and add the standard center gap

				partitionLength = mainVertexCoordinates.y * 2/(edgesTo.length + 1)
				childX = mainVertexCoordinates.x + vertexGap
			}

			for(let i=0;i<edgesTo.length;i++) {
				
				const childVertex = edgesTo[i]

				if(childVertex in this.state.vertexCoordinates) {
					// this vertex is already set
					continue
				}

				if(this.props.orientation === 'horizontal') {
					this.state.vertexCoordinates[childVertex] = {
						x: childX,
						y: (i + 1)*partitionLength // move the vertex down as i increases
					}
				} else {
					this.state.vertexCoordinates[childVertex] = {
						x: (i + 1)*partitionLength, // move the vertex down as i increases
						y: childX// move the vertex down as i increases
					}
				}
				
			}

			if(edgesTo.length > 1) {
				// the vertex had branched into 2 subgraphs, do not update x-coordinate
			} else {
				mainIndex++
			}
		})

		let flag = false

		props.vertices.forEach(vertex => {
			if(vertex in this.state.vertexCoordinates) {
				// ok
			} else {
				if(flag) throw new Error("Initializing the graph with multiple vertices? Only 1 vertex is supported for now")
				// this is the first vertex which was not registered in the for-loop above
				flag = true
				this.state.vertexCoordinates[vertex] = {
					x: 100,
					y: yCenter
				}
			}
		})

		console.log('Coordinates', this.state.vertexCoordinates)
	}

	getEdges() {
		const list = this.state.list
		const vertexCoordinates = this.state.vertexCoordinates

		const elems = []
		list.map(mainVertex => {
			const vertex = mainVertex.name
			const edgesTo = mainVertex.next

			const { x: parentX, y: parentY } = vertexCoordinates[vertex]

			for(let i=0;i<edgesTo.length;i++) {
				const { x, y } = vertexCoordinates[edgesTo[i]]
				elems.push(<Edge
							points={[parentX, parentY, (parentX + x)/2, (parentY + y + (Math.floor(Math.random()*20) - 10))/2, x, y]}
						/>)
			}
		})
		return elems
	}

	render() {

		const vertices = this.props.vertices

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

Graph.propTypes = {
	orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired
}

Graph.defaultProps = {
	orientation: 'horizontal'
}
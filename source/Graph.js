import React from 'react'
import "./styles.css"
import { Stage, Layer, Group } from 'react-konva' // Don't forget to update konva.js!
import Vertex from './Vertex'
import Edge from './Edge'
import PropTypes from 'prop-types'

export default class Graph extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			list: [],
			vertexCoordinates: {}
		}

		props.vertices.forEach((vertex, index) => {
			this.state.list.push({ name: vertex.label, next: [] })
		})

		props.edges.map(edge => {
			this.state.list.find(e => e.name == edge[0]).next.push(edge[1])
		})

		let mainIndex = 1
		
		let totalYAllowed = props.height
		let vertexGap = props.orientation === 'horizontal' ? 100 : 70

		let horizontalMin = 0, horizontalMax = 0
		let verticalMin = props.height/2, verticalMax = props.height/2

		this.state.list.map(mainVertex => {
			
			const edgesTo = mainVertex.next

			let partitionLength = totalYAllowed/(edgesTo.length + 1)

			const mainVertexCoordinates = this.state.vertexCoordinates[mainVertex.name]
			
			
			let childX = vertexGap*mainIndex

			if(mainVertexCoordinates) {
				// if mainVertex is already set, take partitionLength from it (to keep it at same Y coordinate)
				// also take x coordinate from the same and add the standard center gap
				if(props.orientation === 'horizontal') {
					partitionLength = mainVertexCoordinates.y * 2/(edgesTo.length + 1)
					childX = mainVertexCoordinates.x + vertexGap
				} else {
					partitionLength = mainVertexCoordinates.x * 2/(edgesTo.length + 1)
					childX = mainVertexCoordinates.y + vertexGap
				}
			}

			for(let i=0;i<edgesTo.length;i++) {
				
				const childVertex = edgesTo[i]

				const childY = (i + 1)*partitionLength

				if(childVertex in this.state.vertexCoordinates) {
					// this vertex is already set
					continue
				}

				if(props.orientation === 'horizontal') {
					
					this.state.vertexCoordinates[childVertex] = {
						x: childX,
						y: childY // move the vertex down as i increases
					}
				} else {
					this.state.vertexCoordinates[childVertex] = {
						x: childY, // move the vertex down as i increases
						y: childX// move the vertex down as i increases
					}
				}
				verticalMin = childY < verticalMin ? childY : verticalMin
				verticalMax = childY > verticalMax ? childY : verticalMax

				horizontalMin = childX < horizontalMin ? childX : horizontalMin
				horizontalMax = childX > horizontalMax ? childX : horizontalMax

			}

			if(edgesTo.length > 1) {
				// the vertex had branched into 2 subgraphs, do not update x-coordinate
			} else {
				mainIndex++
			}
		})

		let flag = false

		props.vertices.forEach(vertex => {
			if(vertex.label in this.state.vertexCoordinates) {
				// ok
			} else {
				if(flag) throw new Error("Initializing the graph with multiple vertices? Only 1 vertex is supported for now")
				// this is the first vertex which was not registered in the for-loop above
				flag = true
				if(this.props.orientation === 'horizontal') {
					this.state.vertexCoordinates[vertex.label] = {
						x: 0,
						y: totalYAllowed/2
					}
				} else {
					this.state.vertexCoordinates[vertex.label] = {
						x: totalYAllowed/2,
						y: 0
					}
				}
			}
		})

		console.log(this.state.vertexCoordinates)

		console.log(verticalMin, verticalMax)
		console.log(horizontalMin, horizontalMax)

		//this.state.horizontalShift = -(horizontalMin + horizontalMax)/2
		this.state.verticalShift = ((verticalMin + verticalMax) - (props.height))/2
		this.state.horizontalShift = ((horizontalMin + horizontalMax) - (props.width))/2

	}

	getEdges(edgeProps) {
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
							key={vertex + edgesTo[i]}
							points={[parentX, parentY, (parentX + x)/2, (parentY + y + (Math.floor(Math.random()*20) - 10))/2, x, y]}
							{...edgeProps}
						/>)
			}
		})
		return elems
	}

	render() {
		const { vertexCoordinates, horizontalShift, verticalShift } = this.state
		
		const { vertexStroke, vertexStrokeWidth, inactiveVertexFill, activeVertexFill, vertexRadius } = this.props
		const vertexProps = { vertexStroke, vertexStrokeWidth, inactiveVertexFill, activeVertexFill, vertexRadius }
		
		const { edgeStroke, edgeWidth } = this.props
		const edgeProps = { edgeStroke, edgeWidth }
		
		const { vertices, width, height } = this.props

		return (
		<Stage width={width} height={height}>
			<Layer>
				<Group ref={k => this.group = k} offsetX={horizontalShift} offsetY={verticalShift}>
					{this.getEdges(edgeProps)}
					{vertices.map((vertex, index) => {
						return <Vertex
									key={index}
									x={vertexCoordinates[vertex.label].x}
									y={vertexCoordinates[vertex.label].y}
									label={vertex.label}
									onClick={_ => vertex.onClick(vertex.label, index, vertex.extras)}
									{...vertexProps}
								/>
						})
					}
				</Group>
			</Layer>			
		</Stage>
		)
	}
}

Graph.propTypes = {
	orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}

Graph.defaultProps = {
	orientation: 'horizontal'
}
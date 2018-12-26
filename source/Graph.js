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
			width: props.width,
			height: props.height,
			list: [],
			vertexCoordinates: {}
		}

		props.vertices.forEach((vertex, index) => {
			this.state.list.push({ 
				name: vertex.label, 
				from: [],
				to: [], // needed to calculate siblings of next nodes
				siblings: 0
			})
		})

		props.edges.forEach(edge => {

			const from = edge[0]
			const to = edge[1]
			this.state.list.find(e => e.name == to).from.push(from)
			this.state.list.find(e => e.name == from).to.push(to)

		})

		this.state.list.forEach(vertex => {

			const multipleEntriesToThisVertex = vertex.from.length > 1
			
			vertex.from.forEach(v => {
				const parentVertex = this.state.list.find(obj => obj.name === v)
				if(parentVertex.to.length > 1 && multipleEntriesToThisVertex) {
					throw new Error(`[Crash at calculating vertex "${vertex.name}"] Cannot create a graph which connects 2 branches as well as diverges into 2 edges at the same time. I honestly don't know how this should look like mathematically, so I'm crashing at this possibility to avoid non-deterministic layouts. `)
				}
				vertex.siblings += parentVertex.to.length
			})

			vertex.siblings = multipleEntriesToThisVertex ? 1 : vertex.siblings // If a vertex has multiple entries, that vertex is not allowed to have any sibilings (already checked and throwed above)

			if(vertex.siblings == 0) {
				// first node
				vertex.siblings = 1
			}
		})		
		
		let totalYAllowed = props.height
		let vertexGap = props.vertexGap

		let horizontalMin = 0, horizontalMax = 0
		let verticalMin = props.height/2, verticalMax = props.height/2

		this.state.list.map(mainVertex => {
			
			//let partitionLength = totalYAllowed/(edgesTo.length + 1)
			const coords = this.state.vertexCoordinates
			
			let x, y
			if(mainVertex.from.length == 0) {
				x = 0
				y = totalYAllowed/2
			} else {
				let closestParent = coords[mainVertex.from[0]]
				let closestParentName = mainVertex.from[0]

				for(let i=1;i<mainVertex.from.length;i++) {
					if(coords[mainVertex.from[i]].x > closestParent.x) {
						closestParent = coords[mainVertex.from[i]]
						closestParentName = mainVertex.from[i]
					}
				}
				
				if(!closestParent) {
					throw new Error(`[CRASHED at "${mainVertex.name}"] Invalid order of passed vertices. Please pass them in the same order as you want them to print on screen`)
				}

				x = closestParent.x + vertexGap

				
				
				const index = this.state.list.find(obj => obj.name == closestParentName).to.indexOf(mainVertex.name) + 1

				y = index * 2 * mainVertex.from.reduce((total, currentValue) => {

					if(!coords[currentValue]) {
						throw new Error(`[CRASHED at "${currentValue}"] Invalid order of passed vertices. Please pass them in the same order as you want them to print on screen`)
					}
				//	debugger
					return total + coords[currentValue].y
				}, 0)/((mainVertex.siblings + 1) * (mainVertex.from.length))

			}

			coords[mainVertex.name] = { x, y }

			verticalMax = verticalMax > y ? verticalMax : y
			verticalMin = verticalMin < y ? verticalMin : y

			horizontalMax = horizontalMax > x ? horizontalMax : x
			horizontalMin = horizontalMin < x ? horizontalMin : x
		})

		console.log(this.state.vertexCoordinates)

		if(props.autoWidth) {
			this.state.width = (horizontalMax - horizontalMin) + 100 // 100 = padding
		}

		//this.state.horizontalShift = -(horizontalMin + horizontalMax)/2
		this.state.verticalShift = ((verticalMin + verticalMax) - (this.state.height))/2
		this.state.horizontalShift = ((horizontalMin + horizontalMax) - (this.state.width))/2
		
		console.log(this.state.horizontalShift, this.state.verticalShift)
		console.log(horizontalMin, horizontalMax)
	
		
		if(!props.centerInCanvas) {
			this.state.verticalShift = 0 //-100
			this.state.horizontalShift = 0
		}


	}

	getEdges(edgeProps) {
		const list = this.state.list
		const vertexCoordinates = this.state.vertexCoordinates

		const elems = []
		list.map(mainVertex => {
			const vertex = mainVertex.name
			const edgesTo = mainVertex.to

			const { x: parentX, y: parentY } = vertexCoordinates[vertex]

			for(let i=0;i<edgesTo.length;i++) {
				const { x, y } = vertexCoordinates[edgesTo[i]]
				elems.push(<Edge
							key={vertex + edgesTo[i]}
							points={[parentX, parentY, (parentX + x  + (Math.floor(Math.random()*20) - 10) )/2, (parentY + y + (Math.floor(Math.random()*20) - 10))/2, x, y]}
							{...edgeProps}
						/>)
			}
		})
		return elems
	}

	render() {
		const { vertexCoordinates, horizontalShift, verticalShift, width, height } = this.state
		
		const { labelColor, labelColorDisabled, labelFontSize, vertexStroke, vertexStrokeWidth, inactiveVertexFill, activeVertexFill, vertexRadius } = this.props
		const vertexProps = { labelColor, labelColorDisabled, labelFontSize, vertexStroke, vertexStrokeWidth, inactiveVertexFill, activeVertexFill, vertexRadius }
		
		const { edgeStroke, edgeWidth } = this.props
		const edgeProps = { edgeStroke, edgeWidth }
		
		const { vertices } = this.props

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
									onClick={_ => vertex.onClick && vertex.onClick(vertex.label, index, vertex.extras)}
									disabled={vertex.disabled}
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
	width: PropTypes.number,
	height: PropTypes.number.isRequired,
	vertexGap: PropTypes.number.isRequired,
	centerInCanvas: PropTypes.bool.isRequired,
	autoWidth: PropTypes.bool.isRequired
}

Graph.defaultProps = {
	vertexGap: 100,
	centerInCanvas: false,
	autoWidth: false
}
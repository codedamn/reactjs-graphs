import React from 'react'
import Konva from 'konva'
import { Circle, Text } from 'react-konva'
import PropTypes from 'prop-types'

export default class Vertex extends React.Component {

	constructor(props) {
		super(props)
		this.mouseInVertex = this.mouseInVertex.bind(this)
		this.mouseOutVertex = this.mouseOutVertex.bind(this)
		this.state = {
			vertexFill: props.inactiveVertexFill,
			textOffsetX: 0
		}
	}

	componentDidMount() {
		this.setState({
			textOffsetX: this.text.width() / 2
		})
	}

	mouseOutVertex() {
		document.body.style.cursor = 'default'
		this.setState({
			vertexFill: this.props.inactiveVertexFill
		})
	}

	mouseInVertex() {
		document.body.style.cursor = 'pointer'
		this.setState({
			vertexFill: this.props.activeVertexFill
		})
	}

	render() {

		const { x, y, label, onClick, vertexStroke, vertexStrokeWidth, vertexRadius  } = this.props
		const { vertexFill, textOffsetX } = this.state

		return (
			<>
				<Text
					ref={node => this.text = node }
					x={x}
					y={y-30}
					offsetX={textOffsetX}
					text={label} />
				<Circle
					x={x}
					onClick={onClick}
					onMouseEnter={this.mouseInVertex}
					onMouseLeave={this.mouseOutVertex}
					y={y}
					stroke={vertexStroke}
					strokeWidth={vertexStrokeWidth}
					fill={vertexFill}
					radius={vertexRadius}
				/>
			</>
		)
	}
}

Vertex.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	vertexStroke: PropTypes.string.isRequired,
	vertexStrokeWidth: PropTypes.number.isRequired,
	inactiveVertexFill: PropTypes.string.isRequired,
	activeVertexFill: PropTypes.string.isRequired,
	vertexRadius: PropTypes.number.isRequired
}

Vertex.defaultProps ={
	vertexStroke: "#df6766",
	vertexStrokeWidth: 3,
	inactiveVertexFill: "white",
	activeVertexFill: "#df6766",
	vertexRadius: 10
}
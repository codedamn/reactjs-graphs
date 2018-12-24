import React from 'react'
import { Circle, Text, Group } from 'react-konva'
import PropTypes from 'prop-types'

export default class Vertex extends React.Component {

	constructor(props) {
		super(props)
		this.mouseInVertex = this.mouseInVertex.bind(this)
		this.mouseOutVertex = this.mouseOutVertex.bind(this)
		this.state = {
			vertexFill: props.inactiveVertexFill,
			textOffsetX: 0,
			textOffsetY: 0,
			showTextNode: true
		}
	}

	componentDidMount() {
		this.setState({
			textOffsetX: this.text.width() / 2,
			textOffsetY: this.text.height() / 2,
			showTextNode: !this.props.disabled
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state != nextState
	}

	mouseOutVertex() {
		document.body.style.cursor = 'default'
		
		if(this.props.disabled) {
			// disabled vertex
			this.setState({
				showTextNode: false
			})
		} else {
			this.setState({
				vertexFill: this.props.inactiveVertexFill
			})
		}
	}

	mouseInVertex() {
		document.body.style.cursor = 'pointer'
		if(this.props.disabled) {
			this.setState({
				showTextNode: true
			})
		} else {
			this.setState({
				vertexFill: this.props.activeVertexFill
			})
		}
	}

	render() {

		const { disabled, x, y, label, onClick, vertexStroke, vertexStrokeWidth, vertexRadius, orientation, labelFontSize  } = this.props
		const { vertexFill, textOffsetX, textOffsetY, showTextNode } = this.state

		return (
			<Group>
				{showTextNode ? <Text
					ref={node => this.text = node }
					x={orientation === "horizontal" ? x : x - textOffsetX  - vertexRadius - vertexStrokeWidth - 5 }
					y={orientation === "horizontal" ? y - textOffsetY * 2 - vertexRadius - vertexStrokeWidth : y - textOffsetY }
					offsetX={textOffsetX}
					fontSize={labelFontSize}
					text={label} /> : null }
				<Circle
					x={x}
					onClick={onClick}
					onMouseEnter={this.mouseInVertex}
					onMouseLeave={this.mouseOutVertex}
					y={y}
					filter
					stroke={!disabled ? vertexStroke : "gray" }
					strokeWidth={vertexStrokeWidth}
					fill={!disabled ? vertexFill : "gray" }
					radius={vertexRadius}
				/>
			</Group>
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
	vertexRadius: PropTypes.number.isRequired,
	labelFontSize: PropTypes.number.isRequired
}

Vertex.defaultProps ={
	vertexStroke: "#df6766",
	vertexStrokeWidth: 3,
	inactiveVertexFill: "white",
	activeVertexFill: "#df6766",
	vertexRadius: 10,
	labelFontSize: 12
}
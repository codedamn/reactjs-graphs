import React from 'react'
import Konva from 'konva'
import { Circle, Text } from 'react-konva'
import PropTypes from 'prop-types'

export default class Vertex extends React.Component {

	constructor() {
		super()
		this.mouseInVertex = this.mouseInVertex.bind(this)
		this.mouseOutVertex = this.mouseOutVertex.bind(this)
		this.state = {
			vertexFill: "white",
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
			vertexFill: "white"
		})
	}

	mouseInVertex() {
		document.body.style.cursor = 'pointer'
		this.setState({
			vertexFill: "#df6766"
		})
	}

	render() {

		const { x, y, label, onClick } = this.props
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
					stroke="#df6766"
					strokeWidth={3}
					fill={vertexFill}
					radius={10}
				/>
			</>
		)
	}
}

Vertex.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
}
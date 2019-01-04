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
		}
	}

	componentDidMount() {
		this.setState({
			textOffsetX: this.text.width() / 2,
			textOffsetY: this.text.height() / 2
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state != nextState
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

		const { fontFamily, labelColor, labelColorDisabled, disabled, x, y, label, onClick, vertexStroke, vertexStrokeWidth, vertexRadius, labelFontSize  } = this.props
		const { vertexFill, textOffsetX, textOffsetY } = this.state

		return (
			<Group>
				<Text
					ref={node => this.text = node }
					x={ x }
					fill={disabled ? labelColorDisabled : labelColor }
					y={y - textOffsetY * 2 - vertexRadius - vertexStrokeWidth}
					offsetX={textOffsetX}
					fontFamily={fontFamily}
					fontSize={labelFontSize}
					text={label} />
				<Circle
					x={x}
					onClick={(...args) => disabled ? void 0 : onClick(...args)}
					onTap={(...args) => disabled ? void 0 : onClick(...args)}
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
	labelFontSize: PropTypes.number.isRequired,
	labelColor: PropTypes.string.isRequired,
	labelColorDisabled: PropTypes.string,
	fontFamily: PropTypes.string
}

Vertex.defaultProps = {
	vertexStroke: "#df6766",
	vertexStrokeWidth: 3,
	inactiveVertexFill: "white",
	activeVertexFill: "#df6766",
	vertexRadius: 10,
	labelFontSize: 12,
	labelColor: "black",
	labelColorDisabled: "gray"
}
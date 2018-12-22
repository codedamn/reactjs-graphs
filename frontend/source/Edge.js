import React from 'react'
import { Line } from 'react-konva'
import PropTypes from 'prop-types'

export default class Edge extends React.Component {
	render() {

		const { points, edgeStroke, edgeWidth } = this.props

		return <Line
					points={points}
					stroke={edgeStroke}
					tension={1}
					strokeWidth={edgeWidth}
				/>
	}
}

Edge.propTypes = {
	points: PropTypes.array.isRequired,
	edgeStroke: PropTypes.string.isRequired,
	edgeWidth: PropTypes.number.isRequired
}

Edge.defaultProps = {
	edgeStroke: "#ebb2b2",
	edgeWidth: 3
}
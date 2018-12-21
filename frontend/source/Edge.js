import React from 'react'
import { Line } from 'react-konva'
import PropTypes from 'prop-types'

export default class Edge extends React.Component {
	render() {

		const { points } = this.props

		return <Line
					points={points}
					stroke="#ebb2b2"
					tension={1}
					strokeWidth={1}
				/>
	}
}

Edge.propTypes = {
	points: PropTypes.array.isRequired
}
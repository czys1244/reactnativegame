import React from 'react';
import { View } from 'react-native';

const Obstacle = ({obstacleWidth,obstacleHeight,gap, obstaclesLeft, randomBottom}) => {
    const n = 5
    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: 'blue',
                width: obstacleWidth,
                height: 600,
                left: obstaclesLeft,
                bottom: n*randomBottom + obstacleHeight + gap,
            }}></View>
            <View style={{
                position: 'absolute',
                backgroundColor: 'blue',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: n*randomBottom,
            }}></View>
        </>
    )
}

export default Obstacle
import React from 'react';
import { View } from 'react-native';

const Obstacle = ({obstacleWidth,obstacleHeight,gap, obstaclesLeft}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: 'blue',
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: 0 + obstacleHeight + gap,
            }}></View>
            <View style={{
                position: 'absolute',
                backgroundColor: 'blue',
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: 0,
            }}></View>
        </>
    )
}

export default Obstacle
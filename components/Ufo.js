import React from 'react'
import { View, Image } from 'react-native'

const Ufo = ({ ufoBottom, ufoLeft }) => {
    const ufoWidth = 70
    const ufoHeight = 60

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            bottom: ufoBottom - (ufoHeight / 2),
            left: ufoLeft - (ufoWidth / 2),
        }}>
            <Image
                source={require('./ufo1.png')}
                style={{
                    width: ufoWidth,
                    height: ufoHeight,
                }}
            />
        </View>

    )
}
export default Ufo

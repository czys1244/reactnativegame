import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Ufo from './components/Ufo'
import Obstacle from './components/Obstacle'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const ufoLeft = screenWidth / 2
  const [ufoBottom, setUfoBottom] = useState(screenHeight / 2)
  const [obstLeft, setObsLeft] = useState(screenWidth)
  const [obstLeft2, setObsLeft2] = useState(screenWidth + screenWidth/2 + 30)
  const [obstNegHeight, setObstNegHeight] = useState(0)
  const [obstNegHeight2, setObstNegHeight2] = useState(0)
  const grav = 7
  const gameOver = false
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 150
  let timerId
  let obsTimerId
  let obsTimerId2
  useEffect(() => {
    if (ufoBottom > 0) {
      timerId = setInterval(() => {
        setUfoBottom(() => ufoBottom - grav)
      }, 30)
      return () => {
        clearInterval(timerId)
      }
    }
  }, [ufoBottom])
  const jump = () => {
    if (!gameOver && ufoBottom < screenHeight) {
      setUfoBottom(ufoBottom => ufoBottom + 50)
    }
  }

  //1 obs
  useEffect(() => {
    if (obstLeft > -obstacleWidth) {
      obsTimerId = setInterval(() => {
        setObsLeft(obstLeft => obstLeft - 5)
      }, 30)
      return () => {
        clearInterval(obsTimerId)
      }
    }else{
      setObsLeft(screenWidth)
      setObstNegHeight(-Math.random() * 100)
    }
  }, [obstLeft])
  //2 obs
  useEffect(() => {
    if (obstLeft2 > -obstacleWidth) {
      obsTimerId2 = setInterval(() => {
        setObsLeft2(obstLeft2 => obstLeft2 - 5)
      }, 30)
      return () => {
        clearInterval(obsTimerId2)
      }
    }else{
      setObsLeft2(screenWidth)
      setObstNegHeight2(-Math.random() * 100)
    }
  }, [obstLeft2])
  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Ufo
          ufoBottom={ufoBottom}
          ufoLeft={ufoLeft}
        />
        <Obstacle
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstNegHeight}
          gap={gap}
          obstaclesLeft={obstLeft}
          
        />
        <Obstacle
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstNegHeight2}
          gap={gap}
          obstaclesLeft={obstLeft2}
          
        />
      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
  const grav = 7
  const gameOver = false
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 100
  let timerId
  let obsTimerId
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
    if(!gameOver && ufoBottom<screenHeight){
      setUfoBottom(ufoBottom=>ufoBottom+50)
    }
  }

  useEffect(()=>{
    if(obstLeft>0){
      obsTimerId=setInterval(()=>{
        setObsLeft(obstLeft=>obstLeft-5)
      },30)
    }
    return ()=>{
      clearInterval(obsTimerId)
    }
  },[obstLeft])
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
          obstaclesLeft={obstLeft}
          gap={gap}
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

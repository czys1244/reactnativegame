import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Button } from 'react-native'
import Ufo from './components/Ufo'
import Obstacle from './components/Obstacle'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const ufoLeft = screenWidth / 2
  const [ufoBottom, setUfoBottom] = useState(screenHeight / 2)
  const [obstLeft, setObsLeft] = useState(screenWidth)
  const [obstLeft2, setObsLeft2] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstNegHeight, setObstNegHeight] = useState(0)
  const [obstNegHeight2, setObstNegHeight2] = useState(0)
  const [score,setScore]=useState(0)
  const grav = 9
  const [gameOver, setGameOver] = useState(false)
  let obstacleWidth = 60
  let obstacleHeight = 600
  let gap = 180
  let timerId
  let obsTimerId
  let obsTimerId2
  const restart = ()=>{
    setUfoBottom(screenHeight / 2)
    setObsLeft(screenWidth)
    setObsLeft2(screenWidth + screenWidth / 2 + 30)
    setObstNegHeight(0)
    setObstNegHeight2(0)
    setScore(0)
    setGameOver(false)
  }
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
      setUfoBottom(ufoBottom => ufoBottom + 60)
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
    } else {
      setObsLeft(screenWidth)
      setObstNegHeight(-Math.random() * 300)
      setScore(score=>score+1)
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
    } else {
      setObsLeft2(screenWidth)
      setObstNegHeight2(-Math.random() * 300)
      setScore(score=>score+1)
    }
  }, [obstLeft2])

  //coll
  useEffect(() => {
    if (
      ((ufoBottom < (obstNegHeight + obstacleHeight + 30) ||ufoBottom > (obstNegHeight + obstacleHeight + gap - 30)) &&
        (obstLeft > screenWidth / 2 - 30 && obstLeft < screenWidth / 2 + 30))||
      ((ufoBottom < (obstNegHeight2 + obstacleHeight + 30) ||
        ufoBottom > (obstNegHeight2 + obstacleHeight + gap - 30)) &&(obstLeft2 > screenWidth / 2 - 30 && obstLeft2 < screenWidth / 2 + 30))
    ) {

      stopGame()
    }
  })
  const stopGame = () => {
    clearInterval(timerId)
    clearInterval(obsTimerId)
    clearInterval(obsTimerId2)
    setGameOver(true)
  }
  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 40, color:'white'}}>{score}</Text>
        {gameOver &&<Button
        style={{color:'yellow'}}
        title="Restart"
        onPress={restart}
      />}
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

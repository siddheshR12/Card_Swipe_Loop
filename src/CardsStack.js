import React, { Component } from 'react';
import { Animated, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Component1 from './Component1';
import Component3 from './Component3';
import Component2 from './Component2';

const SCREEN_WIDTH = Dimensions.get('window').width;
let CARD_TOP = Dimensions.get('window').height * 0.1;
let CARD_LEFT = SCREEN_WIDTH * 0.055;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

class CardsStack extends Component {

  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: ()=> true,
      onPanResponderMove: (event, gesture) => {
        this.state.position.setValue({
          x: gesture.dx, y: gesture.dy
        })
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dx > SWIPE_THRESHOLD) {
            this.changeCardPostion(SCREEN_WIDTH);
        } 
        else if(gesture.dx < -SWIPE_THRESHOLD) {
          this.changeCardPostion(-SCREEN_WIDTH);
        } 
        else {
          this.resetPosition()
        }
      }
    })

    this.state = {
      panResponder,
      position: new Animated.ValueXY(),
      Components: [<Component1 textStyles={styles.TextStyle} compStyle={styles.innerCompStyle}/>, 
                   <Component2 textStyles={styles.TextStyle} compStyle={styles.innerCompStyle}/>, 
                   <Component3 textStyles={styles.TextStyle} compStyle={styles.innerCompStyle}/>],
      index: 0 
    }
  }

  changeCardPostion = (screenWidth) => {
    let {Components, index} = this.state;

    var oldArr = [...Components];
    var newArr = this.arraymove(oldArr, 0);
   
    this.setState({Components: newArr, index: index + (Components.length -1)}, ()=>{
            this.setToBottom(screenWidth)
          })
  }

  arraymove = (arr, fromIndex) => {
    var oldArr = [...arr];
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(oldArr.length-1, 0, element);

    return arr;
  } 

  setToBottom = (screenWidth) => {
    let {Components, index, position} = this.state;

    Animated.timing(position, {
      toValue: {x: screenWidth, y: 0},
      duration: 250
    }).start(()=>{
      Animated.timing(position, {
        toValue: {x: 0, y: 0},
        duration: 250
      }).start(()=>this.setState({index: index - (Components.length-1)}));
    });
  }

  resetPosition = () => { 
    Animated.spring(this.state.position, {
        toValue: {x: 0, y: 0}
    }).start();
  }

  getAnimStyle = () => {
    const {position} = this.state;

    const rotate = position.x.interpolate({
      inputRange:[-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange:["-10deg", "0deg", "10deg"]
    })

    return {
      ...this.state.position.getLayout(),
      transform: [{rotate}]
    }
  }

  render() {
    const {Components, index, panResponder} = this.state; 

    return Components.map((comp, i)=> {
      if(i == index) {
        return (
          <Animated.View 
            key={i}  
            style={[this.getAnimStyle(), styles.CardContainer, {position: "relative"}]} 
            {...panResponder.panHandlers} 
          >
            {comp}
          </Animated.View>
        )
      } 
      return (
          <Animated.View key={i} style={[styles.CardContainer, {top: CARD_TOP + (i*7.5), left:CARD_LEFT + (i*5.5)}]}>
            {comp}
          </Animated.View>)
    }).reverse()
  }


}

const styles = StyleSheet.create({
    CardContainer: {
      width: "90%",
      height: "80%",
      backgroundColor: "#fff",
      elevation: 4,
      position: "absolute",
      justifyContent: "center",
      alignItems: 'center'
    },
    TextStyle: {
      fontSize: 23, 
      fontWeight: "bold", 
      color:"#fff"
    },
    innerCompStyle: {
      width: "100%", 
      height: "100%",  
      justifyContent: "center", 
      alignItems: "center"
    }
  });

export default CardsStack;

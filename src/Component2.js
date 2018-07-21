import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Component2 extends Component {
  render() {
    const {textStyles, compStyle} = this.props

    return (
      <View style={[compStyle, {backgroundColor: "#705486"}]}>
        <Text style={textStyles}>Component2</Text>
      </View>
    );
  }
}

export default Component2;
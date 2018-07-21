import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Component3 extends Component {
  render() {
    const {textStyles, compStyle} = this.props

    return (
      <View style={[compStyle, {backgroundColor: "#638f71"}]}>
        <Text style={textStyles}>Component3</Text>
      </View>
    );
  }
}

export default Component3;
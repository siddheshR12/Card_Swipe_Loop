import React, { Component } from 'react';
import { View, Text,  } from 'react-native';

class Component1 extends Component {
  render() {
    const {textStyles, compStyle } = this.props

    return (
      <View style={[compStyle, {backgroundColor: "#e98b41"}]}>
        <Text style={textStyles}>Component1</Text>
      </View>
    );
  }
}

export default Component1;
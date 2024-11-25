// __mocks__/@expo/vector-icons.js
import React from 'react';
import { View, Text } from 'react-native';

export const AntDesign = function(props) {
  // Mocking AntDesign to return a View with a Text element as the icon
  return (
    <View>
      <Text>{props.name}</Text> {/* Just displaying the icon name for now */}
    </View>
  );
};

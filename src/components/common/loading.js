import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default Loading = ({size = 'small', color = '#0084ff'}, props) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={size} color={color} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

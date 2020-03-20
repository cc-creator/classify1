import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#2d66ac',
    padding: 15,
  },
  text: {fontSize: 30, color: 'white', textAlign: 'center'},
});

export default Header;

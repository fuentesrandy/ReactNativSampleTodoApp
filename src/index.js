import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import store from './store';
import Navigation from './navigation';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;
const IOSbarStyle = 'dark-content'; //'default' | 'light-content' | 'dark-content'

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar {...props} />
  </View>
);

const App = props => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MyStatusBar
          translucent
          hidden={false}
          barStyle={IOSbarStyle}
          height={styles.statusBar.height}
          backgroundColor={styles.statusBar.backgroundColor}
        />
        <Navigation />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#E1E1E1',
  }
});

export default App;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";


import AppNavigator from './navigation/AppNavigator';
import store from './redux/store';

export default function App() {
  return (
      <Provider store={store}>
          <AppNavigator />
      </Provider>
  );
}

const styles = StyleSheet.create({
});

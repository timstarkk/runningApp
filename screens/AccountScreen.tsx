import * as React from 'react';
import { StyleSheet } from 'react-native';

import CharacterScreenInfo from '../components/CharacterScreenInfo';
import { Text, View } from '../components/Themed';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <CharacterScreenInfo path="/screens/AccountScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { GestureHandlerRootView} from 'react-native-gesture-handler';

/**
 * BootList component renders a list of boots using a FlatList inside a GestureHandlerRootView.
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.bootList - An array of boot items to be displayed in the list.
 * @param {function} props.renderBoot - A function that renders a single boot item.
 * @returns {JSX.Element} The rendered component.
 */
export const BootList = ({ bootList, renderBoot }) => {
  return (
    <View style={styles.listStyle}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatlistContentContainer}
          keyExtractor={(item, index) => index.toString()}
          data={bootList}
          renderItem={renderBoot}
        />
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'yellow',
  },
  flatlistContentContainer: {
    paddingBottom: 20,
  },
});

//export default BootList;


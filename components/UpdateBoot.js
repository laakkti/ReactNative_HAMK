import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, View, Modal } from 'react-native';

/**
 * Component for updating a boot item.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.visibility - Visibility state of the modal.
 * @param {Function} props.updateItem - Function to handle updating the boot item.
 * @param {Object} props.itemToUpdate - The boot item to be updated.
 * @returns {JSX.Element} The UpdateBoot component.
 */
export const UpdateBoot = ({ visibility, updateItem, itemToUpdate }) => {
  
  /**
   * State to store the type of the boot.
   * @type {[string, Function]}
   */
  const [bootType, setBootType] = useState('');
  
  /**
   * State to store the size of the boot.
   * @type {[string, Function]}
   */
  const [bootSize, setBootSize] = useState('');

  useEffect(() => {
    if (itemToUpdate !== null) {
      console.log("itemToUpdate.size", itemToUpdate.size);
      setBootType(itemToUpdate.type === undefined ? '' : itemToUpdate.type);
      setBootSize(itemToUpdate.size === undefined ? '' : itemToUpdate.size);
    }
  }, [itemToUpdate]);

  return (
    <Modal visible={visibility}>
      <View style={styles.container}>
        <View style={styles.container2}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={enteredText => setBootType(enteredText)}
            value={bootType}
          />
          <View style={styles.buttonStyle}>
            <Button
              title="cancel"
              onPress={() => {
                updateItem(-1, null);
              }}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputStyle}
            onChangeText={enteredText => setBootSize(enteredText)}
            value={"" + bootSize}
          />
          <View style={styles.buttonStyle}>
            <Button title="ok" onPress={() => { updateItem(bootType, bootSize), console.log("xxxx ", bootSize) }} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 15,
  },
  container2: {
    alignItems: 'center',
    flex: 1,
  },
  buttonStyle: {
    margin: 2,
    padding: 5,
    width: '65%',
  },
  inputStyle: {
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: 2,
    margin: 2,
    padding: 10,
    width: '80%',
  },
});

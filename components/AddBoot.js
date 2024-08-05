import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Modal } from 'react-native';

/**
 * Component for adding a boot item.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.visibility - Visibility state of the modal.
 * @param {Function} props.addItem - Function to handle adding the boot item.
 * @returns {JSX.Element} The AddBoot component.
 */
export const AddBoot = ({ visibility, addItem }) => {

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

  /**
   * Function to clear the input fields.
   */
  const clearFields = () => {
    setBootType('');
    setBootSize('');
  }

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
                clearFields();
                addItem(-1, null);
              }}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputStyle}
            onChangeText={enteredText => setBootSize(enteredText)}
            value={bootSize}
          />
          <View style={styles.buttonStyle}>
            <Button title="ok" onPress={() => { clearFields(); addItem(bootType, bootSize); }} />
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

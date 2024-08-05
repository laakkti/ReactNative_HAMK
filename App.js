import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { AddBoot } from './AddBoot';
import { UpdateBoot } from './UpdateBoot';
import { init, addBoot, updateBoot, deleteBoot, fetchAllBoot } from './db';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

/**
 * Main App component.
 * @returns {JSX.Element} The main App component.
 */
const App = () => {
  /**
   * State to hold the list of boots.
   * @type {Array<Object>}
   */
  const [bootList, setBootList] = useState([]);

  /**
   * State to control the visibility of the AddBoot modal.
   * @type {boolean}
   */
  const [visibility, setVisibility] = useState(false);

  /**
   * State to control the visibility of the UpdateBoot modal.
   * @type {boolean}
   */
  const [updateVisibility, setUpdateVisibility] = useState(false);

  /**
   * State to hold the boot item to be updated.
   * @type {Object|null}
   */
  const [itemToUpdate, setItemToUpdate] = useState(null);

  /**
   * State to hold the index of the boot item to be updated.
   * @type {number}
   */
  const [itemToUpdateIndex, setItemToUpdateIndex] = useState(-1);

  /**
   * State to trigger re-fetching of the boot list.
   * @type {boolean}
   */
  const [updateBootList, setUpdateBootList] = useState(false);

  /**
   * State to hold the selected boot items.
   * @type {Object}
   */
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    console.log('useEffect');
    readAllBoot();
  }, [updateBootList]);

  /**
   * Toggles the checkbox for the selected boot.
   * @param {number} id - The ID of the boot to toggle.
   */
  const toggleCheckbox = id => {
    setSelectedItems(selectedItems => {
      const tmp = {
        ...selectedItems,
        [id]: !selectedItems[id],
      };
      return tmp;
    });
  };

  /**
   * Removes a boot from the selected list.
   * @param {number} id - The ID of the boot to remove.
   */
  const removeItemFromSelectedList = id => {
    const tmp = selectedItems;
    delete tmp[id];
    setSelectedItems(tmp);
  };

  /**
   * Saves a new boot to the database.
   * @param {string} type - The type of the boot.
   * @param {string} size - The size of the boot.
   */
  async function saveBoot(type, size) {
    try {
      const dbResult = await addBoot(type, size);
    } catch (err) {
      console.log(err);
    } finally {
      // No need to do anything
    }
  }

  /**
   * Deletes a boot from the database.
   * @param {number} id - The ID of the boot to delete.
   */
  async function deleteBootFromDb(id) {
    try {
      const dbResult = await deleteBoot(id);
    } catch (err) {
      console.log(err);
    } finally {
      // No need to do anything
    }
  }

  /**
   * Updates a boot in the database.
   * @param {number} id - The ID of the boot to update.
   * @param {string} type - The new type of the boot.
   * @param {string} size - The new size of the boot.
   * @param {number} archive - The archive status of the boot.
   */
  async function updateBootInDb(id, type, size, archive) {
    try {
      const dbResult = await updateBoot(id, type, size, archive);
    } catch (err) {
      console.log(err);
    } finally {
      // No need to do anything
    }
  }

  /**
   * Fetches all boots from the database.
   */
  async function readAllBoot() {
    try {
      const dbResult = await fetchAllBoot();
      console.log('dbResult readAllBoot in App.js');
      console.log(dbResult);
      setBootList(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
      console.log('All Boots read.');
    }
  }

  /**
   * Updates the selected boot.
   * @param {string} type - The new type of the boot.
   * @param {string} size - The new size of the boot.
   */
  const updateItem = (type, size) => {
    if (itemToUpdateIndex > -1) {
      let id = bootList[itemToUpdateIndex].id;
      let archive = bootList[itemToUpdateIndex].archive;
      updateBootInDb(id, type, size, archive);
      setUpdateVisibility(false);
      setUpdateBootList(!updateBootList);
    }
  };

  /**
   * Shows the update modal for the selected boot.
   * @param {number} updateIndex - The index of the boot to update.
   */
  const updateItemModal = updateIndex => {
    setItemToUpdateIndex(updateIndex);
    setItemToUpdate(bootList[updateIndex]);
    setUpdateVisibility(true);
  };

  /**
   * Adds a new boot.
   * @param {string} type - The type of the boot.
   * @param {string} size - The size of the boot.
   */
  const addItem = (type, size) => {
    saveBoot(type, size);
    setVisibility(false);
    setUpdateBootList(!updateBootList);
  };

  /**
   * Deletes a boot.
   * @param {number} id - The ID of the boot to delete.
   */
  const deleteItem = id => {
    removeItemFromSelectedList(id);
    deleteBootFromDb(id);
    setUpdateBootList(!updateBootList);
  };

  /**
   * Renders a boot item.
   * @param {Object} param0 - The item and index to render.
   * @param {Object} param0.item - The boot item.
   * @param {number} param0.index - The index of the boot item.
   * @returns {JSX.Element} The rendered boot item.
   */
  const renderBoot = ({ item, index }) => {
    const handleSwipeableOpen = id => {
      console.log('Swipe Action', `Swiped to delete ${id}`);
      setBootList([]);
      deleteItem(id);
    };

    /**
     * Renders the right actions for swipeable item.
     * @param {number} progress - The progress of the swipe.
     * @param {number} dragX - The drag distance.
     * @returns {JSX.Element} The right action component.
     */
    const renderRightActions = (progress, dragX) => {
      return (
        <View style={styles.rightAction}>
          <Text style={styles.actionText}> will be deleted </Text>
        </View>
      );
    };

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleSwipeableOpen(item.id)}>
        <View style={styles.rowContainer}>
          <View>
            <CheckBox
              tintColors={{ true: '#0000FF', false: '#000000' }}
              onValueChange={() => toggleCheckbox(item.id)}
              value={selectedItems[item.id]}
            />
          </View>
          <TouchableOpacity
            key={index}
            style={styles.touchableStyle}
            activeOpacity={0.8}
            onPress={() => updateItemModal(index)}
            onLongPress={() => deleteAlert(index)}>
            <View style={styles.listItemStyle}>
              <Text>
                {item.type}: {item.size}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  /**
   * Shows a delete alert.
   * @param {number} index - The index of the boot to delete.
   */
  const deleteAlert = index =>
    Alert.alert('Delete an item?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Archive',
        onPress: () =>
          updateBootInDb(
            bootList[index].id,
            bootList[index].type,
            bootList[index].size,
            1,
          ),
      },
      {
        text: 'OK',
        onPress: () => deleteItem(bootList[index].id),
      },
    ]);

  /**
   * Gets all IDs of selected boots.
   * @returns {number[]} The list of selected boot IDs.
   */
  const getSelectedItemIds = () => {
    return Object.entries(selectedItems)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => id);
  };

  /**
   * Deletes all selected boots.
   */
  const deleteSelectedItems = () => {
    const selectedItemIds = getSelectedItemIds();
    selectedItemIds.forEach(id => {
      deleteItem(id);
    });
    setSelectedItems({});
  };

  const hasCheckedItems = Object.values(selectedItems).some(value => value);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button
              title="Add Boot"
              onPress={() => {
                setVisibility(true);
              }}
            />
          </View>
          {hasCheckedItems && (
            <View style={styles.buttonStyle}>
              <Button
                title="Delete"
                onPress={() => {
                  deleteSelectedItems();
                }}
              />
            </View>
          )}
        </View>

        <AddBoot visibility={visibility} addItem={addItem} />
        <UpdateBoot
          visibility={updateVisibility}
          updateItem={updateItem}
          itemToUpdate={itemToUpdate}
        />

        <Text style={styles.title}>Boot List</Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '80%',
    flex: 1,
    backgroundColor: 'yellow',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableStyle: {
    flex: 1,
  },
  listItemStyle: {
    backgroundColor: 'lightgreen',
    paddingLeft: 7,
    marginRight: 5,
  },
  flatlistContentContainer: {
    paddingBottom: 20,
  },
  listStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'yellow',
  },
  rightAction: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    color: 'yellow',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default App;

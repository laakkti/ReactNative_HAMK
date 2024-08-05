import React, {useState, useEffect} from 'react';
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
import {AddBoot} from './components/AddBoot';
import {UpdateBoot} from './components/UpdateBoot';
import {init, addBoot, updateBoot, deleteBoot, fetchAllBoot} from './components/db';
import {Swipeable} from 'react-native-gesture-handler';
import {BootList} from './components/BootList'; // Import the new component
import {DeleteAlert} from './components/DeleteAlert';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

/**
 * App component renders the main application with boot management features.
 *
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  /**
   * @type {[Array, Function]} bootList - State variable for storing the list of boots.
   */
  const [bootList, setBootList] = useState([]);

  /**
   * @type {[boolean, Function]} visibility - State variable for controlling the visibility of the AddBoot modal.
   */
  const [visibility, setVisibility] = useState(false);

  /**
   * @type {[boolean, Function]} updateVisibility - State variable for controlling the visibility of the UpdateBoot modal.
   */
  const [updateVisibility, setUpdateVisibility] = useState(false);

  /**
   * @type {[Object|null, Function]} itemToUpdate - State variable for storing the boot item to be updated.
   */
  const [itemToUpdate, setItemToUpdate] = useState(null);

  /**
   * @type {[number, Function]} itemToUpdateIndex - State variable for storing the index of the boot item to be updated.
   */
  const [itemToUpdateIndex, setItemToUpdateIndex] = useState(-1);

  /**
   * @type {[boolean, Function]} updateBootList - State variable for triggering re-fetch of the boot list.
   */
  const [updateBootList, setUpdateBootList] = useState(false);

  /**
   * @type {[Object, Function]} selectedItems - State variable for storing the selected boot items.
   */
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {  
    readAllBoot();
  }, [updateBootList]);

  /**
   * Toggles the checkbox selection state for a given boot item.
   *
   * @param {number} id - The ID of the boot item to toggle.
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
   * Removes an item from the selected items list.
   *
   * @param {number} id - The ID of the boot item to remove from the selected list.
   */
  const removeItemFromSelectedList = id => {
    const tmp = selectedItems;
    delete tmp[id];
    setSelectedItems(tmp);
  };

  /**
   * Saves a new boot item to the database.
   *
   * @param {string} type - The type of the boot.
   * @param {string} size - The size of the boot.
   */
  async function saveBoot(type, size) {
    try {
      const dbResult = await addBoot(type, size);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes a boot item from the database.
   *
   * @param {number} id - The ID of the boot item to delete.
   */
  async function deleteBootFromDb(id) {
    try {
      const dbResult = await deleteBoot(id);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Updates an existing boot item in the database.
   *
   * @param {number} id - The ID of the boot item to update.
   * @param {string} type - The type of the boot.
   * @param {string} size - The size of the boot.
   * @param {boolean} archive - Whether the boot item is archived.
   */
  async function updateBootInDb(id, type, size, archive) {
    try {
      const dbResult = await updateBoot(id, type, size, archive);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches all boot items from the database and updates the state.
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
   * Updates a boot item in the state and database.
   *
   * @param {string} type - The type of the boot.
   * @param {string} size - The size of the boot.
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
   * Opens the update modal for a boot item.
   *
   * @param {number} updateIndex - The index of the boot item to update.
   */
  const updateItemModal = updateIndex => {
    setItemToUpdateIndex(updateIndex);
    setItemToUpdate(bootList[updateIndex]);
    setUpdateVisibility(true);
  };

  /**
   * Adds a new boot item and updates the state.
   *
   * @param {string} type - The type of the boot.
   * @param {string} size - The size of the boot.
   */
  const addItem = (type, size) => {
    saveBoot(type, size);
    setVisibility(false);
    setUpdateBootList(!updateBootList);
  };

  /**
   * Deletes a boot item and updates the state.
   *
   * @param {number} id - The ID of the boot item to delete.
   */
  const deleteItem = (id) => {
    removeItemFromSelectedList(id);
    deleteBootFromDb(id);
    setUpdateBootList(!updateBootList);
  };

  /**
   * Renders a single boot item.
   *
   * @param {Object} param0 - The item and index to render.
   * @param {Object} param0.item - The boot item to render.
   * @param {number} param0.index - The index of the boot item.
   * @returns {JSX.Element} The rendered boot item.
   */
  const renderBoot = ({item, index}) => {
    /**
     * Handles the swipeable open action.
     *
     * @param {number} id - The ID of the boot item to handle.
     */
    const handleSwipeableOpen = id => {
      console.log('Swipe Action', `Swiped to delete ${id}`);
      setBootList([]);
      deleteItem(id);
    };

    /**
     * Renders the right swipeable actions.
     *
     * @param {number} progress - The progress of the swipe.
     * @param {number} dragX - The drag distance of the swipe.
     * @returns {JSX.Element} The rendered right action view.
     */
    const renderRightActions = (progress, dragX) => {
      return (
        <View style={styles.rightAction}>
          <Text style={styles.actionText}> will be deleted </Text>
        </View>
      );
    };

    // onLongPress={() => deleteAlert(index)}>
    // 
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleSwipeableOpen(item.id)}>
        <View style={styles.rowContainer}>
          <View>
            <CheckBox
              tintColors={{true: '#0000FF', false: '#000000'}}
              onValueChange={() => toggleCheckbox(item.id)}
              value={selectedItems[item.id]}
            />
          </View>
          <TouchableOpacity
            key={index}
            style={styles.touchableStyle}
            activeOpacity={0.8}
            onPress={() => updateItemModal(index)}
            onLongPress={() =>  DeleteAlert({
              item:bootList[index], onDelete:deleteItem, onArchive:updateBootInDb})}>
          
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
   * Displays an alert to confirm deletion of a boot item.
   *
   * @param {number} index - The index of the boot item to delete.
   */  
  const deleteAlert = index =>
    Alert.alert(`Delete an item ${bootList[index].type}?`, '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Archive',
        onPress: () => {
          updateBootInDb(
            bootList[index].id,
            bootList[index].type,
            bootList[index].size,
            1,
          )},
      },
      {
        text: 'OK',
        onPress: () => deleteItem(bootList[index].id),
      },
    ]);

  /**
   * Gets the IDs of the selected boot items.
   *
   * @returns {number[]} An array of selected boot item IDs.
   */
  const getSelectedItemIds = () => {
    return Object.entries(selectedItems)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => id);
  };

  /**
   * Deletes the selected boot items.
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
        {bootList.length > 0 && <Text style={styles.title}>Boot List</Text>}
        <BootList bootList={bootList} renderBoot={renderBoot} />
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
    marginTop: 5,
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
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default App;

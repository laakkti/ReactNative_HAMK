## Additional Libraries

#### for local SQL-database
"react-native-sqlite-storage": "^6.0.1"

```
npm i react-native-sqlite-storage
```

#### for checkbox use

"@react-native-community/checkbox": "^0.5.17"
```
npm i @react-native-community/checkbox
```

"react-native-vector-icons": "^10.1.0"
```
npm in react-native-vector-icons
```


#### for swipeable behaviour 
"react-native-gesture-handler": "^2.18.0"

```
npm i react-native-gesture-handler
```

## Components

#### db.js
local database 
methods: init, addBoot, updateBoot, deleteBoot, fetchAllBoot

#### BootList.js
List for the boots

```
<BootList bootList={bootList} renderBoot={renderBoot}/>
```

#### AddBoot.js
Modal dialog for adding new items

```
<AddBoot visibility={visibility} addItem={addItem}/>
```
#### UpdateBoot.js
Modal dialog for updating selected items by onPress

```
<UpdateBoot
    visibility={updateVisibility}
    updateItem={updateItem}
    itemToUpdate={itemToUpdate}
/>
```

#### DeleteAlert.js
Alert dialog for delete or archive selected item.
Called as a function.

```
DeleteAlert({item:bootList[index], onDelete:deleteItem, onArchive:updateBootInDb})
```


## use cases

#### AddItem

<p>
<img src="./img/p1.png" alt="" width="200"/>
<img src="./img/p2.png" alt="" width="200"/>
<img src="./img/p3.png" alt="" width="200"/>
</p>

Component AddBoot need to be imported to App.js

``` 
import {AddBoot} from './components/AddBoot';
```

./App.js
```
<Button
   title="add boot"
   onPress={() => {setVisibility(true);}}
/>
```

<AddBoot visibility={visibility} addItem={addItem} />

./components/AddBoot.js

Modal
-> addItem (App.js)
   -> saveBoot
      addBoot (db.js)    

#### UpdateItem

onPress
Winter boot size is changed from 45 to 44

<p>
<img src="./img/p4.png" alt="" width="200"/>
<img src="./img/p5.png" alt="" width="200"/>
<img src="./img/p6.png" alt="" width="200"/>
</p>

Flatlist
  renderBoot 
  onPress={() => updateItemModal(index)}

./UpdateBoot.js
Modal
-> updateItem (App.js)
  -> updateBootInDb
     updateBoot (db.js)
     

#### Delete item by Alert component
db:n tauluun boots lisätty archive kenttä, arvo joko 0 tai 1

<p>
<img src="./img/p7.png" alt="" width="200"/>
<img src="./img/p8.png" alt="" width="200"/>
<img src="./img/p9.png" alt="" width="200"/>
</p>

#### Archive item by Alert component

<p>
<img src="./img/p10.png" alt="" width="200"/>
<img src="./img/p11.png" alt="" width="200"/>
<img src="./img/p12.png" alt="" width="600"/>
</p>

Flatlist
  renderBoot 
  onLongPress={()=>deleteAlert(index)}
    
    archive -> onPress: () =>updateBootInDb(bootList[index].id, bootList[index].type, bootList[index].size, 1) (archive = 1)
                              updateBoot (db.js)

    ok -> onPress: () => deleteItem(bootList[index].id)}
                             removeItemFromSelectedList(id);
                             deleteBootFromDb(id); 
                                 deleteBoot(id) (db.js)

#### Delete item by swiping left

<p>
<img src="./img/p13.png" alt="" width="200"/>
<img src="./img/p14.png" alt="" width="200"/>
<img src="./img/p15.png" alt="" width="200"/>
<img src="./img/p16.png" alt="" width="200"/>
</p>

if item is selected by checkbox it will be removed from selectedlist too.

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';


<GestureHandlerRootView style={{ flex: 1 }}>
   <FlatList


FlatList
renderBoot 
<Swipeable renderRightActions={renderRightActions} onSwipeableOpen={() => handleSwipeableOpen(item.id)}>


UI for swipeable
const renderRightActions = (progress, dragX) => {
      
      return (
        <View style={styles.rightAction}>
          <Text style={styles.actionText}> will be deleted </Text>
          
        </View>

      );
    };


handleSwipeableOpen
      setBootList([]);
      deleteItem(id);
            removeItemFromSelectedList(id);
           deleteBootFromDb(id);  
               deleteBoot(id); (db.js)


## Delete selected items (checkbox)

When some item selected delete button will be shown otherwise delete button is not shown.

<p>
<img src="./img/p17.png" alt="" width="200"/>
<img src="./img/p18.png" alt="" width="200"/>
<img src="./img/p19.png" alt="" width="200"/>
</p>


import CheckBox from '@react-native-community/checkbox';

OBJECT type
const [selectedItems, setSelectedItems] = useState({});  

FlatList
renderBoot

<CheckBox
   onValueChange={() => toggleCheckbox(item.id)}
                       setSelectedItems (useState set)  

   value={selectedItems[item.id]}  (checked or not)

if some checked button delete will appear <(tähän kuva)>
TEE Aniomation gif!!!!!

{hasCheckedItems && (
            <View style={styles.buttonStyle}>
              <Button
                title="delete"
                onPress={() => {
                  deleteSelectedItems();
                }}
              />
            </View>
)}

Button
   onPress={() => { deleteSelectedItems()}};
                        loop
                         deleteItem(id);
                           removeItemFromSelectedList(id);
                                 deleteBootFromDb(id);  
                                       deleteBoot(id); (db.js)


## update fatList



useEffect

dependency (muuttuja updateList)

```
useEffect(() => {  
    readAllBoot();
  }, [updateBootList]);
```

setBootList will be caused the rerendering the display

readAllBoot
  const dbResult = await fetchAllBoot();
  setBootList(dbResult);
    
luetaan kannasta kaikki tiedost taulusta boots ja asetetaan useState muuttujaan 


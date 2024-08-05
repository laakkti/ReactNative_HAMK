
Pitäisikö laittaa flatlist kaikkinenn komponentiksi (jolloin  swipeable, sekä checkbox samassa), samoin deleteAlert sekä 
Emulaattorissa voi kamera ikoni napsia kuvi näytöstä

Work
Hiking
Winter
Rain
Snow
Cowboy
Riding


## use cases

## Local DataBase

./db.js was provided

## AddItem

<img src="./img/p1.png" alt="" width="200"/>
<img src="./img/p2.png" alt="" width="200"/>
<img src="./img/p3.png" alt="" width="200"/>


./App.js
```
<Button
   title="add boot"
   onPress={() => {setVisibility(true);}}
/>
```

./AddBoot.js
Modal
-> addItem (App.js)
   -> saveBoot
      addBoot (db.js)    

## UpdateItem

onPress
Winter boot size is changed from 45 to 44

<img src="./img/p4.png" alt="" width="200"/>
<img src="./img/p5.png" alt="" width="200"/>
<img src="./img/p6.png" alt="" width="200"/>


Flatlist
  renderBoot 
  onPress={() => updateItemModal(index)}

./UpdateBoot.js
Modal
-> updateItem (App.js)
  -> updateBootInDb
     updateBoot (db.js)
     

## DeleteItem/ArchiveItem by Alert component
db:n tauluun boots lisätty archive kenttä, arvo joko 0 tai 1

Delete

<img src="./img/p7.png" alt="" width="200"/>
<img src="./img/p8.png" alt="" width="200"/>
<img src="./img/p9.png" alt="" width="200"/>


Archive

<img src="./img/p10.png" alt="" width="200"/>
<img src="./img/p11.png" alt="" width="200"/>
<img src="./img/p12.png" alt="" width="600"/>




Flatlist
  renderBoot 
  onLongPress={()=>deleteAlert(index)}
    
    archive -> onPress: () =>updateBootInDb(bootList[index].id, bootList[index].type, bootList[index].size, 1) (archive = 1)
                              updateBoot (db.js)

    ok -> onPress: () => deleteItem(bootList[index].id)}
                             removeItemFromSelectedList(id);
                             deleteBootFromDb(id); 
                                 deleteBoot(id) (db.js)

## DeleteItem by swipe

<img src="./img/p13.png" alt="" width="200"/>
<img src="./img/p14.png" alt="" width="200"/>
<img src="./img/p15.png" alt="" width="200"/>
<img src="./img/p16.png" alt="" width="200"/>

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
<img src="./img/p17.png" alt="" width="200"/>
<img src="./img/p18.png" alt="" width="200"/>
<img src="./img/p19.png" alt="" width="200"/>



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


--------------------------------------------------------

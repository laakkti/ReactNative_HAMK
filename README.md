## Additional packages/libraries

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


## Use cases

#### Add item

<p>
<img src="./img/p1.png" alt="" width="200"/>
<img src="./img/p2.png" alt="" width="200"/>
<img src="./img/p3.png" alt="" width="200"/>
</p>


#### Update item

"onPress" at item will launch a modal dialog

Winter boot size is changed value size from 45 to 44 to the database

<p>
<img src="./img/p4.png" alt="" width="200"/>
<img src="./img/p5.png" alt="" width="200"/>
<img src="./img/p6.png" alt="" width="200"/>
</p>
     
#### Delete item by Alert component

"onLongPress" at item will launch an alert dialog and selecting choice delete will remove item from the database

<p>
<img src="./img/p7.png" alt="" width="200"/>
<img src="./img/p8.png" alt="" width="200"/>
<img src="./img/p9.png" alt="" width="200"/>
</p>

#### Archive item by Alert component

onLongPress at item will launch an alert dialog and selecting choice arcive will add archive value to 1 to the database

<p>
<img src="./img/p10.png" alt="" width="200"/>
<img src="./img/p11.png" alt="" width="200"/>
<img src="./img/p12.png" alt="" width="600"/>
</p>

#### Delete item by swiping left

<p>
<img src="./img/p13.png" alt="" width="200"/>
<img src="./img/p14.png" alt="" width="200"/>
<img src="./img/p15.png" alt="" width="200"/>
<img src="./img/p16.png" alt="" width="200"/>
</p>

if item is selected by checkbox it will be removed from selectedlist too.


#### Delete selected items (checkboxes)

When some item is selected the button delete will be shown otherwise button delete is not shown. By button delete all selected items will  been remove from the database.

<p>
<img src="./img/p17.png" alt="" width="200"/>
<img src="./img/p18.png" alt="" width="200"/>
<img src="./img/p19.png" alt="" width="200"/>
</p>

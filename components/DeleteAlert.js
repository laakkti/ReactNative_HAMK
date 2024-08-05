import React from 'react';
import { Alert } from 'react-native';

/**
 * Shows an alert with options to delete or archive an item.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.item - The item to be deleted or archived.
 * @param {string} props.item.id - The ID of the item.
 * @param {string} props.item.type - The type of the item.
 * @param {number} props.item.size - The size of the item.
 * @param {Function} props.onDelete - The function to call when the item is to be deleted.
 * @param {Function} props.onArchive - The function to call when the item is to be archived.
 * @returns {null} Always returns null as it only shows an alert.
 */
export const DeleteAlert = ({ item, onDelete, onArchive }) => {
  Alert.alert(`Delete an item ${item.type}?`, '', [
    {
      text: 'Cancel',
    },
    {
      text: 'Archive',
      onPress: () => onArchive(item.id, item.type, item.size, 1),
    },
    {
      text: 'OK',
      onPress: () => onDelete(item.id),
    },
  ]);

  return null;
};



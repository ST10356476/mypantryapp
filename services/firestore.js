import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const pantryCollection = collection(db, 'pantry');

// Add a pantry item
export const addPantryItem = async (item) => {
  try {
    await addDoc(pantryCollection, item);
  } catch (error) {
    console.error('Error adding pantry item: ', error);
  }
};

// Get all pantry items
export const getPantryItems = async () => {
  try {
    const querySnapshot = await getDocs(pantryCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting pantry items: ', error);
  }
};

// Update a pantry item
export const updatePantryItem = async (id, updatedItem) => {
  try {
    const pantryDoc = doc(db, 'pantry', id);
    await updateDoc(pantryDoc, updatedItem);
  } catch (error) {
    console.error('Error updating pantry item: ', error);
  }
};

// Delete a pantry item
export const deletePantryItem = async (id) => {
  try {
    const pantryDoc = doc(db, 'pantry', id);
    await deleteDoc(pantryDoc);
  } catch (error) {
    console.error('Error deleting pantry item: ', error);
  }
};

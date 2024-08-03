import { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, IconButton, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getPantryItems, addPantryItem, updatePantryItem, deletePantryItem } from '../services/firestore';
import withAuth from '../hoc/withAuth';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pantryItems = await getPantryItems();
        setItems(pantryItems);
      } catch (err) {
        setError('Failed to fetch pantry items.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.trim()) return; // Prevent adding empty items

    try {
      setLoading(true);
      await addPantryItem({ name: newItem });
      setNewItem('');
      const pantryItems = await getPantryItems();
      setItems(pantryItems);
    } catch (err) {
      setError('Failed to add new item.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id) => {
    if (!editingText.trim()) return; // Prevent updating with empty text

    try {
      setLoading(true);
      await updatePantryItem(id, { name: editingText });
      setEditingItem(null);
      setEditingText('');
      const pantryItems = await getPantryItems();
      setItems(pantryItems);
    } catch (err) {
      setError('Failed to update item.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      setLoading(true);
      await deletePantryItem(id);
      const pantryItems = await getPantryItems();
      setItems(pantryItems);
    } catch (err) {
      setError('Failed to delete item.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pantry Items
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              {editingItem === item.id ? (
                <TextField
                  fullWidth
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <ListItemText primary={item.name} />
              )}
              {editingItem === item.id ? (
                <IconButton edge="end" aria-label="update" onClick={() => handleUpdateItem(item.id)}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton edge="end" aria-label="edit" onClick={() => { setEditingItem(item.id); setEditingText(item.name); }}>
                  <EditIcon />
                </IconButton>
              )}
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <TextField
        fullWidth
        label="New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddItem} disabled={loading}>
        Add Item
      </Button>
    </Container>
  );
};

export default withAuth(Pantry);

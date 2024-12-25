import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputBase,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

export default function SearchDialog({ open, onClose }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      width="80vm"
      PaperProps={{
        // sx: {
        //   borderRadius: '16px',
        //   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        //   bgcolor: 'background.paper',
        // },
      }}
    >
      <DialogTitle sx={{
            borderBottom: '1px solid #E0E0E0', padding:1
        }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" >
          <InputBase
            placeholder="Search chats..."
            value={search}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              fontSize: '1rem',
            //   bgcolor: 'grey.100',
              borderRadius: '8px',
              px: 2,
              py: 1,
              outline: 'none',
              
            }}
          />
          <Typography
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              ml: 2,
              fontWeight: 'bold',
              color: 'text.secondary',
              marginRight:3
            }}
          >
            X
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Today
          </Typography>
          <ListItem button>
            <ListItemText primary="New Chat" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Hi There Query" />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Yesterday
          </Typography>
          <ListItem button>
            <ListItemText primary="React Code Fix" />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Previous 7 Days
          </Typography>
          <ListItem button>
            <ListItemText primary="SP Actions Excel Organization" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

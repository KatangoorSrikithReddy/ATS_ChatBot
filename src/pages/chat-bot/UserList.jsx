import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

// third-party
import { Chance } from 'chance';

// project-imports
import UserAvatar from './UserAvatar';
import Dot from 'components/@extended/Dot';
import { useGetUsers } from 'api/chat';

// assets
import { TickCircle } from 'iconsax-react';

const chance = new Chance();

// ==============================|| CHAT - USER LIST ||============================== //

const dummyData =

[
  {
    "chat_id": "1",
    "title": "ChatDrawer Component Overview",
    "created_at": "2024-12-24T10:00:00Z",
    "updated_at": "2024-12-24T10:30:00Z",
    "participants": ["user", "assistant"],
    "messages": [
      {
        "role": "user",
        "timestamp": "2024-12-24T10:00:05Z",
        "content": "Can you explain the ChatDrawer component?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T10:05:00Z",
        "content": "The `ChatDrawer` component is a React functional component that manages the layout and functionality of a drawer in a chat interface. It uses Material-UI components for styling and layout."
      },
      {
        "role": "user",
        "timestamp": "2024-12-24T10:10:00Z",
        "content": "What props does it take?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T10:15:00Z",
        "content": "The `ChatDrawer` component takes the following props:\n1. `handleDrawerOpen`: A function to handle the drawer toggle.\n2. `openChatDrawer`: A boolean or other value indicating whether the drawer is open.\n3. `setUser`: A function to set the currently selected user.\n4. `selectedUser`: The currently selected user, either a string or any type."
      },
      {
        "role": "user",
        "timestamp": "2024-12-24T10:20:00Z",
        "content": "Can you elaborate on its internal state?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T10:25:00Z",
        "content": "The component manages the following internal state using React's `useState` hook:\n1. `open`: A boolean indicating whether the search dialog is open.\n2. `anchorEl`: The anchor element for the menu used to set user status.\n3. `status`: A string representing the current user status, defaulting to 'available'.\n4. `search`: A string for managing the search input value."
      }
    ]
  },
  {
    "chat_id": "2",
    "title": "Material-UI Integration",
    "created_at": "2024-12-24T11:00:00Z",
    "updated_at": "2024-12-24T11:30:00Z",
    "participants": ["user", "assistant"],
    "messages": [
      {
        "role": "user",
        "timestamp": "2024-12-24T11:00:05Z",
        "content": "How does the component use Material-UI?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T11:05:00Z",
        "content": "The `ChatDrawer` component uses Material-UI for its layout and styling. Some key components include:\n- `Drawer`: For the sliding drawer layout.\n- `Box` and `Stack`: For flexbox-based styling.\n- `Typography`: For text elements.\n- `Menu` and `MenuItem`: For dropdown menus.\n- `useTheme` and `useMediaQuery`: For responsive and theme-based styling."
      },
      {
        "role": "user",
        "timestamp": "2024-12-24T11:15:00Z",
        "content": "Can you explain how the drawer is styled?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T11:20:00Z",
        "content": "The drawer's styling is managed through the `sx` prop in Material-UI. Key styling includes:\n- Conditional width and height based on screen size using `useMediaQuery`.\n- Dynamic background color (`drawerBG`) based on the theme mode.\n- Rounded borders and no internal shadows when the drawer is persistent."
      }
    ]
  },
  {
    "chat_id": "3",
    "title": "User Interaction and Props Validation",
    "created_at": "2024-12-24T12:00:00Z",
    "updated_at": "2024-12-24T12:30:00Z",
    "participants": ["user", "assistant"],
    "messages": [
      {
        "role": "user",
        "timestamp": "2024-12-24T12:00:05Z",
        "content": "How does the component handle user interactions?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T12:05:00Z",
        "content": "The component provides user interactions for:\n1. Opening and closing the drawer using `handleDrawerOpen`.\n2. Setting the user status via a dropdown menu triggered by `handleClickRightMenu`.\n3. Searching through users by capturing input in the `search` state and handling it with `handleSearch`."
      },
      {
        "role": "user",
        "timestamp": "2024-12-24T12:10:00Z",
        "content": "How is prop validation implemented?"
      },
      {
        "role": "assistant",
        "timestamp": "2024-12-24T12:15:00Z",
        "content": "Prop validation is implemented using `PropTypes` to ensure type safety. Each prop has a defined type, such as `func` for functions and `oneOfType` for values that can have multiple types. For example, `openChatDrawer` can be either a `bool` or `any` type."
      }
    ]
  }
]

export default function UserList({ setUser, search, selectedUser }) {
  const theme = useTheme();

  const [data, setData] = useState([]);

  const { usersLoading, users } = useGetUsers();

  useEffect(() => {
    if (!usersLoading) {
      let result = users;
      if (search) {
        result = users.filter((row) => {
          let matches = true;

          const properties = ['name'];
          let containsQuery = false;

          properties.forEach((property) => {
            if (row[property].toString().toLowerCase().includes(search.toString().toLowerCase())) {
              containsQuery = true;
            }
          });

          if (!containsQuery) {
            matches = false;
          }
          return matches;
        });
      }
      setData(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoading, search]);


   const [filteredData, setFilteredData] = useState(dummyData);
    console.log("this is users dummydata#########", filteredData)
  
    useEffect(() => {
      let result = dummyData;
  
      if (search) {
        result = dummyData.filter((chat) =>
          chat.title.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      setFilteredData(result);
    }, [search]);




  if (usersLoading)
    return (
      <List>
        {[1, 2, 3, 4, 5].map((index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton animation="wave" height={24} />}
              secondary={<Skeleton animation="wave" height={16} width="60%" />}
            />
          </ListItem>
        ))}
      </List>
    );

  return (
    <List component="nav">
      {filteredData.map((user) => (
        <Fragment key={user.client_id} sx={{ bgcolor: 'transparent'}}>
          <ListItemButton
            sx={{
              pl: 0,
              borderRadius: 0,
              '&:hover': {
                borderRadius: 1,
                bgcolor: 'transparent', // Ensure no background color on hover
              },
              '&.Mui-selected': {
                bgcolor: 'transparent', // Remove selected background color
                '&:hover': {
                  bgcolor: 'transparent', // Remove hover effect when selected
                  
                },
              },
              bgcolor: user.client_id === selectedUser ? 'rgb(146, 41, 41)' : 'transparent', // Grey color for selected, transparent for others
            }}
            onClick={() => {
              setUser(user);
            }}
            selected={user.client_id === selectedUser}
          >
           <ListItemText
              primary={
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} >
                 <Typography
                    variant="subtitle"
                      color="text.primary"
                      sx={{
                        overflow: 'hidden',
                       
                        fontSize: '13px',
                        fontFamily: 'Aptos(Body)', // Apply Aptos font
                        
                        
                      }}
                    >
                      {user.title}
                    </Typography>

                </Stack>
              }
             
            />
          </ListItemButton>
          {/* <Divider /> */}
        </Fragment>
      ))}
    </List>
  );
}

UserList.propTypes = {
  setUser: PropTypes.func,
  search: PropTypes.string,
  selectedUser: PropTypes.oneOfType([PropTypes.any, PropTypes.string])
};

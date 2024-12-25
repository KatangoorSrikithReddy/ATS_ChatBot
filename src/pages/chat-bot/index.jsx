import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Popper from '@mui/material/Popper';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// third-party
import EmojiPicker, { SkinTones } from 'emoji-picker-react';

// project-imports
import ChatDrawer from './ChatDrawer';
import ChatHistory from 'pages/chat/chat/ChatHistory';
import ChatHeader from 'pages/chat/chat/ChatHeader';
import UserDetails from 'pages/chat/chat/UserDetails';

import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { PopupTransition } from 'components/@extended/Transitions';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';
import MoreIcon from 'components/@extended/MoreIcon';

import { ThemeDirection, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { openSnackbar } from 'api/snackbar';
import { insertChat, useGetUsers } from 'api/chat';
import incrementer from 'utils/incrementer';

import {
    Add,
    Call,
    Camera,
    DocumentDownload,
    EmojiHappy,
    Image,
    InfoCircle,
    Paperclip,
    Send,
    Trash,
    VolumeHigh,
    VolumeMute
  } from 'iconsax-react';
const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
   
    marginLeft: 0
  })
}));

// ==============================|| SAMPLE PAGE ||============================== //

export default function Chat() {

    const theme = useTheme();
      const { themeDirection } = useConfig();
      const { usersLoading, users } = useGetUsers();
    
      const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));
      const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
      const [emailDetails, setEmailDetails] = useState(false);
      const [user, setUser] = useState({});
    
      const [anchorEl, setAnchorEl] = useState(null);
      const [chats, setChats] = useState([]);
      const [loading, setLoading] = useState(true);
      const [selectedChat, setSelectedChat] = useState(null);

      useEffect(() => {
        setTimeout(() => {
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
          setChats(dummyData);
          setLoading(false);
        }, 10); // Simulating a delay in loading data
      }, []);
    

    
      // useEffect(() => {
      //   if (!usersLoading) {
      //     const newUser = users.filter((item) => item.id?.toString() === '2')[0];
      //     setUser(newUser);
      //   }
      //   // eslint-disable-next-line
      // }, [usersLoading]);



      useEffect(() => {
        if (!usersLoading) {
          const newUser = chats.filter((item) => item.chat_id?.toString() === '2')[0];
          console.log("it is a new user ", newUser)
          setUser(newUser);
        }
        // eslint-disable-next-line
      }, [usersLoading]);
    
    
      const handleClickSort = (event) => {
        setAnchorEl(event?.currentTarget);
      };
    
      const handleCloseSort = () => {
        setAnchorEl(null);
      };
    
      const handleUserChange = () => {
        setEmailDetails((prev) => !prev);
      };
    
      const [openChatDrawer, setOpenChatDrawer] = useState(true);
      const handleDrawerOpen = () => {
        setOpenChatDrawer((prevState) => !prevState);
      };
    
      const [anchorElEmoji, setAnchorElEmoji] = useState(); /** No single type can cater for all elements */
    
      const handleOnEmojiButtonClick = (event) => {
        setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
      };
    
      // handle new message form
      const [message, setMessage] = useState('');
      const [isIconActive, setIsIconActive] = useState(false);

      const handleInputChange = (e) => {
        setMessage(e.target.value);
        setIsIconActive(e.target.value.trim().length > 0); // Activate icon if there's input
      };

      const handleCombinedChange = (e) => {
        // Logic from the first onChange
        const value = e.target.value.length <= 1 ? e.target.value.trim() : e.target.value;
      
        // Set the message
        setMessage(value);
      
        // Call the second function
        handleInputChange(e);
      };

      const textInput = useRef(null);
    
      const handleOnSend = () => {
        if (message.trim() === '') {
          openSnackbar({
            open: true,
            message: 'Message required',
            variant: 'alert',
    
            alert: {
              color: 'error'
            }
          });
        } else {
          const d = new Date();
          const newMessage = {
            id: Number(incrementer(users.length)),
            from: 'User1',
            to: user.name,
            text: message,
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          insertChat(user.name, newMessage);
        }
        setMessage('');
      };
    
      const handleEnter = (event) => {
        if (event?.key !== 'Enter') {
          return;
        }
        handleOnSend();
      };
    
      // handle emoji
      const onEmojiClick = (emojiObject) => {
        setMessage(message + emojiObject.emoji);
      };
    
      const emojiOpen = Boolean(anchorElEmoji);
      const emojiId = emojiOpen ? 'simple-popper' : undefined;
    
      const handleCloseEmoji = () => {
        setAnchorElEmoji(null);
      };
    
      // close sidebar when widow size below 'md' breakpoint
      useEffect(() => {
        setOpenChatDrawer(!matchDownSM);
      }, [matchDownSM]);
    
  return (
    <Box  sx={{
        height: '83vh', // Set the desired height (e.g., 80% of the viewport height)
        
        display: 'flex', // Optional, for alignment
        alignItems: 'center', // Optional, to align content vertically
        justifyContent: 'center', // Optional, to align content horizontally
        margin: '20px', // Optional, for spacing
        // border: '2px solid #000', 
        
    }}>

    <ChatDrawer
      openChatDrawer={openChatDrawer}
      handleDrawerOpen={handleDrawerOpen}
      setUser={setUser}
      selectedUser={usersLoading || Object.keys(user).length === 0 ? null : user.id}
    />

<Main theme={theme} open={openChatDrawer}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={emailDetails ? 8 : 12}
            xl={emailDetails ? 9 : 12}
            sx={{
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter + 200,
                border: 'none',
         
                boxShadow: 'none', // Removes shadow
              })
            }}
          >
            <MainCard
              content={false}
              sx={{
                height:"82.5vh",
                // bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
                pt: 2,
                pl: 2,
                borderRadius: emailDetails ? '0' : '0 12px 12px 0',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.shorter + 150
                })
              }}
            >
            <Grid container spacing={3}>
             
            <Grid
              item
              onClick={handleDrawerOpen}
              sx={{
                display: "flex",
                justifyContent:"center",
                marginTop: "-10px",
              }}

            >
              <Box   >
                 {!openChatDrawer && ( 
          
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-xl-heavy max-md:hidden"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                        )} 
                </Box>
              </Grid> 
            

        
                <Grid item xs={12} >
                  <SimpleBar
                    sx={{
                      display:"flex",
                      overflowX: 'hidden',
                      height: 'calc(100vh - 416px)',
                      minHeight: 400,
                      '& .simplebar-content': {
                        height: '100vh'
                      }
                    }}
                  >
                    <Box sx={{ pl: 1, pr: 3, height: '100%' }}>
                      {usersLoading || Object.keys(user).length === 0 ? (
                        <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                          <CircularWithPath />
                        </Stack>
                      ) : (
                        <ChatHistory theme={theme} user={user} />
                      )}
                    </Box>
                  </SimpleBar>
                </Grid>
                <Grid
                  item
                  xs={12}
                      sx={{display: 'flex',
                        justifyContent: 'center',
                      }}
                  // sx={{  bgcolor: 'grey.50', borderTop: '1px solid ', borderTopColor: theme.palette.divider, borderRadius: '24px',  width: '10%',maxWidth: '800px' }}
                 
                >


                 <Stack  sx={{
                    bgcolor: 'grey.50',
                    borderTop: '1px solid',
                    borderTopColor: theme.palette.divider,
                    borderRadius: '24px',
                    width: '80%', // Adjust width as needed
                    maxWidth: '600px',
                    margin: '0 auto', 
                    padding: 2,
                    height:130
                 
                    }} >
                    <TextField
                      inputRef={textInput}
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Your Message..."
                      value={message}
                      // onChange={(e) => setMessage(e.target.value.length <= 1 ? e.target.value.trim() : e.target.value)}
                      onChange={handleCombinedChange} 
                      onKeyDown={handleEnter}
                      variant="standard"
                      
                      // sx={{ pr: 6, '& .MuiInput-root:before': { borderBottomColor: theme.palette.divider } }}
                      
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="center"  sx={{ mt: -2 }}>
                      <Stack direction="row" sx={{ py: 2, ml: -1 }}>
                    
                        <IconButton  sx={{ '& svg': {
                              color: 'rgba(0, 0, 0, 7)', // Apply rgba color to the icon
                            },
                        }}
                    size="large" color="secondary">
                       <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z" fill="currentColor"></path></svg>
                        </IconButton>
                        <IconButton sx={{ '& svg': {
                              color: 'rgba(0, 0, 0, 7)', // Apply rgba color to the icon
                            },
                        }} size="medium" color="secondary">
                          <Image />
                        </IconButton>
                      </Stack>
                        
                      {isIconActive ? (
                        <IconButton
                          sx={{
                            '& svg': {
                              color: 'rgba(0, 0, 0, 7)', // Apply rgba color to the icon
                            },
                            // mr: 1.5,
                            color: 'white', // White icon color for contrast
                            borderRadius: '50%',
                            
                          }}
                          color="primary"
                          onClick={handleOnSend}
                          size="large"
                        >
                           <svg width="40" height="40" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path></svg>  
                      </IconButton>
                      ) : (
                        <IconButton
                          sx={{
                            color: 'white', // White icon color for contrast
                            borderRadius: '50%',
                            '& svg': {
                              color: 'rgba(0, 0, 0, 7)', // Apply rgba color to the icon
                            },
                            mr: 1.5,
                          }}
                          color="primary"
                          onClick={handleOnSend}
                          size="large"
                        >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 4C8.67157 4 8 4.67157 8 5.5V18.5C8 19.3284 8.67157 20 9.5 20C10.3284 20 11 19.3284 11 18.5V5.5C11 4.67157 10.3284 4 9.5 4Z" fill="currentColor"></path><path d="M13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5V15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5V8.5Z" fill="currentColor"></path><path d="M4.5 9C3.67157 9 3 9.67157 3 10.5V13.5C3 14.3284 3.67157 15 4.5 15C5.32843 15 6 14.3284 6 13.5V10.5C6 9.67157 5.32843 9 4.5 9Z" fill="currentColor"></path><path d="M19.5 9C18.6716 9 18 9.67157 18 10.5V13.5C18 14.3284 18.6716 15 19.5 15C20.3284 15 21 14.3284 21 13.5V10.5C21 9.67157 20.3284 9 19.5 9Z" fill="currentColor"></path></svg>

                        </IconButton>
                        )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={4} xl={3} sx={{ overflow: 'hidden', display: emailDetails ? 'flex' : 'none' }}>
            <Collapse orientation="horizontal" in={emailDetails && !matchDownMD}>
              <UserDetails user={user} onClose={handleUserChange} />
            </Collapse>
          </Grid>

          <Dialog TransitionComponent={PopupTransition} onClose={handleUserChange} open={matchDownMD && emailDetails} scroll="body">
            <UserDetails user={user} onClose={handleUserChange} />
          </Dialog>
        </Grid>
      </Main>



        
    

    
      
    </Box>
  );
}

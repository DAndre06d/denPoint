import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarWithName from '../../AvatarwithName.jsx';
import { logout } from '../../../slices/authSlice.js';
import ChangePassModal from './ChangePassModal.jsx';

const MenuAvatar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [changePassModal, setChangePassModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out.",
      position: "top-right",
      description: "You have been logged out successfully.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        p={2}
        height="auto"
        borderRadius="20px"
        display="flex"
        alignItems="center"
        _hover={{ bg: "blackAlpha.50" }}
        _active={{ bg: "blackAlpha.100" }}
      >
        <Box>
          <AvatarWithName name={name} />
        </Box>
      </MenuButton>
      <MenuList borderRadius="20px" borderColor="blackAlpha.100" boxShadow="0 18px 40px rgba(15, 23, 42, 0.08)" py={2}>
        <MenuItem onClick={() => setChangePassModal(true)}>Change Password</MenuItem>
        <MenuItem color="red.500" onClick={handleLogout}>Log out</MenuItem>
      </MenuList>
      <ChangePassModal modalState={{ isOpen: changePassModal, toggle: () => setChangePassModal((prev) => !prev) }} />
    </Menu>
  );
};

export default MenuAvatar;

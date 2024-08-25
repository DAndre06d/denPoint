import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useToast
} from '@chakra-ui/react';
import AvatarWithName from '../../AvatarwithName';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../../slices/authSlice'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import ChangePassModal from './changePassModal';

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
            position:"top-right",
            description: "You have been logged out successfully.",
            status: "info",
            duration: 5000,
            isClosable: true,
        });
        navigate("/");
    };
    return (
        <Menu>
            <MenuButton as={Button} variant="link" p={0} display="flex" alignItems="center" zIndex="docked">
                <AvatarWithName name={name} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => setChangePassModal(true)}>Change Password</MenuItem>
                <MenuItem color="red" onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
            <ChangePassModal modalState={{ isOpen: changePassModal, toggle: () => setChangePassModal(prev => !prev) }} />
        </Menu>
    );
};

export default MenuAvatar;
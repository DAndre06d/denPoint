import PropTypes from 'prop-types'; // Import PropTypes
import { Avatar, Text, VStack } from '@chakra-ui/react'; // Import Chakra UI components

const defaultAvatar = 'https://static.truckersmp.com/avatarsN/defaultavatar.png'; // Default avatar image URL

const AvatarWithName = ({ name }) => {
  return (
    <VStack spacing={2} align="center" display="flex" >
      <Avatar name={name} src={defaultAvatar} borderColor={"black"} border={"1px"}/>
      <Text fontWeight="bold">{name}</Text>
    </VStack>
  );
};

// Define prop types for validation
AvatarWithName.propTypes = {
  name: PropTypes.string.isRequired, // `name` should be a required string
};

export default AvatarWithName;
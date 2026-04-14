import PropTypes from 'prop-types';
import { Avatar, Text, VStack } from '@chakra-ui/react';

const defaultAvatar = 'https://static.truckersmp.com/avatarsN/defaultavatar.png';

const AvatarWithName = ({ name }) => {
  return (
    <VStack spacing={1} align="center" display="flex" maxW="108px">
      <Avatar
        name={name}
        src={defaultAvatar}
        borderColor="blackAlpha.200"
        border="1px"
        size={{ base: "sm", md: "md" }}
      />
      <Text fontWeight="700" color="gray.600" fontSize={{ base: "sm", md: "sm" }} noOfLines={1}>
        {name}
      </Text>
    </VStack>
  );
};

AvatarWithName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AvatarWithName;

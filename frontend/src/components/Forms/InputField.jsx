import { Box,Text,Input} from "@chakra-ui/react"
import PropTypes from 'prop-types';


const InputField = ({ label, type, value, onChange, onBlur, hasError }) => {
  return (
    <Box>
    <Text textAlign={"left"} fontWeight="bold">{label}</Text>
    <Input
    size="md"
    backgroundColor="gray.100"
    borderColor={hasError ? "red.500" : "blackAlpha.100"}
    borderWidth="1px"
    type={type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    />
    {hasError && <Text color="red.500" textAlign={"left"}>This field is required.</Text>}
    </Box>
  )
}
InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
  };


export default InputField
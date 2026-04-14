import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Select,
    Text
} from '@chakra-ui/react';

const Pagination = ({ totalItems, itemsPerPageOptions, onPageChange, onPageSizeChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(itemsPerPageOptions[0]);
    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        // Notify parent component of page or page size change
        onPageChange(currentPage);
        onPageSizeChange(pageSize);
    }, [currentPage, pageSize]);

    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPageSize(newSize);
        setCurrentPage(1); // Reset to first page on page size change
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent={{ base: "stretch", md: "space-between" }}
            alignItems={{ base: "stretch", md: "center" }}
            my={6}
            px={{ base: 0, md: 1 }}
            py={4}
            borderTop="1px solid"
            borderColor="gray.100"
        >
            <Box
                width={{ base: "100%", lg: "auto" }}
                display={"flex"}
                flexDirection={{ base: "column", lg: "row" }}
                gap={{ base: 4, lg: 6 }}
                justifyContent={"space-between"}
                alignItems={{ base: "stretch", lg: "center" }}
            >
                <Select
                    size={"sm"}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    width={{ base: "100%", sm: "160px" }}
                    placeholder='Rows per page'
                >
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Select>
                <Text color="gray.600">Current Page: {currentPage}</Text>
                <Box display={"flex"} flexDirection={{ base: "column", sm: "row" }} gap={{ base: 2, sm: 4 }}>
                    <Button
                        size="sm"
                        onClick={handlePrevPage}
                        isDisabled={currentPage === 1}
                        variant="outline"
                    >
                        Prev {'<'}
                    </Button>
                    <Button
                        onClick={handleNextPage}
                        size="sm"
                        isDisabled={currentPage === totalPages}
                        colorScheme="blue"
                    >
                        Next {'>'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Pagination;

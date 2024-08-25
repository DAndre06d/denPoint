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
    }, [currentPage, pageSize, onPageChange, onPageSizeChange]);

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
        <Box display="flex" justifyContent={{ base: "space-between", md: "flex-end" }} my={5} pr={{ base: 0, xl: 3 }}>
            <Box width={"40%"} display={"flex"} flexDirection={{ base: "column", lg: "row" }} gap={{ base: 4, lg: 0 }} justifyContent={"space-between"}>
                <Select
                    size={"sm"}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    width={"130px"}
                    placeholder='Rows per page'
                    ml={2}
                >
                    {itemsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Select>
                <Text ml={{ base: 4, lg: 0 }}>Current Page: {currentPage}</Text>
                <Box ml={2} display={"flex"} flexDirection={{ base: "column", sm: "row" }}>
                    <Button
                        size="sm"
                        onClick={handlePrevPage}
                        isDisabled={currentPage === 1}
                    >
                        Prev {'<'}
                    </Button>
                    <Button
                        ml={{ base: 0, md: 5 }}
                        my={{ base: 2, sm: 0 }}
                        onClick={handleNextPage}
                        size="sm"
                        isDisabled={currentPage === totalPages}
                    >
                        Next {'>'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Pagination;
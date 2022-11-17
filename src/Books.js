import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import BookCard from "./BookCard";
import {useMutation} from "@tanstack/react-query";
import BookService from "./BookService";
import PageBox from "./PageBox";
import TagsInput from "./TagsInput";

const Books = () => {
  const [books, setBooks] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const booksMutation = useMutation({mutationFn: (tags) => BookService.getBooks(tags)})

  const handleSelectedTags = (tags) => {
    setSelectedTags(tags)
  }

  useEffect(() => {
    booksMutation.mutate(selectedTags)
  }, [selectedTags])

  return (
    <PageBox>
      <Box display={'flex'} width={'100%'} alignItems={'center'} ml={'auto'} mb={1}
           sx={{mr: {xs: 'auto', md: 0}}}>
        <Typography fontWeight={'bold'} variant={"h4"}>Books</Typography>
        <Box flex={1}/>
      </Box>
      <Box flex={1} width={'100%'} display={'flex'} alignItems={'flex-start'} sx={{
        flexDirection: {xs: 'column', md: 'row'},
        alignItems: {xs: 'center', md: 'flex-start'},
        gap: {xs: 1, md: 0}
      }}>
        <Box flex={1} sx={{display: {xs: 'none', md: 'block'}}}/>
        <Box sx={{width: `100%`}}>
          <TagsInput
            selectedTags={handleSelectedTags}
            fullWidth
            variant="outlined"
            placeholder="Add Tags"
            label="Tags"
          />
          <Box display={'flex'} mt={2} gap={2} flexWrap={'wrap'}
               sx={{justifyContent: {xs: 'center', md: 'flex-start'}, gap: {xs: 1, md: 2}}}>
            {books.map(book => (
              <BookCard key={book.id} book={book} sx={{width: {xs: '48%', md: 'initial'}}}/>
            ))}
          </Box>
        </Box>
      </Box>
    </PageBox>
  );
};

export default Books;
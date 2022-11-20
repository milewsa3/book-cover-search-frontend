import React, {useEffect, useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import BookCard from "./BookCard";
import {useMutation} from "@tanstack/react-query";
import BookService from "./BookService";
import PageBox from "./PageBox";
import TagsInput from "./TagsInput";
import {convertFileToBase64} from "./Utils";

const initBook = {
  title: "",
  author: "",
  cover: ""
}

const Books = () => {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState(initBook)
  const [selectedTags, setSelectedTags] = useState([])

  const booksMutation = useMutation({
    mutationFn: (tags) => BookService.getBooks(tags),
    onSuccess: data => {
      setBooks(data)
    }
  })

  const createBookMutation = useMutation({
    mutationFn: (formData) => BookService.createBook(formData),
    onSuccess: () => {
      booksMutation.mutate(selectedTags)
    }
  })

  const handleSelectedTags = (tags) => {
    setSelectedTags(tags)
  }

  const handleBookChange = (e) => {
    setBook({...book, [e.target.name]: e.target.value});
  };

  const handleBookCoverChange = async (e) => {
    const base64 = await convertFileToBase64(e.target.files[0])
    setBook({...book, cover: base64})
  }

  const handleSubmitBook = (e) => {
    e.preventDefault()
    const base64Only = book.cover.substring(book.cover.indexOf(',') + 1)
    createBookMutation.mutate({...book, cover: base64Only})
  }

  useEffect(() => {
    booksMutation.mutate(selectedTags)
  }, [selectedTags])

  return (
    <PageBox>
      <Paper component={"form"} sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        alignItems: 'center',
        gap: 2,
        mb: 4,
        p: 4,
        width: {xs: '-webkit-fill-available', md: 400}
      }}>
        <Typography fontWeight={'bold'} variant={"h4"}>Add book</Typography>
        <TextField
          variant={"outlined"}
          name={"title"}
          label={"Title"}
          value={book.title}
          onChange={handleBookChange}
          required
          fullWidth
        />
        <TextField
          variant={"outlined"}
          name={"author"}
          label={"Author"}
          value={book.author}
          onChange={handleBookChange}
          required
          fullWidth
        />
        {book.cover && (
          <div>
            <img alt="not found" width={"100%"} height={"auto"} src={book.cover}/>
          </div>
        )}
        <Button variant={"outlined"} component="label" fullWidth>
          Upload cover
          <input hidden accept="image/*" multiple type="file" onChange={handleBookCoverChange}/>
        </Button>
        <Button variant={"contained"} type={"submit"} onClick={handleSubmitBook}>Submit</Button>
      </Paper>
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
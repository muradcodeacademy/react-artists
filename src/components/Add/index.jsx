import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import controller from "../../services";
import { endpoints } from "../../services/constants";
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 50,
  p: 4,
};

function Add({ id, setArtists }) {
  const [open, setOpen] = useState(false);
  const [songTitle, setSongTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [coverSrc, setCoverSrc] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSong = () => {
    controller.getOne(endpoints.artists, id)
      .then((currentArtist) => {
        const currentSongs = currentArtist.songs || [];

        const newSong = {
          title: songTitle,
          releaseYear: releaseYear,
          coverSrc: coverSrc,
        };

        const updatedSongs = [...currentSongs, newSong];

        controller.patch(endpoints.artists, id, { songs: updatedSongs })
          .then(() => {
            setOpen(false);
            setSongTitle('');
            setReleaseYear('');
            setCoverSrc('');
            controller
            .getAll(endpoints.artists)
            .then((res) => {
                setArtists(res.data);
            })
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Song Added Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          })
      })

  };
  return (
    <>
      <Button onClick={handleOpen} variant="contained">Add</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField className='mt-3'
              autoFocus
              margin="dense"
              label="Song Title"
              fullWidth
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            />
            <TextField
              className='mt-3'
              margin="dense"
              label="Release Year"
              fullWidth
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
            <TextField
              className='mt-4'
              margin="dense"
              label="Cover Source"
              fullWidth
              value={coverSrc}
              onChange={(e) => setCoverSrc(e.target.value)}
            />
            <div className='d-flex gap-2 justify-content-end mt-3'>
              <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
              <Button onClick={handleAddSong} variant="contained" color="primary">Add Song</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Add;
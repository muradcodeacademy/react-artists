import React from 'react'
import {Button} from '@mui/material';
import Swal from 'sweetalert2';
import controller from "../../services";
import { endpoints } from "../../services/constants";

function Delete({ id, setArtists }) {
  return (
    
    <Button 
    onClick={() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          controller.delete(endpoints.artists, id);
          setArtists((artists) => {
            return [...artists.filter((x) => x.id != id)];
          })
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });


    }}variant="contained" color="error">Delete</Button>
  )
}

export default Delete
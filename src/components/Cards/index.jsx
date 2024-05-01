import React, { useState, useEffect } from 'react';
import controller from "../../services";
import { endpoints } from "../../services/constants";
import Container from 'react-bootstrap/Container';
import CardItem from '../CardItem';
import Row from 'react-bootstrap/Row';
import SearchInp from '../SearchInp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Cards() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        controller
            .getAll(endpoints.artists)
            .then((res) => {
                setArtists(res.data);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    const filteredArtists = artists.filter((artist) => {
        return artist.name.trim().toLowerCase().startsWith(query.trim().toLowerCase());
    });

    
    return (
        <Container className='mt-5'>
            <Row className='d-flex justify-content-end' >
                <div className='mb-5 w-25'>
                    <SearchInp setQuery={setQuery} />
                </div>
                <FormControl className='w-25' sx={{minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>A-Z</MenuItem>
                        <MenuItem value={20}>Z-A</MenuItem>
                    </Select>
                </FormControl>
            </Row>
            <Row>
                {
                    filteredArtists &&
                    filteredArtists.map((artist) =>
                        <CardItem key={artist.id} artist={artist} loading={loading} setArtists={setArtists} />
                    )

                }

            </Row>
        </Container>
    );
}

export default Cards
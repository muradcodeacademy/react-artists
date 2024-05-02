import { useState, useEffect } from 'react'
import controller from '../../services'
import { endpoints } from '../../services/constants'
import Container from 'react-bootstrap/Container'
import CardItem from '../CardItem'
import Row from 'react-bootstrap/Row'
import SearchInp from '../SearchInp'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function Cards() {
	const [artists, setArtists] = useState([])
	const [filteredArtists, setFilteredArtists] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		controller
			.getAll(endpoints.artists)
			.then((res) => {
				setArtists(res.data)
				setFilteredArtists(res.data)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	const search = (query) => {
		setFilteredArtists(
			artists.filter((artist) => {
				return artist.name
					.trim()
					.toLowerCase()
					.startsWith(query.trim().toLowerCase())
			})
		)
	}

	const sortedArtists = (direction) => {
		let sorted = [...filteredArtists]

		sorted.sort((a, b) => {
			if (direction === 'asc') {
				return a.name.localeCompare(b.name)
			} else if (direction === 'desc') {
				return b.name.localeCompare(a.name)
			}
		})

		setFilteredArtists(sorted)
	}

	return (
		<Container className='mt-5'>
			<Row className='d-flex justify-content-end'>
				<div className='mb-5 w-25'>
					<SearchInp search={search} />
				</div>
				<FormControl
					className='w-25'
					sx={{ minWidth: 120 }}
					size='small'
				>
					<InputLabel id='demo-simple-select-label'>Sort</InputLabel>
					<Select onChange={(e) => sortedArtists(e.target.value)}>
						<MenuItem value='asc'>A-Z</MenuItem>
						<MenuItem value='desc'>Z-A</MenuItem>
					</Select>
				</FormControl>
			</Row>
			<Row>
				{filteredArtists &&
					filteredArtists.map((artist) => (
						<CardItem
							key={artist.id}
							artist={artist}
							loading={loading}
							setArtists={setArtists}
						/>
					))}
			</Row>
		</Container>
	)
}

export default Cards

import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Delete from '../Delete';
import Add from '../Add';
import Col from 'react-bootstrap/Col';
import Skeleton from '@mui/material/Skeleton';
import ViewSongs from '../ViewSongs';

function CardItem({ artist, loading,setArtists }) {
    return (
        <Col xl={3} lg={3} md={12} sm={12}>
            <Card className='mb-5'>
                <CardActionArea>
                    {loading ? (
                        <Skeleton variant="rectangular" height={300} />
                    ) : (
                        <CardMedia
                        component="img"
                        height="300"
                        image={artist.imgSrc}
                        alt="green iguana"
                    />
                    )}
                    <CardContent>
                        {loading ? (
                            <>
                                <Skeleton width={150} height={30} />
                                <Skeleton width={100} height={20} />
                                <Skeleton width={120} height={20} />
                                <Skeleton width={150} height={20} />
                            </>
                        ) : (
                            <>
                                <Typography gutterBottom variant="h5" component="div">
                                    {artist.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Age: {artist.age}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Genre: {artist.genre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Songs Count: {artist.songs.length}
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" width={90} height={30} />
                            <Skeleton variant="rectangular" width={80} height={30} />
                        </>
                    ) : (
                        <>
                            <Delete id={artist.id} setArtists={setArtists}/>
                            <Add id={artist.id} setArtists={setArtists} />
                            <ViewSongs/>
                        </>
                    )}
                </CardActions>
            </Card>
        </Col>
    );
}

export default CardItem
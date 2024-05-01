import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Container from 'react-bootstrap/Container';


function Navbar() {
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "black" }}>
                <Container>
                    <Toolbar>
                        <LibraryMusicIcon
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Artists
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Navbar;
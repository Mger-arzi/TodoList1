import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logoutTC } from '../components/features/login/auth-reducer';
import { useAppDispatch, useAppSelector } from '../app/store';
import Switch from '@mui/material/Switch';

type MyAppBarProps = {
  changeModeHandler?: ()=> void
}
export  function MyAppBar( props:MyAppBarProps) {
  const dispatch = useAppDispatch()
  const isLoggenIn = useAppSelector(state => state.auth.isLoggenIn)

    return (
        <Box sx={{ flexGrow: 1 , }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoLIst
                    </Typography>
                    {isLoggenIn && <Button   onClick={ ()=> dispatch(logoutTC())} color="inherit">Log out</Button>}
                    <Switch color={'default'} onChange={props.changeModeHandler} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
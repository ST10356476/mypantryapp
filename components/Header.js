import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Pantry Management
        </Typography>
        <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
        <Button color="inherit" onClick={() => router.push('/pantry')}>Pantry</Button>
        <Button color="inherit" onClick={() => router.push('/signup')}>Sign Up</Button>
        <Button color="inherit" onClick={() => router.push('/login')}>Log In</Button>
        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

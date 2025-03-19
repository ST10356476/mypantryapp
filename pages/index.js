import Head from 'next/head';
import { Typography, Container } from '@mui/material';
import withAuth from '../hoc/withAuth';

const Home = () => {
  return (
    <Container>
      <Head>
        <title>Pantry Management</title>
      </Head>
      <Typography variant="h2" gutterBottom>
        Welcome to Pantry Management System that helps you organize different Items.
      </Typography>
      <Typography variant="body1">
        Manage your pantry items efficiently.
      </Typography>
    </Container>
  );
};

export default withAuth(Home);

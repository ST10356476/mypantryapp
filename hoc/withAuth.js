import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      // Optionally show a loading indicator
      return <div>Loading...</div>;
    }

    if (error) {
      // Handle and display error if necessary
      return <div>Error: {error.message}</div>;
    }

    // Render the component if authenticated
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase.config';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/');
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  if (!user) return null;

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;

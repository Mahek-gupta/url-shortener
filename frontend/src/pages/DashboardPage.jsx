// // client/src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import ShortenForm from '../components/ShortenForm'; // Re-use the shorten form

// const DashboardPage = () => {
//   const { user, token, logout } = useAuth();
//   const [userLinks, setUserLinks] = useState([]);
//   const [loadingLinks, setLoadingLinks] = useState(true);
//   const [errorLinks, setErrorLinks] = useState(null);

//   useEffect(() => {
//     const fetchUserLinks = async () => {
//       if (!token) {
//         setLoadingLinks(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/user/links', { // **New Backend Endpoint Needed!**
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch user links');
//         }
//         setUserLinks(data);
//       } catch (error) {
//         setErrorLinks(error.message);
//         toast.error(`Error fetching links: ${error.message}`);
//         // If token is invalid or expired, log out
//         if (error.message.includes('token') || error.message.includes('authorized')) {
//           logout();
//         }
//       } finally {
//         setLoadingLinks(false);
//       }
//     };

//     fetchUserLinks();
//   }, [token, logout]); // Re-fetch if token changes

//   if (!user) {
//     return <div className="text-center mt-20 text-xl">Please log in to view your dashboard.</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-extrabold text-light-text mb-8 gradient-text text-center md:text-left">
//         Welcome, {user.username}!
//       </h1>

//       <div className="bg-dark-card p-6 rounded-lg shadow-xl mb-8 border border-gray-700">
//         <h2 className="text-2xl font-semibold text-light-text mb-4">Shorten a New Link</h2>
//         <ShortenForm /> {/* Reuse the existing shorten form */}
//       </div>

//       <div className="bg-dark-card p-6 rounded-lg shadow-xl border border-gray-700">
//         <h2 className="text-2xl font-semibold text-light-text mb-4">Your Shortened Links</h2>
//         {loadingLinks ? (
//           <p className="text-center text-gray-400">Loading your links...</p>
//         ) : errorLinks ? (
//           <p className="text-red-500 text-center">Error: {errorLinks}</p>
//         ) : userLinks.length === 0 ? (
//           <p className="text-center text-gray-400">You haven't shortened any links yet. Start above!</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-800">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Original URL
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Short URL
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Clicks
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Created
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-800">
//                 {userLinks.map((link) => (
//                   <tr key={link._id} className="hover:bg-gray-800 transition-colors duration-200">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 truncate max-w-[200px]">
//                       <a href={link.longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary-purple">
//                         {link.longUrl}
//                       </a>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-purple">
//                       <a href={`http://localhost:5000/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                         {`http://localhost:5000/${link.shortCode}`}
//                       </a>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       {link.clicks}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       {new Date(link.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <Link to={`/analytics/${link.shortCode}`} className="text-indigo-500 hover:text-indigo-400 mr-4">
//                         Analytics
//                       </Link>
//                       {/* Add Delete/Edit buttons here */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;







// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ShortenForm from '../components/ShortenForm';

const DashboardPage = () => {
  const { user, token, logout } = useAuth();
  const [userLinks, setUserLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [errorLinks, setErrorLinks] = useState(null);
  const [refreshLinks, setRefreshLinks] = useState(false); // NEW STATE to trigger re-fetch

  // Wrap fetchUserLinks in useCallback to prevent re-creation on every render
  const fetchUserLinks = useCallback(async () => {
    if (!token) {
      setLoadingLinks(false);
      return;
    }

    setLoadingLinks(true); // Set loading true before fetching
    setErrorLinks(null); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/user/links', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user links');
      }
      setUserLinks(data);
    } catch (error) {
      setErrorLinks(error.message);
      toast.error(`Error fetching links: ${error.message}`);
      if (error.message.includes('token') || error.message.includes('authorized')) {
        logout(); // Log out if token is invalid
      }
    } finally {
      setLoadingLinks(false);
    }
  }, [token, logout]); // Dependencies for useCallback

  useEffect(() => {
    fetchUserLinks();
  }, [fetchUserLinks, refreshLinks]); // Add refreshLinks to dependencies

  // Function to call after a link is successfully shortened
  const handleLinkShortened = () => {
    setRefreshLinks(prev => !prev); // Toggle state to trigger useEffect
    // Alternatively, you could directly update the userLinks state if the backend
    // response from /api/shorten includes the full link object for the current user
    // However, re-fetching is safer to ensure consistency with the DB.
  };

  if (!user) {
    return <div className="text-center mt-20 text-xl">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-light-text mb-8 gradient-text text-center md:text-left">
        Welcome, {user.username}!
      </h1>

      <div className="bg-dark-card p-6 rounded-lg shadow-xl mb-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-light-text mb-4">Shorten a New Link</h2>
        {/* Pass the callback to the ShortenForm */}
        <ShortenForm onLinkShortened={handleLinkShortened} />
      </div>

      <div className="bg-dark-card p-6 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl font-semibold text-light-text mb-4">Your Shortened Links</h2>
        {loadingLinks ? (
          <p className="text-center text-gray-400">Loading your links...</p>
        ) : errorLinks ? (
          <p className="text-red-500 text-center">Error: {errorLinks}</p>
        ) : userLinks.length === 0 ? (
          <p className="text-center text-gray-400">You haven't shortened any links yet. Start above!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Short URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {userLinks.map((link) => (
                  <tr key={link._id} className="hover:bg-gray-800 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 truncate max-w-[200px]">
                      <a href={link.longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary-purple">
                        {link.longUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-purple">
                      <a href={`http://localhost:5000/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {`http://localhost:5000/${link.shortCode}`}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {link.clicks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/analytics/${link.shortCode}`} className="text-indigo-500 hover:text-indigo-400 mr-4">
                        Analytics
                      </Link>
                      {/* Add Delete/Edit buttons here */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
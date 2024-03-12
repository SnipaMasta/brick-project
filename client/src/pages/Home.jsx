import { useQuery } from '@apollo/client';
import React from 'react';
import LegoList from '../components/LegoList';


import { QUERY_LEGOSETS } from '../utils/queries';

// const Home = () => {
//     const { loading, data } = useQuery(QUERY_LEGOSETS);
//     const legosets = data?.legosets || [];
    
//     return (
//         <main>
//         <div className="flex-row justify-center">
//             <div className="col-12 col-md-10 my-3">
//             {loading ? (
//                 <div>Loading...</div>
//             ) : (
//                 <LegoList
//                 legosets={legosets}
//                 title="Featured Lego Sets"
//                 />
//             )}
//             </div>
//         </div>
//         </main>
//     );
//     }

const Home = () => {
    return (
        <div>
            {"You made it!"}
        </div>
    );
}
export default Home;

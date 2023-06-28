
// 'use client'

// import "react-universal-hooks"

// import { useClient, useRouteData, useClientState } from 'react-universal-hooks';
// import { useEffect } from 'react';

// const MyComponent = () => {
//   const [accounts, setAccounts] = useClientState([]);

//   useEffect(() => {
//     async function connectToMetaMask() {
//       // Check if MetaMask is installed
//       if (typeof window.ethereum !== 'undefined') {
//         // Request access to the user's MetaMask accounts
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
        
//         // Get the user's MetaMask accounts
//         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         setAccounts(accounts);
//       } else {
//         console.log('MetaMask not detected');
//       }
//     }

//     connectToMetaMask();
//   }, []);

//   return (
//     <div>
//       {accounts.length > 0 ? (
//         <p>Connected with MetaMask account: {accounts[0]}</p>
//       ) : (
//         <a
//           href="https://metamask.io/"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
//           target="_blank"
//         >
//           <h2 className="mb-3 text-2xl font-semibold">
//             Connect MetaMask{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//         </a>
//       )}
//     </div>
//   );
// };

// export default function Home() {
//   useClient(); 
//   const routeData = useRouteData();

//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       <div className="mb-32 grid text-center lg:mb-0 lg:text-left">
//         <MyComponent />
//       </div>
//     </main>
//   );
// }

'use client'

import React from 'react';
import { useEffect } from 'react';
import { useQueryClient, useQuery, QueryClient, QueryClientProvider } from 'react-query';

const fetchAccounts = async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Request access to the user's MetaMask accounts
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the user's MetaMask accounts
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts;
  } else {
    console.log('MetaMask not detected');
    return [];
  }
};

const MyComponent = () => {
  const queryClient = useQueryClient();
  const { data: accounts } = useQuery('accounts', fetchAccounts);

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries('accounts');
    }, 3000);

    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <div>
      {accounts?.length > 0 ? (
        <>
        <p className='font-bold'>Injected Provider DOES exist</p>
          <p>Wallet Accounts: {accounts[0]}</p>
          <p>Wallet Balance: </p>
          <p>Hex ChainId: </p>
          <p>Numeric ChainId: </p>
        
        </>
     
      ) : (
        <a
          href="https://metamask.io/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Connect MetaMask{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      )}
    </div>
  );
};

export default function Home() {
  const queryClientRef = React.useRef();
  
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:text-left">
          <MyComponent />
        </div>
      </main>
    </QueryClientProvider>
  );
}



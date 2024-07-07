// MetaMaskProvider.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MetaMaskProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const connectMetaMask = async () => {
            if (window.ethereum) {
               
                try {
                   const accounts= await window.ethereum.request({ method: 'eth_requestAccounts' });
                   const account=accounts[0]; 
                    setAccount(account);

                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    setProvider(provider);


                } catch (err) {
                    console.error('User denied account access', err);
                }
            } else {
                console.error('MetaMask is not installed');
            }
        };

        connectMetaMask();
    }, []);

    return (
        <MetaMaskContext.Provider value={{ provider, account }}>
            {children}
        </MetaMaskContext.Provider>
    );
};

export const MetaMaskContext = React.createContext(null);
export default MetaMaskProvider;

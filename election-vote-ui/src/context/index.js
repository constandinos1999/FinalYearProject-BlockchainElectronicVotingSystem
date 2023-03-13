import { factoryABI } from "@/constants/abi";
import { factoryAddress } from "@/constants/address";
import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

const Context  = createContext();

export default function AppWrapper({ children }) {

    const [isAuth, setAuth] = useState(false);
    const [account, setAccount] = useState('');
    const [web3Provider, setWeb3Provider] = useState(new Web3(process.env.HTTP_RPC))
    const [factoryContract, setFactoryContract] = useState(null);

    useEffect(() => {
        if (account) {
            const provider = new Web3(window.ethereum);
            setFactoryContract(new provider.eth.Contract(factoryABI, factoryAddress))
            setWeb3Provider(provider)
        }
    }, [account])

    const context = {
        account, setAccount,
        isAuth, setAuth,
        web3Provider,
        factoryContract
    };

    return (
        <Context.Provider value={context}>
            { children }
        </Context.Provider>
    )
};

export const useAppContext = () => {
    return useContext(Context);
}
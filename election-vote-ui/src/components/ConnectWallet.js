import { notification } from "@/constants/notification";
import { useAppContext } from "@/context";
import IMetaMask from "@/icons/IMetaMask";
import { useEffect } from "react";
import { Store } from "react-notifications-component";
import Web3 from "web3";

const ConnectWallet = () => {

    const { account, setAccount, profileInfo } = useAppContext();

    useEffect(() => {
        function detectWallet() {

            window.ethereum
            .on("chainChanged", async(chainId) => {
                if (chainId !== 0x61) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                chainId: "0x61",
                                chainName: "BNB Smart Chain Testnet",
                                nativeCurrency: {
                                    name: "Binance",
                                    symbol: "tBNB",
                                    decimals: 18,
                                },
                                rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
                                blockExplorerUrls: ["https://testnet.bscscan.com/"],
                                }
                            ]
                        });
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{
                                chainId: "0x61"
                            }]
                        });

                        const accounts = await window.ethereum.request({
                            method: "eth_requestAccounts"
                        });
                        console.log((profileInfo.walletAddress));
                        if ((profileInfo.walletAddress).toLowerCase() === accounts[0].toLowerCase()) {
                            setAccount(accounts[0]);
                        }
                        else setAccount('');
                        
                    } catch(err) {
                        setAccount('');
                    }
                }
            })
            .on("accountChanged", (accounts) => {
                if ((profileInfo.walletAddress).toLowerCase() === accounts[0].toLowerCase()) {
                    setAccount(accounts[0]);
                }
                else setAccount('');
            })
        }
        if (window.ethereum) {
            detectWallet();
        }
    }, [])

    const connectMetaMask = async() => {
        try {
            if (!window.ethereum) {
                Store.addNotification({
                    ...notification,
                    type: "warning",
                    title: "Warning",
                    message: "Please install MetaMask to browser"
                });
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const web3 = new Web3(window.ethereum);
            const chainId = await web3.eth.getChainId();

            if (chainId !== 0x61) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                        chainId: "0x61",
                        chainName: "BNB Smart Chain Testnet",
                        nativeCurrency: {
                            name: "Binance",
                            symbol: "tBNB",
                            decimals: 18,
                        },
                        rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
                        blockExplorerUrls: ["https://testnet.bscscan.com/"],
                        }
                    ]
                });
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{
                        chainId: "0x61"
                    }]
                });
            }

            if ((profileInfo.walletAddress).toLowerCase() === accounts[0].toLowerCase()) {
                setAccount(accounts[0]);
            }

            else {
                setAccount('');
                Store.addNotification({
                    ...notification,
                    title: "Warning",
                    message: "Please switch to your wallet"
                });
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <button className="btn btn-outline btn-primary" onClick={connectMetaMask}>
            <IMetaMask/>
            <span>{account ? account.slice(0, 6) + "..." + account.slice(-4) : "Connect Wallet"}</span>
        </button>
    )
}

export default ConnectWallet;
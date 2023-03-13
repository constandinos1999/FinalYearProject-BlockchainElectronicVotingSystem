import { useAppContext } from "@/context";
import IMetaMask from "@/icons/IMetaMask";

const ConnectWallet = () => {

    const { account, setAccount } = useAppContext();

    const connectMetaMask = async() => {
        try {
            if (!window.ethereum) {
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            setAccount(accounts[0]);
        } catch(err) {

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
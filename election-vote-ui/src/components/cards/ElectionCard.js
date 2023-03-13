import { electionABI } from "@/constants/abi";
import { useAppContext } from "@/context";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const ElectionCard = ({ address }) => {

    const { web3Provider } = useAppContext();
    const [isLoading, setLoading] = useState(true);
    const [metaInfo, setMetaInfo] = useState();

    useEffect(() => {
        async function fetchElectionInfo() {
            const contract = new web3Provider.eth.Contract(electionABI, address);
            const metaURI = await contract.methods.election_meta().call();
            await axios.get(metaURI).then(res => setMetaInfo(res.data)).catch(err => { });
            setLoading(false);
        }
        if (address) fetchElectionInfo();
    }, [address])

    return (
        <div className="card w-96 h-72 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-3xl">{ isLoading ? <Skeleton/> : metaInfo.name}</h2>
                <p>{
                    isLoading ? (
                        <>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </>
                    ) : metaInfo.description
                }</p>
                <div className="card-actions justify-end">
                    <Link href={`/admin/election/${address}`} className="btn btn-primary w-full">Manage Election</Link>
                </div>
            </div>
        </div>
    )
}

export default ElectionCard;
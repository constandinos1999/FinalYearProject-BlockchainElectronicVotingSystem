import { electionABI } from "@/constants/abi";
import { factoryAddress } from "@/constants/address";
import { useAppContext } from "@/context";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserFriends, FaVoteYea } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const ElectionCard = ({ address }) => {

    const {web3Provider, profileInfo } = useAppContext();
    const [isLoading, setLoading] = useState(true);
    const [metaInfo, setMetaInfo] = useState();
    const [voterNum, setVoterNum] = useState(0);
    const [candiNum, setCandiNum] = useState(0);

    useEffect(() => {
        async function fetchElectionInfo() {
            const contract = new web3Provider.eth.Contract(electionABI, factoryAddress);
            const metaURI = await contract.methods.election_meta().call();
            const voters = await contract.methods.getNumOfVoters().call();
            const candidates = await contract.methods.getNumOfCandidates().call();
            await axios.get(metaURI).then(res => setMetaInfo(res.data)).catch(err => { });
            setLoading(false);
            setVoterNum(voters);
            setCandiNum(candidates);
        }
        if (factoryAddress) fetchElectionInfo();
    }, [factoryAddress])

    return (
        <div className="card w-96 min-h-72 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title w-full text-3xl">{ isLoading ? <Skeleton className="!w-80 max-w-80" height={30}/> : metaInfo.name}</h2>
                <p className="h-40">{
                    isLoading ? (
                        <>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </>
                    ) : metaInfo.description
                }</p>
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <FaUserFriends className="w-8 h-8"/>
                        <span className="text-2xl">{ isLoading ? <Skeleton width={50}/> : candiNum }</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaVoteYea className="w-8 h-8"/>
                        <span className="text-2xl">{ isLoading ? <Skeleton width={50}/> : voterNum }</span>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <Link href={`/${profileInfo.isAdmin ? "admin" : "voter"}/election/${address}`} className="btn btn-primary w-full">{ profileInfo.isAdmin ? "Manage Election" : "Go to Vote"}</Link>
                </div>
            </div>
        </div>
    )
}

export default ElectionCard;
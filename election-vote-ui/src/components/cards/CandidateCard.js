import { electionABI } from "@/constants/abi";
import { useAppContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaVoteYea } from "react-icons/fa";
import { Store } from "react-notifications-component";
import { notification } from "@/constants/notification";

const CandidateCard = ({ index = -1 }) => {

    const { query } = useRouter();
    const { web3Provider, account, profileInfo,  } = useAppContext();
    const [isLoading, setLoading] = useState(true);
    const [isVoting, setVoting] = useState(false);
    const [isUpdate, setUpdate] = useState(true);
    const [metaInfo, setMetaInfo] = useState("");
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        async function fetchCandidateInfo() {
            const contract = new web3Provider.eth.Contract(electionABI, query.address);
            const info = await contract.methods.getCandidate(index).call();
            const _metaInfo = await axios.get(info[1]).then(res => { return res.data }).catch(err => { });
            setVoteCount(info[2]);
            setMetaInfo(_metaInfo);
            setLoading(false);
        }
        if (index > -1) {
            fetchCandidateInfo();
        }
    }, [index, isUpdate])

    const vote = async() => {
        try {
            if (!account) {
                Store.addNotification({
                    ...notification,
                    type: "warning",
                    title: "Warning",
                    message: "Please connect MetaMask"
                });
                return;
            }

            setVoting(true);
            const contract = new web3Provider.eth.Contract(electionABI, query.address);
            await contract.methods.vote(index, profileInfo.email).send({
                from : account
            });
            setUpdate(!isUpdate);
            Store.addNotification({
                ...notification,
                type: "success",
                title: "Success",
                message: "Voted Successfully!"
            });
        } catch(err) {
            if (err?.code !== 4001) {
                Store.addNotification({
                    ...notification,
                    type: "danger",
                    title: "Error",
                    message: "Vote is failed!"
                });
            }
        }
        setVoting(false);
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                {
                    isLoading ? <Skeleton className="!w-80 max-w-80" height={300}/> : <img src={metaInfo.image} alt={metaInfo.name} />
                }
            </figure>
            <div className="card-body">
                <h2 className="card-title">{isLoading ? <Skeleton className="!w-80 max-w-80" height={30}/> : metaInfo.name}</h2>
                <p className="h-40">{
                    isLoading ? (
                        <>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </>
                    ) : metaInfo.description
                }</p>
                <div className="card-actions justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <FaVoteYea className="w-8 h-8"/>
                        <b className="text-2xl">{voteCount}</b>
                    </div>
                    { profileInfo.isAdmin ? "" : (
                        <button className={`btn btn-primary ${ isVoting ? "loading disabled" : ""}`} onClick={vote}>{ isVoting ? "Voting..." : "Vote"}</button>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default CandidateCard;
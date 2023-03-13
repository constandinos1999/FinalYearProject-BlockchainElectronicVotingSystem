import { electionABI } from "@/constants/abi";
import { useAppContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaVoteYea } from "react-icons/fa";

const CandidateCard = ({ index = -1 }) => {

    const { query } = useRouter();
    const { web3Provider, account } = useAppContext();
    const [isLoading, setLoading] = useState(true);
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
    }, [index])

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                {
                    isLoading ? <Skeleton/> : <img src={metaInfo.image} alt={metaInfo.name} />
                }
            </figure>
            <div className="card-body">
                <h2 className="card-title">{isLoading ? <Skeleton/> : metaInfo.name}</h2>
                <p>{
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
                    <button className="btn btn-primary">Vote</button>
                </div>
            </div>
        </div>
    )
}

export default CandidateCard;
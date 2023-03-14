import VoterSidebar from "@/components/VoterSidebar";
import CandidateCard from "@/components/cards/CandidateCard";
import { electionABI } from "@/constants/abi";
import { useAppContext } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Candidates = () => {

    const { query } = useRouter();
    const { web3Provider } = useAppContext();

    const [candidates, setCandidates] = useState(0);

    useEffect(() => {
        async function fetchCandidateNumber() {
            const contract = new web3Provider.eth.Contract(electionABI, query.address);
            const candiNum = await contract.methods.getNumOfCandidates().call();
            setCandidates(+candiNum);
        }
        if (query.address) fetchCandidateNumber();
    }, [query])

    return (
        <section className="flex">
            <VoterSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="flex gap-4 mt-5">
                    {
                        [...Array(candidates)].map((item, idx) => (
                            <CandidateCard index={idx} key={idx}/>
                        ))
                    }
                </div>
            </main>
        </section>
    )
}

export default Candidates;
import VoterSidebar from "@/components/VoterSidebar";
import CandidateCard from "@/components/cards/CandidateCard";

const Candidates = () => {
    return (
        <section className="flex">
            <VoterSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="flex gap-4 mt-5">
                    <CandidateCard/>
                    <CandidateCard/>
                    <CandidateCard/>
                    <CandidateCard/>
                </div>
            </main>
        </section>
    )
}

export default Candidates;
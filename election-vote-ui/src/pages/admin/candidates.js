import AdminSidebar from "@/components/AdminSidebar";
import CandidateCard from "@/components/cards/CandidateCard";

const Candidates = () => {
    return (
        <section className="flex">
            <AdminSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="text-right w-full">
                    <button className="btn btn-outline btn-accent">Add New Candidate</button>
                </div>
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
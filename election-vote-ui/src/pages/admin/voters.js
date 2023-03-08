import AdminSidebar from "@/components/AdminSidebar";
import VoterCard from "@/components/cards/VoterCard";

const Voters = () => {
    return (
        <section className="flex">
            <AdminSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="flex gap-4 mt-5">
                    <VoterCard/>
                    <VoterCard/>
                    <VoterCard/>
                    <VoterCard/>
                </div>
            </main>
        </section>
    )
}

export default Voters;
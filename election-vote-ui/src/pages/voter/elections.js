import ElectionCard from "@/components/cards/ElectionCard";
import VoterSidebar from "@/components/VoterSidebar";

const Elections = () => {
    return (
        <section className="flex">
            <VoterSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="flex gap-4 mt-5">
                    <ElectionCard/>
                    <ElectionCard/>
                    <ElectionCard/>
                    <ElectionCard/>
                </div>
            </main>
        </section>
    )
}

export default Elections;
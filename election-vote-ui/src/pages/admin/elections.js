import AdminSidebar from "@/components/AdminSidebar";
import ElectionCard from "@/components/cards/ElectionCard";

const Elections = () => {
    return (
        <section className="flex">
            <AdminSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="text-right w-full">
                    <button className="btn btn-outline btn-accent">Create New Election</button>
                </div>
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
import Link from "next/link";
import { HiViewGrid } from "react-icons/hi";

const VoterSidebar = () => {
    return (
        <div className="side-bar w-24 fixed h-full flex flex-col gap-5 bg-white p-5 border-r-2 border-gray-300">
            <Link href="/voter/elections" className="flex flex-col justify-center items-center">
                <HiViewGrid size={48}/>
                <span className="font-bold mt-1">Elections</span>
            </Link>
        </div>
    )
}

export default VoterSidebar;
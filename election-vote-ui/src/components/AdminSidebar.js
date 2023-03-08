import Link from "next/link";
import { HiOutlineGlobe, HiUserGroup, HiViewGrid } from "react-icons/hi";

const AdminSidebar = () => {
    return (
        <div className="side-bar w-24 fixed h-full flex flex-col gap-5 bg-white p-5">
            <Link href="/admin/elections" className="flex flex-col justify-center items-center">
                <HiViewGrid size={48}/>
                <span className="font-bold mt-1">Elections</span>
            </Link>

            <Link href="/admin/candidates" className="flex flex-col justify-center items-center">
                <HiUserGroup size={48}/>
                <span className="font-bold mt-1">Candidates</span>
            </Link>

            <Link href="/admin/voters" className="flex flex-col justify-center items-center">
                <HiOutlineGlobe size={48}/>
                <span className="font-bold mt-1">Voters</span>
            </Link>
        </div>
    )
}

export default AdminSidebar;
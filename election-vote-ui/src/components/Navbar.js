import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/">
                    <Image
                        src="/img/logo.png"
                        width="280"
                        height="84"
                        alt="election-vote-logo"
                    />
                </Link>
            </div>
            <div className="flex-none gap-3">
                <Link href="/login" className="btn btn-outline btn-accent">Sign In</Link>
                <Link href="/register" className="btn btn-outline btn-secondary">Sign Up</Link>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
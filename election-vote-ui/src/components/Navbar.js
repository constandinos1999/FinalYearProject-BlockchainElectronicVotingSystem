import { useAppContext } from "@/context";
import IMetaMask from "@/icons/IMetaMask";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TestModals from "./Modal";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {

    const router = useRouter();
    const { isAuth, setAuth, setProfileInfo, profileInfo } = useAppContext();


    useEffect(() => {
        async function checkSession() {
            try {
                const token = window.sessionStorage.getItem("token");
                if (!token) router.replace("/");
                await axios.get(
                    `${process.env.REST_API}/accessResource`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                ).then(res => {
                    setAuth(true);
                    setProfileInfo(res.data.data);
                    if (res.data.data.isAdmin) {
                        if (pathnames[1] == "voter") router.replace("/admin");
                    }
                    else {
                        if (pathnames[1] == "admin") router.replace("/voter");
                    }
                }).catch(err => {
                    logout();
                });
            } catch(err) {
                logout();
            }
        }

        const pathnames = router.pathname.split("/");
        if (pathnames[1] === "admin" || pathnames[1] === "voter") checkSession();
    }, [router]);

    const logout = () => {
        window.sessionStorage.removeItem("token");
        setAuth(false);
        router.replace("/");
        setProfileInfo({});
    }

    const EditProfile = () => {

    }

    return (
        <div className="navbar bg-slate-900 border-b-2 border-slate-900">
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
                {
                    !isAuth ? (
                        <>
                            <Link href="/login" className="btn btn-primary">Sign In</Link>
                            <Link href="/register" className="btn btn-primary">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <ConnectWallet/>
                            <TestModals />
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-24 rounded-full">
                                        <img src=""/>
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            {profileInfo.email}
                                        </a>
                                    </li>
                                    <li onClick={logout}><a>Logout</a></li>
                                </ul>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;
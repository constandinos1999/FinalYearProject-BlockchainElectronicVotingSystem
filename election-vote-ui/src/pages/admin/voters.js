import AdminSidebar from "@/components/AdminSidebar";
import VoterCard from "@/components/cards/VoterCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Voters = () => {
    
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        async function getVoters() {
            try {
                await axios.get(
                    `${process.env.REST_API}/fetch-voters`
                ).then(res => {
                    setVoters(res.data.voters);
                }).catch(err => {

                })
            } catch(err) {

            }
        }
        getVoters();
    }, [])

    return (
        <section className="flex">
            <AdminSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="flex gap-4 mt-5">
                    {voters.map((item, idx) => (
                        item.firstName == 'Admin' ? (<VoterCard key={idx} data={item}/>):''
                    ))}
                </div>
                <div className="flex gap-4 mt-5">
                    {voters.map((item, idx) => (
                        item.firstName !== 'Admin' ? (<VoterCard key={idx} data={item}/>):''
                    ))}
                </div>
            </main>
        </section>
    )
}

export default Voters;
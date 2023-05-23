import ElectionCard from "@/components/cards/ElectionCard";
import VoterSidebar from "@/components/VoterSidebar";
import { bitQuery } from "@/constants/bitquery_graphql";
import { useAppContext } from "@/context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

const Elections = () => {


    const [elections, setElections] = useState([]);

    useEffect(() => {
        fetchElections();
    }, [])

    const fetchElections = async() => {
        try {
            await axios.post(
                "https://graphql.bitquery.io/",
                {
                    query: bitQuery
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-KEY": process.env.BIT_API_KEY
                    },
                },
            ).then(res => {
                setElections([...elections, ...res.data.data.ethereum.smartContractEvents])
            }).catch(err => {

            })
        } catch(err) {
            
        }
    }

    return (
        <section className="flex">
            <VoterSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="flex gap-4 mt-5">
                    {
                        elections.map((item, idx) => (
                            <ElectionCard address={item.arguments[1].value} key={idx}/>
                        ))
                    }
                </div>
            </main>

        </section>
    )
}

export default Elections;
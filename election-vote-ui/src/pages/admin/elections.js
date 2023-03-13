import AdminSidebar from "@/components/AdminSidebar";
import ElectionCard from "@/components/cards/ElectionCard";
import { bitQuery } from "@/constants/bitquery_graphql";
import { useAppContext } from "@/context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

const Elections = () => {

    const { factoryContract, account } = useAppContext();
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [elections, setElections] = useState([]);

    useEffect(() => {
        fetchElections();
    }, [])

    const createElection = async() => {
        try {
            if (!email || !description) {
                return;
            }
            const client = new Web3Storage({ token: process.env.IPFS_TOKEN });
            const metadata = {
                name,
                email,
                description,
            };
            const uriBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            const uriCid = await client.put([
                new File([uriBlob], 'meta.json')
            ]);
            const fullMetadataUrl = `https://${uriCid}.ipfs.w3s.link/meta.json`;
            await factoryContract.methods.createElection(email, fullMetadataUrl).send({
                from: account
            });

        } catch(err) {
            console.log(err)
        }
    }

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
            <AdminSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="text-right w-full">
                    <button className="btn btn-outline btn-accent" onClick={() => setOpenModal(true)}>Create New Election</button>
                </div>
                <div className="flex gap-4 mt-5">
                    {
                        elections.map((item, idx) => (
                            <ElectionCard address={item.arguments[1].value} key={idx}/>
                        ))
                    }
                </div>
            </main>

            <input type="checkbox" id="new-election-modal" className="modal-toggle" checked={openModal} readOnly/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Election</h3>
                    <div className="w-full px-8 mb-5">
                        <label htmlFor="" className="text-xs font-semibold px-1">Name</label>
                        <div className="flex">
                            <input type="text" className="w-full p-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" name="name" placeholder="Election Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="w-full px-8 mb-5">
                        <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                        <div className="flex">
                            <input type="email" className="w-full p-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" name="email" placeholder="johnsmith@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="w-full px-8 mb-5">
                        <label htmlFor="" className="text-xs font-semibold px-1">Description</label>
                        <div className="flex">
                            <textarea className="w-full h-48 p-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Input description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-success text-white" onClick={createElection}>Create</label>
                        <label htmlFor="my-modal" className="btn btn-error text-white">Cancel</label>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Elections;
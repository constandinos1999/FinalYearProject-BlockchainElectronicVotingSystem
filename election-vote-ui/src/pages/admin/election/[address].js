import AdminSidebar from "@/components/AdminSidebar";
import CandidateCard from "@/components/cards/CandidateCard";
import { electionABI } from "@/constants/abi";
import { useAppContext } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

const Candidates = () => {

    const { query } = useRouter();
    const { web3Provider, account } = useAppContext();

    const [candidates, setCandidates] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [electionImage, setElectionImage] = useState();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        async function fetchCandidateNumber() {
            const contract = new web3Provider.eth.Contract(electionABI, query.address);
            const candiNum = await contract.methods.getNumOfCandidates().call();
            setCandidates(+candiNum);
        }
        if (query.address) fetchCandidateNumber();
    }, [query])

    const selectImage = (e) => {
        const file = e.target.files[0];
        setElectionImage(file);
    }

    const addCandidate = async() => {
        try {
            if (!electionImage || !email || !description || !account) {
                return;
            }
            const client = new Web3Storage({ token: process.env.IPFS_TOKEN });
            const imageCid = await client.put([ electionImage ]);
            const metadata = {
                name,
                email,
                description,
                image: `https://${imageCid}.ipfs.w3s.link/${electionImage.name}`
            };
            const uriBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            const uriCid = await client.put([
                new File([uriBlob], 'meta.json')
            ]);
            const fullMetadataUrl = `https://${uriCid}.ipfs.w3s.link/meta.json`;
            const contract = new web3Provider.eth.Contract(electionABI, query.address);
            await contract.methods.addCandidate(email, fullMetadataUrl).send({
                from: account
            });

        } catch(err) {
            console.log(err)
        }
    }

    const format = () => {
        setOpenModal(false);
        setElectionImage(null);
        setEmail("");
        setName("");
        setDescription("");
    }

    return (
        <section className="flex">
            <AdminSidebar/>
            <main className="ml-24 p-5 w-full">
                <div className="text-right w-full">
                    <button className="btn btn-outline btn-accent" onClick={() => setOpenModal(true)}>Add New Candidate</button>
                </div>
                <div className="flex gap-4 mt-5">
                    {
                        [...Array(candidates)].map((item, idx) => (
                            <CandidateCard index={idx} key={idx}/>
                        ))
                    }
                </div>
            </main>
            <input type="checkbox" id="new-election-modal" className="modal-toggle" checked={openModal} readOnly/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Candidate</h3>
                    <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                        <header className="border-dashed border-2 border-gray-400 w-full overflow-hidden h-48 flex flex-col justify-center items-center">
                            {
                                electionImage ? <img src={URL.createObjectURL(electionImage)} alt="election image" className="w-full"/> :
                                <div className="py-12">
                                    <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                        <span>Select Election Image</span>
                                    </p>
                                    <label
                                        htmlFor="election-photo"
                                        className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                                    >
                                        Upload a file
                                    </label>
                                    <input type="file" id="election-photo" className="hidden" onChange={selectImage} />
                                </div>
                            }
                        </header>
                    </section>
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
                        <label htmlFor="my-modal" className="btn btn-success text-white" onClick={addCandidate}>Create</label>
                        <label htmlFor="my-modal" className="btn btn-error text-white" onClick={format}>Cancel</label>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Candidates;
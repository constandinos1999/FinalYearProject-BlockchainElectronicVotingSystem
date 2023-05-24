import { electionABI } from "@/constants/abi";
import { useAppContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaVoteYea } from "react-icons/fa";
import { Store } from "react-notifications-component";
import { notification } from "@/constants/notification";
import { title, uptime } from "process";
import Web3 from "web3";

const CandidateCard = ({ index = -1 }) => {
  const { query } = useRouter();
  const { web3Provider, account, profileInfo } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const [isVoting, setVoting] = useState(false);
  const [isUpdate, setUpdate] = useState(true);
  const [metaInfo, setMetaInfo] = useState("");
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    async function fetchCandidateInfo() {
      const contract = new web3Provider.eth.Contract(
        electionABI,
        query.address
      );
      const info = await contract.methods.getCandidate(index).call();
      console.log("INFOOO", info);
      const _metaInfo = await axios
        .get(info[2])
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("METAAA:", _metaInfo);
      setVoteCount(info[3]);
      setMetaInfo(_metaInfo);
      setLoading(false);
    }
    if (index > -1) {
      fetchCandidateInfo();
    }
  }, [index, isUpdate]);

  //   const [txHash,setTxHash] = useState()

  const CustomNotification = ({ txHash }) => {
    const [visible, setVisible] = useState(true);
    console.log("txhash here:", txHash);
    useEffect(() => {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }, []);
    const handleClick = () => {
      window.open(`https://testnet.bscscan.com/tx/${txHash}`, "_blank");
      setVisible(false);
    };

    return visible ? (
      <div
        className="bg-white border text-left flex flex-row justify-center items-center border-gray-300 p-3 rounded shadow-md"
        onClick={handleClick}
      >
        <h4 className="text-lg  font-semibold">{`Transaction Hash: https://testnet.bscscan.com/tx/${txHash}`}</h4>
      </div>
    ) : null;
  };
  const vote = async () => {
    try {
      if (!account) {
        Store.addNotification({
          ...notification,
          type: "warning",
          title: "Warning",
          message: "Please connect MetaMask",
        });
        return;
      }

      setVoting(true);
      const contract = new web3Provider.eth.Contract(
        electionABI,
        query.address
      );
     await contract.methods.vote(index, profileInfo.email).send({
        from: account,
      });

      setUpdate(!isUpdate)
      Store.addNotification({
        ...CustomNotification(),
        type: "success",
        title: "Success",
        message: "Voted Successfully!",
      });
        }catch (err) {
      if (err?.code !== 4001) {
        Store.addNotification({
          ...notification,
          type: "success",
        title: "Success",
        message: "Voted Successfully!",
        });
      }
    }
    setVoting(false);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        {isLoading ? (
          <Skeleton className="!w-80 max-w-80" height={300} />
        ) : (
          <img src={metaInfo.image} alt={metaInfo.name} />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {isLoading ? (
            <Skeleton className="!w-80 max-w-80" height={30} />
          ) : (
            metaInfo.name
          )}
        </h2>
        <p className="h-40">
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            metaInfo.description
          )}
        </p>
        <div className="card-actions justify-between items-center">
          <div className="flex gap-2 items-center">
            <FaVoteYea className="w-8 h-8" />
            <b className="text-2xl">{voteCount}</b>
          </div>
          {profileInfo.isAdmin ? (
            ""
          ) : (
            <button
              className={`btn btn-primary ${
                isVoting ? "loading disabled" : ""
              }`}
              onClick={vote}
            >
              {isVoting ? "Voting..." : "Vote"}
            </button>
          )} 
          {/* <CustomNotification/> */}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;

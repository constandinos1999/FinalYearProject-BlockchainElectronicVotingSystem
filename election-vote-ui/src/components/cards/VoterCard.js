const VoterCard = ({ data }) => {
    return (
        <div className="card w-64 h-64 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{`${data.firstName} ${data.lastName}`}</h2>
                <p>{data.email}</p>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    )
}

export default VoterCard;
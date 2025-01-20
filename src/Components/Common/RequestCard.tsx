import React from "react";

type RequestCardProps = {
    name: string;
    role: string;
    status: string;
    imageUrl: string;
};

const RequestCard: React.FC<RequestCardProps> = ({ name, role, status, imageUrl }) => {
    return (
        <div className="flex justify-between items-center bg-blue-50 border border-gray-300 rounded-lg m-2 h-24">
            <div className="flex items-center p-2 h-full">
                <img
                    src={imageUrl}
                    alt={`${name}'s profile`}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-gray-600">{role}</p>
                    <p className="text-sm text-green-600">
                        <span className="font-medium">Status: </span>
                        {status}
                    </p>
                </div>
            </div>
            <div
                className="h-full w-1/5 flex justify-center items-center"
                style={{
                    background: "#B2D6E4 0% 0% no-repeat padding-box",
                    color: "#05A5C3"
                }}
            >
                View
            </div>
        </div>
    );
};

export default RequestCard;

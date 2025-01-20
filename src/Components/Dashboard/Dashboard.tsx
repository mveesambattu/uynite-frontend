import React from "react";
import RequestCard from "../RequestCard";
import celebrityIcon from "../../assets/Celibrity Request.svg";
import eventIcon from "../../assets/Sponserd event.svg";
import reportsIcon from "../../assets/Reports.svg";
import supportIcon from "../../assets/Support.svg";
import blockedIcon from "../../assets/Block user.svg";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card: any) => (
            <RequestCard
              key={card.id}
              title={card.title}
              stats={card.stats}
              icon={card.icon}
              bgColor={card.bgColor}
              navigateTo={card.navigateTo} // Pass the route
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const cardsData = [
  {
    id: 1,
    title: "Celebrity Request",
    stats: { pending: 0, verified: 0, rejected: 0 },
    icon: <img src={celebrityIcon} alt="Celebrity Request" className="w-12 h-12" />,
    bgColor: "bg-blue-100",
    navigateTo: "/celebrity-request",
  },
  {
    id: 2,
    title: "Sponsored Event",
    stats: { ongoing: 200 },
    icon: <img src={eventIcon} alt="Sponsored Event" className="w-12 h-12" />,
    bgColor: "bg-blue-100",
    navigateTo: "/sponsored-event",
  },
  {
    id: 3,
    title: "Reports",
    stats: { received: 0 },
    icon: <img src={reportsIcon} alt="Reports" className="w-12 h-12" />,
    bgColor: "bg-blue-100",
    navigateTo: "/reports",
  },
  {
    id: 4,
    title: "Support",
    stats: { opened: 0, replied: 0, ignored: 0 },
    icon: <img src={supportIcon} alt="Support" className="w-12 h-12" />,
    bgColor: "bg-blue-100",
    navigateTo: "/support",
  },
  {
    id: 5,
    title: "Blocked Users",
    stats: { description: "Block/Unblock Users" },
    icon: <img src={blockedIcon} alt="Blocked Users" className="w-12 h-12" />,
    bgColor: "bg-blue-100",
    navigateTo: "/blocked-users",
  },
];


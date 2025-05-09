"use client";

import { useCall } from "../context/CallContext";
import {
  FaPhone,
  FaVideo,
  FaPhoneSlash,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const CallHistory = () => {
  const { callHistory } = useCall();

  // Format date/time
  const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Get status icon
  const getStatusIcon = (status, type) => {
    switch (status) {
      case "missed":
        return <FaPhoneSlash className="text-red-500" />;
      case "outgoing":
        return <FaArrowUp className="text-blue-500" />;
      case "received":
        return <FaArrowDown className="text-green-500" />;
      case "ended":
        return type === "video" ? (
          <FaVideo className="text-gray-500" />
        ) : (
          <FaPhone className="text-gray-500" />
        );
      default:
        return type === "video" ? (
          <FaVideo className="text-gray-500" />
        ) : (
          <FaPhone className="text-gray-500" />
        );
    }
  };

  return (
    <div className="overflow-y-auto max-h-96">
      {callHistory.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>Tidak ada riwayat panggilan</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {callHistory.map((call) => (
            <li
              key={call.id}
              className="py-3 hover:bg-gray-50 transition duration-150"
            >
              <div className="flex items-center">
                <div className="p-2">
                  {getStatusIcon(call.status, call.type)}
                </div>
                <div className="flex-1 ml-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{call.number}</span>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(call.startTime)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span className="flex items-center">
                      {call.type === "video" ? (
                        <FaVideo className="mr-1" />
                      ) : (
                        <FaPhone className="mr-1" />
                      )}
                      <span className="capitalize">{call.status}</span>
                    </span>
                    <span>{formatDuration(call.duration)}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CallHistory;

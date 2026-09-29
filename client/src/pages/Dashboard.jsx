
import {
  ArrowRightIcon,
  KeyboardIcon,
  PlusIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyStats, dummyUser } from "../assets/asset";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const user = dummyUser;
  const username = user?.fullName || "User";
  const userEmail =
    user?.primaryEmailAddress?.emailAddress || "No email";

  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [joinId, setJoinId] = useState("");

  const stats = dummyStats;

  // Live clock with seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCreateMeeting = () => {
    if (isCreating) return;

    setIsCreating(true);

    const chars = "abcdefghijklmnopqrstuvwxyz";

    const seg = () =>
      Array.from(
        { length: 3 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");

    const newMeetingId = `${seg()}-${seg()}-${seg()}`;

    setTimeout(() => {
      setIsCreating(false);
      toast.success("Meeting Created");
      navigate(`/meeting/${newMeetingId}`);
    }, 400);
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();

    const cleanedId = joinId.trim().toLowerCase();

    if (!/^[a-z]{3}(?:-[a-z]{3}){2}$/.test(cleanedId)) {
      toast.error("Please enter a valid Meeting ID");
      return;
    }

    navigate(`/meeting/${encodeURIComponent(cleanedId)}`);
  };

  const monthlyCount = Number(stats?.monthlyCount) || 0;
  const monthlyLimit = Number(stats?.monthlyLimit) || 0;

  const usagePercentage =
    monthlyLimit > 0
      ? Math.min((monthlyCount / monthlyLimit) * 100, 100)
      : 0;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">

        {/* Left Column - Actions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-5">

            <div className="inline-flex items-center gap-2 px-3.5 pr-5 py-2 rounded-full bg-pink-50 border border-pink-100 text-xs font-medium text-slate-700">
              <ShieldCheckIcon size={16} className="text-pink-600" />
              Secure End-to-End Encryption
            </div>

            <h1 className="text-4xl sm:text-5xl text-slate-800 leading-tight font-semibold tracking-tight">
              High Quality Video Calls
              <br />
              <span className="text-pink-600">
                Built For Everyone.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Face-to-face conversations, effortless screen sharing, and
              seamless collaboration. Everything you need to connect,
              all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">

              <button
                onClick={handleCreateMeeting}
                disabled={isCreating}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3.5 rounded-full shadow-md shadow-pink-200 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="w-5 h-5" />
                <span>
                  {isCreating ? "Creating..." : "New Meeting"}
                </span>
              </button>

              <form
                onSubmit={handleJoinMeeting}
                className="flex-1 flex items-center gap-3 min-w-0"
              >
                <div className="relative flex-1 min-w-0">
                  <KeyboardIcon className="w-5 h-5 text-pink-500 absolute left-4 top-1/2 -translate-y-1/2" />

                  <input
                    type="text"
                    placeholder="Enter Meeting Code (e.g. abc-def-xyz)"
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    maxLength={11}
                    autoComplete="off"
                    className="w-full bg-white/80 border border-pink-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-full pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!joinId.trim()}
                  className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-white font-medium px-4 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Join</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Clock & Stats Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">

          <div className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-lg shadow-pink-100/40 text-center space-y-6 relative overflow-hidden">

            <div className="space-y-1">
              <p className="mb-5 text-xl text-left font-medium text-slate-800">
                Hi, {username}
              </p>

              <h2 className="text-4xl sm:text-5xl xl:text-6xl text-slate-900 tracking-tight font-semibold tabular-nums whitespace-nowrap">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h2>

              <p className="font-medium tracking-wide text-pink-600 pt-2">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="pt-4 border-t border-pink-100 text-sm text-slate-600">

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5">
                <div className="text-left min-w-0">
                  <p className="text-xs text-slate-500 mb-1">
                    Logged in as
                  </p>
                  <p className="text-slate-900 font-medium break-all">
                    {userEmail}
                  </p>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full font-semibold text-xs uppercase shrink-0 ${
                    stats?.plan?.toLowerCase() === "premium"
                      ? "bg-pink-700 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {stats?.plan || "Free"}
                </span>
              </div>

              {stats && (
                <div className="w-full bg-white/80 rounded-2xl p-5 border border-pink-100 text-left">

                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Monthly Meetings
                    </span>

                    <span className="text-xs text-slate-500 font-medium text-right">
                      {monthlyLimit > 0
                        ? `${monthlyCount}/${monthlyLimit} Used`
                        : `${monthlyCount} Created · Unlimited`}
                    </span>
                  </div>

                  {monthlyLimit > 0 && (
                    <>
                      <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-500 rounded-full transition-all duration-300"
                          style={{ width: `${usagePercentage}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {Math.max(monthlyLimit - monthlyCount, 0)} meetings
                        remaining
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

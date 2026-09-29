
import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full max-w-[1220px] mx-auto bg-white/30 backdrop-blur-xl
      rounded-t-xl border-t border-slate-200/80
      px-4 py-5 sm:px-6 sm:py-6 text-center"
    >
      <p className="text-xs font-medium text-slate-600">
        &copy; {new Date().getFullYear()} MeetX. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;

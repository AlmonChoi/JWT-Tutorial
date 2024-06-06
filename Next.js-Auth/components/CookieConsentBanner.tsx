"use client";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentCookie = cookie.get("cookieConsent");

    if (!consentCookie) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "accepted", { expires: 365 });
  };

  const handleReject = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "rejected", { expires: 365 });
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div className="w-full h-10 bg-gray-20 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            This is cookie concent banner message. Please click Accept or Reject
            to continue.
            <div className="inline-flex">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-blue-800 font-bold py-2 px-4 rounded-l"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-red-400 font-bold py-2 px-4 rounded-r"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsentBanner;

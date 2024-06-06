"use client";
import Link from "next/link";
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

    <div className="flex flex-col fixed inset-x-0 bottom-0 z-20  justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8 xs:block">
    <p className="max-w-4xl text-sm leading-6 text-gray-900">
        This website uses cookies to enhance your browsing experience, analyze
        site traffic, and serve better user experiences. By continuing to use
        this site, you consent to our use of cookies. Learn more in our{" "}
        <Link className="font-semibold text-[#8A2BE2]" href="/cookies">
          cookie policy
        </Link>
      </p>   
    
    <div className="flex gap-2">
        <div className="mr-16 flex flex-none items-center gap-x-5">
          <button
            onClick={handleAccept}
            type="button"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Accept 🍪
          </button>
          <button
            onClick={handleReject}
            type="button"
            // className="text-sm font-semibold leading-6 hover:bg-gray-400 text-red-400 rounded-r"
            className="bg-gray-300 hover:bg-gray-400 text-red-400 font-bold py-2 px-4 rounded-r"
          >
            Reject
          </button>
        </div>
      </div>
      </div>


    </>
  );
};

export default CookieConsentBanner;

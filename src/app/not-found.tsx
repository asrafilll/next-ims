import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="mt-4 py-28 flex w-full flex-col items-center justify-center text-center rounded-[10px] border border-stroke bg-white bg-[url('/images/NCI/img/bg2.webp')] bg-cover bg-no-repeat">
      <div className="mx-auto flex flex-col items-center">
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-black ">Page Not Found</h2>
          <p className="text-gray-500 w-60">
            We&apos;re sorry, but the page you requested doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
          >
            <svg
              className="fill-current"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7492 6.38125H2.73984L7.52109 1.51562C7.77422 1.2625 7.77422 0.86875 7.52109 0.615625C7.26797 0.3625 6.87422 0.3625 6.62109 0.615625L0.799219 6.52187C0.546094 6.775 0.546094 7.16875 0.799219 7.42188L6.62109 13.3281C6.73359 13.4406 6.90234 13.525 7.07109 13.525C7.23984 13.525 7.38047 13.4687 7.52109 13.3562C7.77422 13.1031 7.77422 12.7094 7.52109 12.4563L2.76797 7.64687H14.7492C15.0867 7.64687 15.368 7.36562 15.368 7.02812C15.368 6.6625 15.0867 6.38125 14.7492 6.38125Z"
                fill=""
              />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
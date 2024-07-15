import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventListCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-4">
      <div className="w-full md:w-60 h-48 md:h-72">
        <Skeleton height="100%" />
      </div>
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-center">
        <div>
          <div className="uppercase tracking-wide text-lg text-purple-700 font-bold">
            <Skeleton width="60%" />
          </div>
          <p className="mt-2 text-slate-500 text-sm">
            <Skeleton count={3} />
          </p>
        </div>
        <div className="pt-4">
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Skeleton circle={true} height={16} width={16} className="mr-1" />
            <Skeleton width="40%" />
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Skeleton circle={true} height={16} width={16} className="mr-1" />
            <Skeleton width="60%" />
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Skeleton circle={true} height={16} width={16} className="mr-1" />
            <Skeleton width="50%" />
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Skeleton circle={true} height={16} width={16} className="mr-1" />
            <Skeleton width="30%" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-xl p-4 font-semibold text-purple-700 xl:border-l-2 border-dashed w-48">
        <Skeleton width="80%" />
      </div>
    </div>
  );
}

export default EventListCardSkeleton;

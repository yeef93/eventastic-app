import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventCardSkeleton (){
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full sm:w-80 md:w-96 lg:w-96 xl:w-96 mx-auto m-4">
      <div className="relative w-full h-48">
        <Skeleton height={192} />
      </div>
      <div className="p-4">
        <Skeleton width="75%" height={24} />
        <Skeleton width="50%" height={18} className="mt-2" />
        <div className="flex items-center mt-2">
          <Skeleton width={16} height={16} />
          <Skeleton width="60%" height={18} className="ml-2" />
        </div>
        <div className="flex items-center mt-2">
          <Skeleton width={16} height={16} />
          <Skeleton width="30%" height={18} className="ml-2" />
        </div>
        <div className="flex items-center mt-2">
          <Skeleton width={16} height={16} />
          <Skeleton width="50%" height={18} className="ml-2" />
        </div>
        <Skeleton width="25%" height={24} className="mt-4" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
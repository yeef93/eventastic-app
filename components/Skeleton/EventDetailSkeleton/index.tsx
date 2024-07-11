import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventDetailSkeleton (){
  return (
    <div className="py-7">
      <Skeleton height={400} />
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        <div className="mt-6 md:flex md:justify-between md:items-start">
          <div className="md:w-2/3 md:pr-8">
            <Skeleton height={40} width="60%" />
            <div className="mt-4">
              <Skeleton height={30} width="40%" />
              <Skeleton height={20} width="80%" />
            </div>
            <div className="mt-4">
              <Skeleton height={30} width="40%" />
              <Skeleton height={20} width="80%" />
            </div>
            <div className="mt-4">
              <Skeleton height={30} width="40%" />
              <Skeleton height={100} />
              <Skeleton height={30} width="40%" className="mt-4" />
              <Skeleton height={20} width="20%" />
            </div>
          </div>
          <div className="md:w-1/3 md:mt-0 mt-8 md:px-8 sticky top-16">
            <Skeleton height={20} width="50%" />
            <Skeleton height={20} width="50%" className="mt-2" />
            <Skeleton height={20} width="50%" className="mt-2" />
            <Skeleton height={20} width="50%" className="mt-2" />
            <Skeleton height={20} width="50%" className="mt-2 pb-4" />
            <Skeleton height={40} width="100%" className="mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailSkeleton;

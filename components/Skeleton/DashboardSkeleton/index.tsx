import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <div className="py-20">
      <div className="uppercase tracking-wide text-lg text-slate-500 font-bold">xxxxxxxxxxxxxxxx
        <Skeleton width="60%" />
      </div>
      <p className="mt-2 text-slate-500 text-sm">
        <Skeleton count={3} />
      </p>
    </div>
  );
};

export default DashboardSkeleton;

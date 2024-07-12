import React from 'react';

const EventTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="flex justify-center space-x-2">
          <div className="animate-pulse h-4 w-4 bg-gray-300 rounded"></div>
          <div className="animate-pulse h-4 w-4 bg-gray-300 rounded"></div>
        </div>
      </td>
    </tr>
  ));

  return (
    <tbody>
      {skeletonRows}
    </tbody>
  );
};

export default EventTableSkeleton;

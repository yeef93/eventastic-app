import React from "react";

function CallToAction() {
  return (
    <div className="bg-gray-200 py-10 px-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Events specially curated for you!
      </h2>
      <p className="mb-6">
        Get event suggestions tailored to your interests! Don`&apos;`t let your
        favorite events slip away.
      </p>

      <a
        href="/"
        className="inline-block bg-gray-800 text-white text-lg font-semibold py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300"
      >
        Get Started &rarr;
      </a>
    </div>
  );
}

export default CallToAction;

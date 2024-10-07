import React from "react";

const BodyPage = () => {
  return (
    <div className="p-2 flex flex-col items-center">
      <div className="rounded-lg bg-amber-300 p-2">Free SEO Tools</div>
      <h1 className="text-3xl">Robots.txt Tester</h1>
      <p className="pt-2 text-center text-wrap w-1/2">
        Check if your website uses a proper robots.txt file. If there are URLs
        you do not want to be indexed by search engines, you can use the
        "robots.txt" file to define <br></br> where the robots should not go.
      </p>
    </div>
  );
};

export default BodyPage;

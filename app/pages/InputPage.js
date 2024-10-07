"use client";
import { useState } from "react";

const InputPage = () => {
  /*const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();

    // Remove "http://" or "https://" from user input if provided
    const formattedUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

    try {
      // Fetch robots.txt file
      const response = await fetch(
        `https://${encodeURIComponent(formattedUrl)}/robots.txt`
      );

      if (!response.ok) {
        setError("Error: Could not fetch the robots.txt file.");
        return;
      }

      const data = await response.text();
      setResult(data);
    } catch (error) {
      setError("Invalid URL. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">SEO Tool</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g., example.com)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleCheck}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Check robots.txt
        </button>

        {result ? (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg overflow-auto max-h-50 text-sm w-full">
            <div className="flex flex-col">
              <h1 className="border-b border-gray-400">Raw Text</h1>
              <pre>{result}</pre>
            </div>
          </div>
        ) : (
          <div>{error}</div>
        )}
      </div>
    </div>
  );*/
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Enter website URL (e.g., example.com)"
        className="w-full px-5 py-5 pr-2 pl-2 rounded-sm bg-blue-700 focus:shadow-md transition-all duration-300 delay-150"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 bg-amber-500 text-white p-3 mt-2 mr-2 rounded-sm focus:outline-none"
      >
        Submit
      </button>
    </div>
  );
};

export default InputPage;

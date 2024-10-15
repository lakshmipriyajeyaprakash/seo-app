"use client";
import { useState, useRef, useEffect } from "react";

const InputPage = () => {
  const [url, setUrl] = useState("");
  const [inputDiv, showInputDiv] = useState(false);
  const inputRef = useRef();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [parsedRules, setParsedRules] = useState([]);
  const [parsedSitemap, setParsedSitemap] = useState([]);

  useEffect(() => {
    if (inputDiv && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputDiv]);

  const handleCheck = async () => {
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

      // Parse the robots.txt content into rules
      const rules = parseRobotsTxt(data);
      setParsedRules(rules);

      //Parse the robots.txt content into sitemap
      const siteMap = siteMapTxt(data);
      setParsedSitemap(siteMap);
    } catch (error) {
      setError("Invalid URL. Please try again.");
    }
  };

  // Robots.txt Parse Function
  const parseRobotsTxt = (data) => {
    const lines = data.split("\n");
    const parsed = [];

    lines.forEach((line) => {
      line = line.trim(); // Remove whitespace

      if (line.startsWith("User-agent:")) {
        // Fetching "User-agent:" Values
        let agent = line.replace("User-agent:", "").trim();
        if (agent === "*") {
          agent = "All";
        }
        parsed.push({ agent: agent, rules: [] });
      } else if (line.startsWith("Allow") || line.startsWith("Disallow")) {
        if (parsed.length === 0) {
          parsed.push({ agent: "All", rules: [] });
        }
        parsed[parsed.length - 1].rules.push(line);
      }
    });

    return parsed;
  };
  // Fetching SiteMap
  const siteMapTxt = (data) => {
    const siteLines = data.split("\n");

    const siteMapParsed = [];
    siteLines.forEach((siteLine) => {
      siteLine = siteLine.trim();
      if (siteLine.startsWith("Sitemap:")) {
        siteLine = siteLine.replace("Sitemap:", "").trim();
        siteMapParsed.push(siteLine);
        console.log(siteMapParsed);
      }
    });
    return siteMapParsed;
  };

  return (
    <div className="">
      <div
        className={`${
          inputDiv ? "px-1 py-1" : ""
        }relative flex items-center gap-2 w-full px-4 py-5 pr-2 pl-2 rounded-sm bg-blue-700 focus:shadow-md transition-all duration-300 delay-150`}
        onClick={() => {
          showInputDiv(true);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCheck();
            }
          }}
          placeholder="Enter website URL (e.g., example.com)"
          className={`${inputDiv ? "block" : "hidden"} w-full rounded-sm p-1`}
          autoFocus={inputDiv}
        />
        <button
          type="submit"
          onClick={handleCheck}
          className={`${
            inputDiv ? "p-3 mt-0 mr-2" : ""
          }absolute right-0 top-1 p-1 mr-1 bg-amber-500 text-white rounded-sm focus:outline-none`}
        >
          Submit
        </button>
      </div>
      <div>
        {result ? (
          <div>
            <div className="mt-4 bg-gray-100 rounded-lg overflow-auto max-h-50 text-sm w-full">
              <div className="flex flex-col">
                <div className="border-b p-4 w-full border-white-400">
                  <h1 className=" text-lg lg:text-3xl">Robots.txt Rules</h1>
                  <div className="mt-5">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="lg:px-8 lg:py-6 md:py-6 text-gray-600 text-left lg:text-center text-xl">
                            CRAWLER
                          </th>
                          <th className="lg:px-8 lg:py-6 md:py-6 text-gray-600 text-left text-xl">
                            RULES
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedRules.map((item, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 !== 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="border-b lg:px-8 lg:py-6 md:py-6 lg:text-center lg:text-lg text-gray-800">
                              <h2>{item.agent}</h2>
                            </td>
                            <td className="border-b lg:px-8 lg:py-6 md:py-6 lg:text-lg text-gray-800">
                              <ul>
                                {item.rules.map((rule, idx) => (
                                  <li key={idx}>{rule}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-100 rounded-lg overflow-auto max-h-50 lg:text-lg w-full">
              <div className="flex flex-col">
                <div className="border-b p-4 w-full border-white-400">
                  <h1 className=" p-4 w-full border-white-400 text-lg lg:text-3xl">
                    Sitemaps
                  </h1>
                  <div className="mt-5">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="lg:px-8 lg:py-6 md:py-6 text-gray-600 text-left lg:text-center text-xl">
                            PRIORITY
                          </th>
                          <th className="lg:px-8 lg:py-6 md:py-6 text-gray-600 text-left text-xl">
                            LOCATION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedSitemap.map((site, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 !== 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            {console.log(site)}
                            <td className="border-b lg:px-8 lg:py-6 md:py-6 lg:text-center lg:text-lg text-gray-800">
                              {parsedSitemap.length - index}
                            </td>
                            <td className="border-b lg:px-8 lg:py-6 md:py-6 lg:text-lg text-gray-800">
                              {site}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-100 rounded-lg overflow-auto max-h-50 lg:text-lg w-full">
              <div className="flex flex-col">
                <h1 className="border-b p-4 w-full border-white-400 text-lg lg:text-3xl">
                  Raw Text
                </h1>
                <pre className="mt-4 p-6 text-wrap">{result}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div>{error}</div>
        )}
      </div>
    </div>
  );
};

export default InputPage;

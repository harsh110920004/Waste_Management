import { useEffect, useState } from "react";
import axios from "axios";

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await axios.get("http://localhost:5000/api/reports");
    setReports(res.data);
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4 text-center">
        📊 Reports Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {reports.map((r) => (
          <div key={r._id} className="bg-white rounded-xl shadow-md p-4">

            <img
              src={r.image}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <p className="text-sm text-gray-600 mb-1">
              📍 {r.location || "No location"}
            </p>

            <p className="mb-2">
              Status:
              <span className="ml-2 px-2 py-1 bg-yellow-200 rounded text-sm">
                {r.status}
              </span>
            </p>

            <p>
              AI:
              {r.aiVerified ? (
                <span className="text-green-600 ml-2">✅ Waste</span>
              ) : (
                <span className="text-red-500 ml-2">❌ Not Waste</span>
              )}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default ReportList;
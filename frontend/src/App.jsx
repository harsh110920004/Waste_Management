import { useState } from "react";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";

function App() {
  const [page, setPage] = useState("form");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">

      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">♻ Waste Management</h1>

        <div className="space-x-3">
          <button
            onClick={() => setPage("form")}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Report
          </button>

          <button
            onClick={() => setPage("list")}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Pages */}
      {page === "form" ? <ReportForm /> : <ReportList />}

    </div>
  );
}

export default App;
import { useState } from "react";
import axios from "axios";

function ReportForm() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
      setLocation(coords);
    });
  };

  const handleSubmit = async () => {
    if (!image) return alert("Upload image!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("location", location);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/reports", formData);
      alert("Report Submitted ✅");
      setImage(null);
      setPreview(null);
      setLocation("");
    } catch (err) {
      alert("Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[350px]">

        <h2 className="text-xl font-semibold mb-4 text-center">
          📸 Report Waste
        </h2>

        <input
          type="file"
          onChange={(e) => handleImage(e.target.files[0])}
          className="mb-4"
        />

        {preview && (
          <img
            src={preview}
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          onClick={getLocation}
          className="w-full bg-blue-500 text-white py-2 rounded mb-3"
        >
          📍 Auto Location
        </button>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

      </div>
    </div>
  );
}

export default ReportForm;
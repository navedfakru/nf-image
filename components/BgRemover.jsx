"use client";
import React, { useState } from "react";

function BgRemover() {
  const [image, setImage] = useState(null);         // file object
  const [imagePreview, setImagePreview] = useState(null); // URL for preview
  const [result, setResult] = useState(null);       // bg removed image
  const [loading, setLoading] = useState(false);
  const [endpoint, setEndpoint] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));  // show original
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    try {
      console.log(endpoint)
      const response = await fetch(`${endpoint}/remove-bg/`, {
        method: "POST",
        body: formData,
      });

      const blob = await response.blob(); // binary image
      const imageUrl = URL.createObjectURL(blob);
      setResult(imageUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = result
    link.download = "naved.png"
    link.click()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Background Remover (Fetch)</h2>
      <div>
        <input className="w-full py-2 mb-2 px-4  border-2 text-sm font-mono font-bold border-black" type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value.toString())} />
      </div>
      <h1>Enpoint is {endpoint}</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded ml-4"
      >
        Remove Background
      </button>

      {loading && <p className="mt-4">Processing...</p>}
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-center w-full h-full bg-blue-400/90">
          {imagePreview && (
            <div className="mt-4">
              <h4>Original Image:</h4>
              <img
                src={imagePreview}
                alt="Original"
                style={{ height: 200 }}
                className="mt-2 max-w-md"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center bg-red-200/20">
          {result && (
            <div className="mt-4 flex items-center justify-center flex-col">
              <h4>Background Removed:</h4>
              <img
                src={result}
                alt="No Background"
                style={{ height: 200 }}
                className="mt-2 max-w-md"
              />
              <h1 onClick={handleDownload} className="px-5 py-1 text-white cursor-pointer mt-2 hover:bg-black  bg-red-400 rounded-lg">download</h1>
            </div>
          )}
        </div>
      </div>
    </div>


  );
}

export default BgRemover;

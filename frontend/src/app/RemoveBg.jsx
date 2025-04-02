import { useState } from "react";

const RemoveBg = () => {
    const [base64Image, setBase64Image] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://127.0.0.1:5000'
        : "https://marvelous-swan-c2066f.netlify.app";
    // const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setError("Please select an image.");
            return;
        }
        setSelectedFile(file);
        setError(null);
    };

    const removeBg = async () => {
        if (!selectedFile) {
            setError("Please select an image first.");
            return;
        }

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append("image", selectedFile);

        console.log("BACKEND_URL updated:", BACKEND_URL);

        try {
            const response = await fetch(`${BACKEND_URL}/remove_background`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Failed to process image");

            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                setBase64Image(reader.result.split(",")[1]);
                setLoading(false);
            };
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (base64Image) {
            const link = document.createElement("a");
            link.href = "data:image/png;base64," + base64Image;
            link.download = "cutout_image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="bg-orange-200 w-full h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-white text-2xl font-bold">Image Cutout</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} className="my-4" />
            <button onClick={removeBg} className="bg-orange-500 px-4 py-2 rounded">Remove Background</button>

            {loading && <p className="text-yellow-400">Processing...</p>}

            {base64Image && (
                <div className="mt-4">
                    <button onClick={handleDownload} className="bg-blue-500 px-4 py-2 rounded">Download Image</button>
                    <div className="mt-4">
                        <img src={`data:image/png;base64,${base64Image}`} alt="Processed" className="w-48 h-auto" />
                    </div>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default RemoveBg;
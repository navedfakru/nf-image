import { useState } from 'react';

const RemoveBg = () => {
    const [base64Image, setBase64Image] = useState(null);
    const [error, setError] = useState(null);

    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('Please select an image.');
            return;
        }
        
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await fetch(`${BACKEND_URL}/remove_background`, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (data.image) {
                setBase64Image(data.image);
                setError(null);
            } else if (data.error) {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDownload = () => {
        if (base64Image) {
            const link = document.createElement('a');
            link.href = 'data:image/png;base64,' + base64Image;
            link.download = 'cutout_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <h1>Image Cutout</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleImageUpload}>Remove Background</button>
            {base64Image && (
                <>
                    <button onClick={handleDownload}>Download Image</button>
                    <div style={{ height: '200px' }}>
                        <img src={`data:image/png;base64,${base64Image}`} alt="Processed" style={{ height: '200px' }} />
                    </div>
                </>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default RemoveBg;

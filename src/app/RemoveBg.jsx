import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import { removeBackground } from "@imgly/background-removal";

const RemoveBg = () => {
  const [base64Image, setBase64Image] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [bgImage, setBgImage] = useState(null);
  const stageRef = useRef();

  const getScaledImageSize = (img, maxWidth, maxHeight) => {
    let width = img.width;
    let height = img.height;
    const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
    return {
      width: width * scaleFactor,
      height: height * scaleFactor,
    };
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        // Handle background removal using the image
        const imageBlob = await removeBackground(img.src);
        const imageUrl = URL.createObjectURL(imageBlob);
        setBase64Image(imageUrl);

        // Set canvas size after processing
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        const { width, height } = getScaledImageSize(img, maxWidth, maxHeight);
        setCanvasSize({ width, height });
        setScale(Math.min(maxWidth / width, maxHeight / height));
      };
    }
  };

  useEffect(() => {
    if (base64Image) {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        setBgImage(img);
      };
    }
  }, [base64Image]);

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = uri;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-amber-200 min-h-screen mb-20">
      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {/* Download Button */}
      <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Download
      </button>

      {/* Canvas */}
      {canvasSize.width && canvasSize.height && bgImage && (
        <div className="border shadow-lg bg-black flex justify-center items-center" style={{ overflow: 'hidden', width: '80vw', height: '80vh' }}>
          <Stage width={canvasSize.width} height={canvasSize.height} ref={stageRef} scaleX={scale} scaleY={scale}>
            <Layer>
              <KonvaImage image={bgImage} width={canvasSize.width} height={canvasSize.height} />
            </Layer>
          </Stage>
        </div>
      )}
    </div>
  );
};

export default RemoveBg;

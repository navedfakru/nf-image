import React, { useRef, useState, useEffect } from 'react';
import { ATTRACTIVE_FONTS, ALL_FONTS } from '../../constant/fonts';
import FontDropdown from './FontDropdown';

const CustomCanvas = () => {
  const canvasRef = useRef(null);
  const [bgImage, setBgImage] = useState(null);
  const [objImage, setObjImage] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const [textSet, setTextSet] = useState({
    text: 'HELLO WORLD',
    fontFamily: 'Inter',
    top: 0,
    left: 0,
    color: 'white',
    fontSize: 20,
    fontWeight: 800,
    opacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowSize: 4,
    rotation: 0,
    tiltX: 0,
    tiltY: 0,
  });


  const loadImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => callback(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const getScaledSize = (img, maxWidth, maxHeight) => {
    const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
    return {
      width: img.width * scale,
      height: img.height * scale,
    };
  };

  const handleImageUploadBg = (e) => {
    const file = e.target.files[0];
    if (file) {
      loadImage(file, (img) => {
        const maxWidth = window.innerWidth * 1;
        const maxHeight = window.innerHeight * 1;
        const { width, height } = getScaledSize(img, maxWidth, maxHeight);
        setCanvasSize({ width, height });
        setBgImage(img);
      });
    }
  };

  const handleImageUploadObj = (e) => {
    const file = e.target.files[0];
    if (file) {
      loadImage(file, (img) => {
        setObjImage(img);
      });
    }
  };

  const centerObject = () => {
    if (objImage) {
      setObjectPos({
        x: 0,
        y: 0,
      });
    }
  };

  const drawCanvas = (ctx, scaleFactor) => {
    const width = canvasSize.width;
    const height = canvasSize.height;

    ctx.canvas.width = width * scaleFactor;
    ctx.canvas.height = height * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, width, height);

    // Draw background
    if (bgImage) {
      ctx.drawImage(bgImage, 0, 0, width, height);
    }

    // Draw text with 3D effect
    ctx.save();
    ctx.translate(width / 2, height / 2);

    const tiltXRad = (-textSet.tiltX * Math.PI) / 180;
    const tiltYRad = (-textSet.tiltY * Math.PI) / 180;

    // Apply 3D tilt
    ctx.transform(
      Math.cos(tiltYRad),     // Horizontal scaling
      Math.sin(0),            // Vertical skewing
      -Math.sin(0),           // Horizontal skewing
      Math.cos(tiltXRad),     // Vertical scaling
      0,                      // Horizontal translation
      0                       // Vertical translation
    );

    // Apply rotation for 3D effect
    ctx.rotate((textSet.rotation * Math.PI) / 180);

    // Apply shadow for depth effect
    ctx.shadowColor = textSet.shadowColor;
    ctx.shadowBlur = textSet.shadowSize;
    ctx.shadowOffsetX = textSet.tiltX; // Horizontal offset for shadow
    ctx.shadowOffsetY = textSet.tiltY; // Vertical offset for shadow

    // Set font properties
    ctx.font = `${textSet.fontWeight} ${textSet.fontSize}px ${textSet.fontFamily}`;
    ctx.fillStyle = textSet.color;
    ctx.globalAlpha = textSet.opacity;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text
    ctx.fillText(textSet.text, textSet.left, textSet.top);
    ctx.restore();

    // Draw object image
    if (objImage) {
      ctx.drawImage(objImage, 0, 0, width, height);
    }
  };



  const handleDownload = () => {
    const hiddenCanvas = document.createElement("canvas");
    const ctx = hiddenCanvas.getContext("2d");

    if (!ctx) return;

    hiddenCanvas.style.display = "none";
    document.body.appendChild(hiddenCanvas);

    drawCanvas(ctx, 5); // 🎯 Drawing with scale 5 for download

    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = hiddenCanvas.toDataURL("image/png");
    link.click();

    // ✅ Clean up
    document.body.removeChild(hiddenCanvas);
  };



  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!canvas || !ctx) return;

    drawCanvas(ctx, 2); // Drawing with scale 2 for display
  }, [bgImage, objImage, canvasSize, textSet]); // Add `textSet` here to update on changes



  useEffect(() => {
    const handleResize = () => {
      if (bgImage) {
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        const { width, height } = getScaledSize(bgImage, maxWidth, maxHeight);
        setCanvasSize({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [bgImage]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-amber-100 min-h-screen pb-40">
      <input type="file" accept="image/*" onChange={handleImageUploadBg} />
      <input type="file" accept="image/*" onChange={handleImageUploadObj} />
      <div className="flex gap-2">
        <button onClick={centerObject} className="bg-blue-500 text-white px-3 py-1 rounded">Center</button>
        <button onClick={handleDownload} className="bg-green-500 text-white px-3 py-1 rounded">Download</button>
      </div>
      <div className='border shadow-lg bg-white flex justify-center items-center mb-25' style={{ overflow: 'hidden', width: '100vw', height: '65vh' }}>
        {/* <canvas ref={canvasRef} className="border bg-white shadow-lg" /> */}
        <canvas
          ref={canvasRef}
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
          }}
          className="border bg-white shadow-lg"
        />

      </div>

      {/* Bottom Toolbar */}
      <div className="h-30 bg-gray-700 text-white flex flex-wrap items-center gap-4 bottom-0 overflow-auto w-full fixed p-4 z-50 justify-center">
        {/* <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 text-black"
        />
        <label className="flex flex-col text-xs">
          Text Size
          <input
            type="range"
            min="10"
            max="200"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col text-xs">
          Text Rotate
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col text-xs">
          Text Color
          <input type="color" value={fill} onChange={(e) => setFill(e.target.value)} />
        </label> */}


        {/* <label className="flex flex-col text-xs">
          Font Family
          <select
            value={textSet.fontFamily}
            onChange={(e) => setTextSet({ ...textSet, fontFamily: e.target.value })}
            className="text-black"
          >
            {ATTRACTIVE_FONTS.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </label> */}

        <FontDropdown
          value={textSet.fontFamily}
          onChange={(font) => setTextSet({ ...textSet, fontFamily: font })}
        />


        {/* Text Input */}
        <label className="flex flex-col text-xs">
          Text
          <input
            type="text"
            value={textSet.text}
            onChange={(e) => setTextSet({ ...textSet, text: e.target.value })}
            className="border p-2 text-black"
          />
        </label>

        {/* Font Size Slider */}
        <label className="flex flex-col text-xs">
          Font Size
          <input
            type="range"
            min="10"
            max="400"
            value={textSet.fontSize}
            onChange={(e) => setTextSet({ ...textSet, fontSize: Number(e.target.value) })}
          />
        </label>

        {/* Font Weight Slider */}
        <label className="flex flex-col text-xs">
          Font Weight
          <input
            type="range"
            min="100"
            max="900"
            value={textSet.fontWeight}
            onChange={(e) => setTextSet({ ...textSet, fontWeight: Number(e.target.value) })}
          />
        </label>

        {/* Text Rotate Slider */}
        <label className="flex flex-col text-xs">
          Text Rotate
          <input
            type="range"
            min="0"
            max="360"
            value={textSet.rotation}
            onChange={(e) => setTextSet({ ...textSet, rotation: Number(e.target.value) })}
          />
        </label>

        {/* Text Opacity Slider */}
        <label className="flex flex-col text-xs">
          Text Opacity
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={textSet.opacity}
            onChange={(e) => setTextSet({ ...textSet, opacity: Number(e.target.value) })}
          />
        </label>

        {/* Shadow Size Slider */}
        <label className="flex flex-col text-xs">
          Shadow Size
          <input
            type="range"
            min="0"
            max="20"
            value={textSet.shadowSize}
            onChange={(e) => setTextSet({ ...textSet, shadowSize: Number(e.target.value) })}
          />
        </label>

        {/* Shadow Color Picker */}
        <label className="flex flex-col text-xs">
          Shadow Color
          <input
            type="color"
            value={textSet.shadowColor}
            onChange={(e) => setTextSet({ ...textSet, shadowColor: e.target.value })}
          />
        </label>

        {/* Tilt X Slider */}
        <label className="flex flex-col text-xs">
          Tilt X
          <input
            type="range"
            min="-45"
            max="45"
            step={1}
            value={textSet.tiltX}
            onChange={(e) => setTextSet({ ...textSet, tiltX: Number(e.target.value) })}
          />
        </label>

        {/* Tilt Y Slider */}
        <label className="flex flex-col text-xs">
          Tilt Y
          <input
            type="range"
            min="-45"
            max="45"
            step={1}
            value={textSet.tiltY}
            onChange={(e) => setTextSet({ ...textSet, tiltY: Number(e.target.value) })}
          />
        </label>

        {/* Text Color Picker */}
        <label className="flex flex-col text-xs">
          Text Color
          <input
            type="color"
            value={textSet.color}
            onChange={(e) => setTextSet({ ...textSet, color: e.target.value })}
          />
        </label>

      </div>
    </div>
  );
};

export default CustomCanvas;

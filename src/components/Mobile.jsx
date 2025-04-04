import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import { FREE_FONTS, ATTRACTIVE_FONTS } from '../constant/fonts'
import FontDropdown from './ui/FontDropdown';
import CustomSlider from './ui/CustomSlider';

const Mobile = () => {
  const [bgImage, setBgImage] = useState(null);
  const [objectImg, setObjectImg] = useState(null);
  const [canvasSize, setCanvasSize] = useState(null);
  const [text, setText] = useState('Hello World');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [scale, setScale] = useState(1);
  const [fontSize, setFontSize] = useState(24);
  const [fill, setFill] = useState("#000000");
  const [rotation, setRotation] = useState(0);
  const [center, setCenter] = useState({
    x: 0,
    y: 0
  })
  const stageRef = useRef();
  const textRef = useRef();
  const centerImg = useRef();

  // ✅ Image resize kare aur aspect ratio maintain kare
  const getScaledImageSize = (img, maxWidth, maxHeight) => {
    let width = img.width;
    let height = img.height;
    const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
    return {
      width: width * scaleFactor,
      height: height * scaleFactor,
    };
  };

  // ✅ Background Image Upload kare aur Canvas Adjust kare
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (type === 'bg') {
        // ✅ Image ka size set kare
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        const { width, height } = getScaledImageSize(img, maxWidth, maxHeight);

        setBgImage(img);
        setCanvasSize({ width, height });

        // ✅ Automatically Scale Canvas to Fit Screen
        setScale(Math.min(maxWidth / width, maxHeight / height));
      } else {
        setObjectImg(img);
      }
    };
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = uri;
    link.click();
  };

  const handleCenter = () => {
    setCenter({ x: 0, y: 0 })
    // console.log(center)
  }

  // ✅ Window Resize hone par Canvas ko Adjust kare
  useEffect(() => {
    if (bgImage && canvasSize) {
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
      const { width, height } = getScaledImageSize(bgImage, maxWidth, maxHeight);

      setCanvasSize({ width, height });
      setScale(Math.min(maxWidth / width, maxHeight / height));
    }
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.getLayer().batchDraw(); // Force re-render
      // Center the text by setting its offset
      textRef.current.offsetX(textRef.current.width() / 2);
      textRef.current.offsetY(textRef.current.height() / 2);
    }
  }, [fontSize, rotation, text]);


  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-green-200 h-screen">
      {/* ✅ Image Upload Inputs */}
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'bg')} />
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'obj')} />
      {/* ✅ Download Button */}
      <div className='w-full flex justify-between'>
        <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
          Download
        </button>
        <button onClick={handleCenter} className="bg-black/45 text-white px-4 py-2 rounded">
          Center
        </button>
      </div>

      {/* ✅ Canvas Area - Jab Tak Image Upload Nahi Hoti, Tab Tak Hide */}
      {canvasSize && (
        <div className="border shadow-lg bg-white flex justify-center items-center" style={{ overflow: 'hidden', width: '80vw', height: '80vh' }}>
          <Stage width={canvasSize.width} height={canvasSize.height} ref={stageRef} scaleX={scale} scaleY={scale} >
            <Layer>
              {/* ✅ Background Image Fit karega Canvas ke andar */}
              <KonvaImage image={bgImage} width={canvasSize.width} height={canvasSize.height} />

              {/* ✅ Draggable Text */}
              <Text
                ref={textRef}
                x={canvasSize.width / 2}
                y={canvasSize.height / 2}
                text={text}
                fontSize={Number(fontSize)}
                fontFamily={fontFamily}
                fill={fill}
                fontStyle="bold"
                draggable={true}
                rotation={Number(rotation)}
              />
              {/* ✅ Draggable Object Image */}
              {objectImg && (
                <KonvaImage
                  key={`${center.x}-${center.y}`}
                  ref={centerImg}
                  image={objectImg}
                  {...getScaledImageSize(objectImg, canvasSize.width, canvasSize.height)}
                  x={center.x}
                  y={center.y}
                  onDragEnd={(e) => setCenter({ x: e.target.x(), y: e.target.y() })}
                  draggable
                />
              )}
            </Layer>
          </Stage>
        </div>
      )}

      <div className='h-20 bg-gray-500 flex flex-col items-center bottom-0 overflow-auto w-full fixed p-4'>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2"
        />
        <label>Text Size:
          <input
            type="range"
            min="10"
            max="200"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </label>
        <label>Text Rotate:
          <input
            type="range"
            min="-180"
            max="180"
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
          />
        </label>
        <label>Text Color:
          <input type="color" name="" value={fill} onChange={(e) => setFill(e.target.value)} id=""  />
        </label>
        <label>Font Family:
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className='bg-green-300'
          >
            {
              ATTRACTIVE_FONTS.map((font) => <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>)
            }
          </select>
        </label>
      </div>
    </div>
  );
};

export default Mobile;

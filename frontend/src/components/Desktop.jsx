import React, { useRef, useState } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Rect } from 'react-konva';
import useImage from 'use-image';

const App = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png'); // Use your uploaded image URL here
  const stageRef = useRef(null);
  const [fontSize, setFontSize] = useState(30);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [text, setText] = useState('Hello World');
  const [fill, setFill] = useState('red');

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = uri;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2"
        placeholder="Enter your text here"
      />
      <label>Font Size:
        <input
          type="range"
          min="10"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <input type="color" name="" value={fill} onChange={(e) => setFill(e.target.value)} id="" />
      </label>
      <label>Font Family:
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </label>
      <Stage
        width={image ? image.width : 0}
        height={image ? image.height : 0}
        ref={stageRef}
      >
        <Layer>
          <Rect
            width={image ? image.width : 0}
            height={image ? image.height : 0}
            x={0}
            y={0}
            fill={"blue"}
          />
          <Text
            text={text}
            fontSize={Number(fontSize)}
            fontFamily={fontFamily}
            fill={fill}
            x={0}
            y={0}
            draggable
          />
          {image && (
            <KonvaImage
              image={image}
              width={image.width}
              height={image.height}
            />
          )}
        </Layer>
      </Stage>
      <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Download Image
      </button>
    </div>
  );
};

export default App;
import { useState, useRef, useEffect } from "react";

const CustomSlider = () => {
  const [fontSize, setFontSize] = useState(10);
  const [background, setBackground] = useState("");

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setFontSize(value);

    const min = parseInt(e.target.min);
    const max = parseInt(e.target.max);
    const percentage = ((value - min) / (max - min)) * 100;

    // Black for filled part, gray-300 for unfilled
    const bg = `linear-gradient(to right, black 0%, black ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`;
    setBackground(bg);
  };

  useEffect(() => {
    handleSliderChange({ target: { value: fontSize, min: 10, max: 200 } });
  }, []);

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Text Size: <span className="font-semibold">{fontSize}px</span>
      </label>

      <input
        type="range"
        min="10"
        max="200"
        step={10}
        value={fontSize}
        onChange={handleSliderChange}
        className="w-98 h-2 rounded-full appearance-none cursor-pointer rotate-270 transform fixed right-0"
        style={{
          background: background,
        }}
      />

      <p className="mt-4" style={{ fontSize: `${fontSize}px` }}>
        This is a preview text with {fontSize}px font size.
      </p>
    </div>
  );
};

export default CustomSlider;

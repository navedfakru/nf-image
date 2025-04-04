import { useState, useRef, useEffect } from "react";
import { ALL_FONTS, ATTRACTIVE_FONTS  } from "../../constant/fonts";

const FontDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Font Family:
      </label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-green-300 rounded-md shadow text-left"
        style={{ fontFamily }}
      >
        {fontFamily} ▼
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {ATTRACTIVE_FONTS.map((font) => (
            <li
              key={font}
              onClick={() => {
                setFontFamily(font);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              style={{ fontFamily: font }}
            >
              {font}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-sm" style={{ fontFamily }}>
        This is a preview of the selected font!
      </p>
    </div>
  );
};

export default FontDropdown;
import React, { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

const ImageWithLoader = ({ src, alt, className }: ImageProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      )}
      <img
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : `${className} opacity-100`
        }`}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithLoader;

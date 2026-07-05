import React from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=300&auto=format&fit=crop",
    alt: "motorcycle rider",
    f: 0.1,
    r: "10px",
  },
  {
    src: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=300&auto=format&fit=crop",
    alt: "motorcycle parked",
    f: 0.12,
    r: "5px",
  },
  {
    src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=300&auto=format&fit=crop",
    alt: "motorcycle riding",
    f: 0.08,
    r: "20px",
  },
];

export default function ParallaxImages() {
  return (
    <div className="min-h-screen grid grid-flow-col place-content-center gap-8 bg-black p-8">
      {images.map((img, idx) => (
        <div key={idx} className="overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            className="parallax-img w-[300px] h-[300px] object-cover transition-transform duration-300 hover:scale-110"
            style={{ "--f": img.f, "--r": img.r } as React.CSSProperties}
          />
        </div>
      ))}
    </div>
  );
}

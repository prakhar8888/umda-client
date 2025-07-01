// 📄 ecommerce-client/src/components/Hero.js

import React from "react";

function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/96/ea/12/96ea12d17e0fd6748469f6820b97eb2e.jpg')",
      }}
    >
      {/* 🔲 Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 🧵 Content */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
          Embrace Indian Elegance
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover handcrafted ethnic wear rooted in tradition and beauty.
        </p>
        <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded transition duration-200">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;

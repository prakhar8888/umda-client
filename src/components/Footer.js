// 📄 ecommerce-client/src/components/Footer.js

import React from "react";

function Footer() {
  return (
    <footer className="bg-amber-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🧵 Branding */}
        <div>
          <h2 className="text-2xl font-bold font-serif">Ethnic Threads</h2>
          <p className="mt-2 text-sm text-amber-200">
            Celebrating the beauty of Indian tradition through handcrafted fashion.
          </p>
        </div>

        {/* 🧭 Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-amber-100">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Collections</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-amber-100 leading-relaxed">
            📍 Jaipur, Rajasthan, India <br />
            📧 support@ethnicthreads.in <br />
            ☎️ +91 99999 99999
          </p>
        </div>
      </div>

      {/* 🧾 Bottom Bar */}
      <div className="text-center text-sm text-amber-300 mt-8 border-t border-amber-600 pt-4">
        © {new Date().getFullYear()} Ethnic Threads. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

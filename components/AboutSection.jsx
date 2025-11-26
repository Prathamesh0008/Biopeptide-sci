//peptides\components\AboutSection.jsx
"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-14 text-sm text-gray-700">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About BioPeptide</h2>

            <h3 className="text-lg font-semibold mb-2">🧬 Our Company</h3>
            <p>
              BioPeptide™ is a leading provider of premium research peptides...
            </p>

            <p className="mt-4">
              We proudly support global research organizations...
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">🔬 Quality. Service. Value.</h3>
            <p>
              BioPeptide™ provides high-purity research materials using advanced synthesis and testing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">👥 Our Customers</h3>
            <p>
              Researchers across the world trust BioPeptide™ for dependable products.
            </p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[450px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/aboutus.jpg"
            alt="About BioPeptide"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}

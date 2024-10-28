import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 px-4 md:px-6 lg:px-8 border-t-2 border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-7">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-5xl font-extrabold mb-2">Arloo.co</h2>
          <p className="text-lg mb-4">
            The all-in-one community platform for creators and brands.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">WEBSITE</h3>
          <ul className="space-y-2">
            {[
              "Home",
              "Pricing",
              "Careers",
              "Affiliate program",
              "Partner program",
              "Arloo.dev Plus",
            ].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">FEATURES</h3>
          <ul className="space-y-2">
            {[
              "Discussions",
              "Courses",
              "Events",
              "Chat",
              "Customization",
              "Payments",
              "Workflows",
              "Analytics",
              "Gamification",
              "Community AI",
              "Integrations",
            ].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">RESOURCES</h3>
          <ul className="space-y-2">
            {[
              "Knowledge Base",
              "Product Updates",
              "Blog",
              "Event Hub",
              "Customer Stories",
              "Customer community",
              "Payment migration",
            ].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg mt-6 mb-3">ACCESS</h3>
          <ul className="space-y-2">
            {["Login", "Start Your Free Trial"].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg mt-6 mb-3">LEGAL</h3>
          <ul className="space-y-2">
            {["Terms", "Privacy Notice", "Cookie Policy", "DPA"].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 mb-4 sm:mb-0">
          &copy; 2024 Arloodots Software House. All rights reserved.
        </p>
        <div className="flex items-center">
          <span className="mr-2">English</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </footer>
  );
};

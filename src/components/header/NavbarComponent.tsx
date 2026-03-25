"use client";
import Image from "next/image";
import Link from "next/link";
import { navLink } from "./menu";
import { ModeToggle } from "../mode-toggle";

function NavbarComponent() {
  return (
    <>
      {/* bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg */}
      <nav
        className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm dark:bg-gray-900 dark:border-blue-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* <!-- Logo --> */}
            <div>
              <Image
                src="/itech.png"
                alt="Meta logo"
                width={150}
                height={100}
                className="object-contain"
              />
            </div>

            {/* <ModeToggle /> */}

            {/* <!-- Desktop Menu --> */}
            <div className="hidden md:flex space-x-6 text-blue-700 text-blue font-bold text-1xl font-serif uppercase">
              {navLink.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="hover:text-blue-500 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* <!-- Mobile Menu --> */}
      </nav>
    </>
  );
}

export default NavbarComponent;

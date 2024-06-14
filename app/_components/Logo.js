import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* Optimizing Images with Next.js */}
      {/* 1. Automatically serve correct sized images in modern format */}
      {/* 2. <Image /> prevents layout shift, because it forces develoer to specify height and width */}
      {/* 3. Automatically lazy load images only when entering viewport */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        // quality={num}: num%
        quality={1}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;

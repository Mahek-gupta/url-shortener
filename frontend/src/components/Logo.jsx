import React from "react";

const Logo = ({ size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top-left diamond */}
      <path
        // d="M20 4L32 16L20 28L8 16L20 4Z"
        d="M20 4L33 16L20 28L8 16L20 4Z"
        fill="url(#grad1)"
      />
      {/* Top-right diamond */}
      <path
        d="M44 4L56 16L44 28L32 16L44 4Z"
        fill="url(#grad2)"
      />
      {/* Bottom-left diamond */}
      <path
        d="M20 36L32 48L20 60L8 48L20 36Z"
        fill="url(#grad3)"
      />
      {/* Bottom-right diamond */}
      <path
        d="M44 36L56 48L44 60L32 48L44 36Z"
        fill="url(#grad4)"
      />

      <defs>
        <linearGradient id="grad1" x1="8" y1="4" x2="32" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="grad2" x1="32" y1="4" x2="56" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="grad3" x1="8" y1="36" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient id="grad4" x1="32" y1="36" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;

import React from "react";

const PermissionDenied: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      {/* Custom SVG */}
      <div className="w-24 h-24 mb-6">
        <svg
          version="1.1"
          viewBox="0 0 122.88 95.61"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-red-500 fill-current"
        >
          <style type="text/css">
            {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
          </style>
          <g>
            <path
              className="st0"
              d="M7.52,0C3.38,0,0,3.39,0,7.52v80.57c0,4.14,3.38,7.52,7.52,7.52h107.84c4.14,0,7.52-3.39,7.52-7.52V7.52
              c0-4.14-3.38-7.52-7.52-7.52H7.52L7.52,0z M61.36,31.82c8.24,5.21,15.66,7.69,22.05,7.1c1.12,22.55-7.21,35.87-21.97,41.42
              C47.2,75.14,38.77,62.38,39.4,38.57C46.89,38.96,54.24,37.35,61.36,31.82L61.36,31.82z M61.54,39.53
              c5.62,3.55,10.68,5.24,15.04,4.85c0.76,15.37-4.92,24.46-14.98,28.24c-0.06-0.03-0.13-0.04-0.19-0.07V39.63L61.54,39.53
              L61.54,39.53L61.54,39.53z M61.36,34.6c7.29,4.61,13.87,6.8,19.52,6.29c0.99,19.96-6.39,31.75-19.45,36.67
              c-12.61-4.6-20.07-15.88-19.52-36.96c6.64,0.35,13.15-1.09,19.45-5.98V34.6L61.36,34.6z M7.37,90.08c-0.58,0-1.09-0.22-1.47-0.61
              c-0.39-0.39-0.61-0.9-0.61-1.47V21.06H5.26h112.36h-0.03V88c0,0.58-0.22,1.09-0.61,1.47c-0.38,0.38-0.9,0.61-1.47,0.61H7.37
              L7.37,90.08z M14.68,8.45c-2.05,0-3.72,1.66-3.72,3.71c0,2.05,1.66,3.71,3.72,3.71c2.05,0,3.71-1.66,3.71-3.71
              C18.39,10.12,16.73,8.45,14.68,8.45L14.68,8.45z M39.86,8.45c-2.05,0-3.71,1.66-3.71,3.71c0,2.05,1.66,3.71,3.71,3.71
              c2.05,0,3.71-1.66,3.71-3.71C43.57,10.12,41.91,8.45,39.86,8.45L39.86,8.45z M27.27,8.45c-2.05,0-3.71,1.66-3.71,3.71
              c0,2.05,1.66,3.71,3.71,3.71c2.05,0,3.71-1.66,3.71-3.71C30.98,10.12,29.32,8.45,27.27,8.45L27.27,8.45z"
            />
          </g>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Permission Denied
      </h1>

      {/* Optional message */}
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        You don’t have access to this page. If you believe this is a mistake,
        please contact your system administrator.
      </p>
    </div>
  );
};

export default PermissionDenied;

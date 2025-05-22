export const SkeletonResetPasswordForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Title */}
        <div className="text-center">
          <div className="h-20 w-20 mx-auto bg-gray-400 rounded-full animate-pulse" />
          <div className="mt-4 h-6 w-48 mx-auto bg-gray-400 rounded animate-pulse" />
        </div>

        {/* Form Fields */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-400 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-400 rounded animate-pulse" />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <div className="h-10 w-full bg-gray-400 rounded animate-pulse" />
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <div className="h-4 w-48 mx-auto bg-gray-400 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}; 
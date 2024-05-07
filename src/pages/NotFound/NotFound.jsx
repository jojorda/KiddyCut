// pages/NotFoundPage.js

import Topbar2 from "../../components/topbar/Topbar2";

const NotFoundPage = () => {
  return (
    <>
      <Topbar2/>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

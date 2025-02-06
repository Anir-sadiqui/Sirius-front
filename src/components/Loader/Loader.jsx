import React from "react";

const Loader = ({ message = "Chargement..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-3 text-gray-600">{message}</p>
        </div>
    );
};

export default Loader;
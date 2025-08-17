"use client"

export default function TestCSSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">CSS Test Page</h1>
          <p className="text-lg text-gray-600 mb-6">
            This page is testing if CSS and Tailwind are working properly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Blue Card</h3>
              <p className="text-blue-600">This should have a blue background and text.</p>
            </div>
            
            <div className="bg-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Green Card</h3>
              <p className="text-green-600">This should have a green background and text.</p>
            </div>
            
            <div className="bg-red-100 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Red Card</h3>
              <p className="text-red-600">This should have a red background and text.</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Blue Button
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Green Button
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Red Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

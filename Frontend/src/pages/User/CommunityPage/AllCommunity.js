import React from 'react'

function AllCommunity() {
  return (
    <div>
      <section className="p-10 md:p-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">Why JanSeva?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Raise Local Problems</h3>
            <p className="text-gray-600">
              Citizens can easily report problems in their locality — from water issues to road repairs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Track Status</h3>
            <p className="text-gray-600">
              Stay updated on your problem’s progress — from registered to resolved.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Verified Community Help</h3>
            <p className="text-gray-600">
              Community volunteers can solve minor issues, fast-tracking local improvements.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AllCommunity

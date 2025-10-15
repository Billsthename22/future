'use client'

import React from 'react'
import brandsData from '@/app/data/car_brands_history.json'

const page = () => {
  return (
    <div className="bg-[#0e1525] text-white flex justify-center py-16 min-h-screen px-4">
      <div className="relative w-full max-w-5xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-white/20"></div>

        {brandsData.map((brand: any, idx: number) => {
          const isRight = idx % 2 === 0 // alternate sides
          return (
            <div key={idx} className={`mb-10 flex ${isRight ? 'justify-end' : 'justify-start'} items-center w-full relative`}>
              
              {isRight && (
                <div className="w-5/12 bg-[#16213e] p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold">{brand.brandName}</h3>
                  <p className="text-sm text-gray-400 mb-2">Founded: {brand.foundingYear}</p>
                  {brand.historyTimeline.map((period: any, pIdx: number) => (
                    <div key={pIdx} className="mb-2">
                      <h4 className="font-semibold">{period.period}</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {period.majorEvents.map((event: string, eIdx: number) => (
                          <li key={eIdx}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Timeline circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#0e1525] border-4 border-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-white">
                {brand.brandName.charAt(0)}
              </div>

              {!isRight && (
                <div className="w-5/12 bg-[#16213e] p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold">{brand.brandName}</h3>
                  <p className="text-sm text-gray-400 mb-2">Founded: {brand.foundingYear}</p>
                  {brand.historyTimeline.map((period: any, pIdx: number) => (
                    <div key={pIdx} className="mb-2">
                      <h4 className="font-semibold">{period.period}</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {period.majorEvents.map((event: string, eIdx: number) => (
                          <li key={eIdx}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
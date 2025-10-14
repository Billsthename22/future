'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import carsDataRaw from '@/app/data/groupedcars.json';

// Type assertion: each brand maps to an array of car objects
type Car = {
  name: string;
  year: number;
  topSpeed: string;
  engine: string;
  horsepower?: number;
  transmission?: string;
  acceleration: string;
  image: string;
};

const carsData = carsDataRaw as Record<string, Car[]>;

export default function BrandModels() {
  const params = useParams();
  const brandParam = Array.isArray(params.brand) ? params.brand[0] : params.brand;

  if (!brandParam)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  const normalize = (str: string) => str.toLowerCase().replace(/[-\s]/g, '');
  const brandKey =
    Object.keys(carsData).find((key) => normalize(key) === normalize(brandParam)) || '';

  const models = brandKey ? carsData[brandKey] : [];

  return (
    <section className="min-h-screen bg-black text-white p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-8 text-center uppercase">
        {brandKey ? `${brandKey} Models` : 'Brand Not Found'}
      </h1>

      {models.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {models.map((model) => (
         <Link
         key={model.name}
         href={`/brands/${encodeURIComponent(
           brandKey.toLowerCase().replace(/\s+/g, '-')
         )}/${encodeURIComponent(
           model.name.toLowerCase().replace(/\s+/g, '-')
         )}`}
         className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-800 hover:border-yellow-500 hover:scale-105 transition flex flex-col items-center"
       >
       
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-center">{model.name}</h2>
              <p className="text-gray-400 text-sm mt-1 text-center">
                {model.year} • {model.engine}
              </p>
              {model.horsepower && (
                <p className="text-gray-400 text-sm mt-1 text-center">
                  {model.horsepower} HP
                </p>
              )}
              {model.transmission && (
                <p className="text-gray-400 text-sm mt-1 text-center">
                  {model.transmission}
                </p>
              )}
              <p className="text-gray-400 text-sm mt-1 text-center">
                Acceleration: {model.acceleration}
              </p>
              <p className="text-gray-400 text-sm mt-1 text-center">
                Top Speed: {model.topSpeed}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">
          {brandKey
            ? `No models found for ${brandKey}.`
            : 'Brand not found. Please check the URL.'}
        </p>
      )}

      <div className="text-center mt-10">
        <Link href="/brands" className="text-yellow-400 hover:underline">
          ← Back to Brands
        </Link>
      </div>
    </section>
  );
}

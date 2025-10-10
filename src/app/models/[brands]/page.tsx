'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import groupedCars from '@/app/data/groupedcars.json' assert { type: 'json' };

type CarModel = {
  name: string;
  year: number;
  topSpeed: string;
  engine: string;
  horsepower?: number;
  transmission?: string;
  acceleration: string;
  image: string;
};

const carsData = groupedCars as Record<string, CarModel[]>;

export default function BrandModels() {
  const params = useParams();
  const brand = Array.isArray(params.brands) ? params.brands[0] : params.brands;

  if (!brand)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  // Normalize for comparison
  const normalizedParam = brand.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Try to find a matching brand key
  const brandKey =
    Object.keys(carsData).find(
      (key) => key.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedParam
    ) || '';

  const models = brandKey ? carsData[brandKey] : [];

  // 🧠 Debug logging (you can check this in your browser console)
  console.log('URL param:', brand);
  console.log('Normalized:', normalizedParam);
  console.log('Matched brand key:', brandKey);
  console.log('Available keys:', Object.keys(carsData));

  return (
    <section className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-10 text-center uppercase">
        {brandKey || brand} Models
      </h1>

      {models && models.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {models.map((model) => (
            <div
              key={model.name}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-500 hover:scale-105 transition"
            >
              <Image
                src={`/models/${model.image}`}
                alt={model.name}
                width={300}
                height={200}
                className="rounded-md mb-4 object-cover"
              />
              <h2 className="text-lg font-semibold mb-2">{model.name}</h2>
              <p className="text-gray-400 text-sm">Engine: {model.engine}</p>
              <p className="text-gray-400 text-sm">Top Speed: {model.topSpeed}</p>
              <p className="text-gray-400 text-sm">Year: {model.year}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg">
          No models found for “{brand}”
          <br />
          <small className="block mt-4">
            (Check console for available brands)
          </small>
        </div>
      )}

      <div className="text-center mt-10">
        <Link href="/brands" className="text-yellow-400 hover:underline">
          ← Back to Brands
        </Link>
      </div>
    </section>
  );
}

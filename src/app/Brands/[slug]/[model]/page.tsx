'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import carsDataRaw from '@/app/data/groupedcars_extended.json';

// Car type
type Car = {
  name: string;
  year: number;
  topSpeed: string;
  engine: string;
  horsepower?: number;
  transmission?: string;
  acceleration: string;
  image: string;
  fuelType?: string;
  driveType?: string;
  bodyType?: string;
  country?: string;
  seats?: number;
  price?: string;
  weight?: string;
};

const carsData = carsDataRaw as Record<string, Car[]>;

export default function ModelDetails() {
  const params = useParams() as { brand?: string; model?: string };

  const brandParam = params?.brand;
  const modelParam = params?.model;

  if (!brandParam || !modelParam) {
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  }

  // Normalize strings for matching
  const normalize = (str: string) =>
    str.toLowerCase().replace(/[\s-]/g, '');

  const brandKey =
    Object.keys(carsData).find((key) => normalize(key) === normalize(brandParam)) || '';

  if (!brandKey) {
    return <p className="text-center text-gray-400 mt-10">Brand not found.</p>;
  }

  const model = carsData[brandKey].find(
    (m) => normalize(m.name) === normalize(modelParam)
  );

  if (!model) {
    return <p className="text-center text-gray-400 mt-10">Model not found.</p>;
  }

  return (
    <section className="min-h-screen bg-black text-white p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-8 text-center uppercase">
        {model.name} - {brandKey}
      </h1>

      {/* Image */}
      <div className="relative w-full max-w-3xl mx-auto h-64 sm:h-96 mb-8 rounded-xl overflow-hidden">
        <Image
          src={model.image}
          alt={model.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Specifications */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Specifications</h2>
        <ul className="space-y-2 text-gray-300">
          <li><span className="font-semibold text-gray-200">Year:</span> {model.year}</li>
          <li><span className="font-semibold text-gray-200">Engine:</span> {model.engine}</li>
          {model.horsepower && (
            <li><span className="font-semibold text-gray-200">Horsepower:</span> {model.horsepower} HP</li>
          )}
          {model.transmission && (
            <li><span className="font-semibold text-gray-200">Transmission:</span> {model.transmission}</li>
          )}
          <li><span className="font-semibold text-gray-200">Top Speed:</span> {model.topSpeed}</li>
          <li><span className="font-semibold text-gray-200">0–100 km/h:</span> {model.acceleration}</li>
          {model.fuelType && (
            <li><span className="font-semibold text-gray-200">Fuel Type:</span> {model.fuelType}</li>
          )}
          {model.driveType && (
            <li><span className="font-semibold text-gray-200">Drive Type:</span> {model.driveType}</li>
          )}
          {model.bodyType && (
            <li><span className="font-semibold text-gray-200">Body Type:</span> {model.bodyType}</li>
          )}
          {model.country && (
            <li><span className="font-semibold text-gray-200">Country:</span> {model.country}</li>
          )}
          {model.seats && (
            <li><span className="font-semibold text-gray-200">Seats:</span> {model.seats}</li>
          )}
          {model.price && (
            <li><span className="font-semibold text-gray-200">Price:</span> {model.price}</li>
          )}
          {model.weight && (
            <li><span className="font-semibold text-gray-200">Weight:</span> {model.weight}</li>
          )}
        </ul>
      </div>

      {/* Back Links */}
      <div className="text-center mt-10 space-x-4">
        <Link
          href={`/brands/${brandKey.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-yellow-400 hover:underline"
        >
          ← Back to {brandKey} Models
        </Link>
        <Link href="/brands" className="text-yellow-400 hover:underline">
          ← Back to Brands
        </Link>
      </div>
    </section>
  );
}

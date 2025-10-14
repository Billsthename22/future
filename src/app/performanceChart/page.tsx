'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const cars = [
  { id: 1, name: 'Ferrari 812 Superfast', year: 2022, engine: '6.5L V12', horsepower: 800, topSpeed: '340 km/h', acceleration: '0–100 km/h in 2.9s', image: '/cars/ferrari812.jpg' },
  { id: 2, name: 'Lamborghini Aventador SVJ', year: 2023, engine: '6.5L V12', horsepower: 770, topSpeed: '350 km/h', acceleration: '0–100 km/h in 2.8s', image: '/cars/aventador.jpg' },
  { id: 3, name: 'Porsche 911 Turbo S', year: 2023, engine: '3.8L Twin-Turbo Flat-6', horsepower: 650, topSpeed: '330 km/h', acceleration: '0–100 km/h in 2.7s', image: '/cars/911turbos.jpg' },
];

export default function ComparePage() {
  const [selectedCars, setSelectedCars] = useState<typeof cars>([]);

  useEffect(() => {
    const compareIds: number[] = JSON.parse(localStorage.getItem('compareCars') || '[]');
    setSelectedCars(cars.filter(car => compareIds.includes(car.id)));
  }, []);

  const chartData = {
    labels: selectedCars.map(c => c.name),
    datasets: [
      { label: 'Horsepower', data: selectedCars.map(c => c.horsepower), backgroundColor: 'rgba(239, 68, 68, 0.7)' },
    ],
  };

  if (selectedCars.length === 0) return <p className="text-center text-white py-24">No cars selected for comparison.</p>;

  return (
    <section className="max-w-6xl mx-auto py-16 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-12">Compare Cars</h1>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-white border-collapse border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Spec</th>
              {selectedCars.map(car => <th key={car.id} className="border px-4 py-2">{car.name}</th>)}
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            <tr>
              <td className="border px-4 py-2 font-semibold">Image</td>
              {selectedCars.map(car => (
                <td key={car.id} className="border px-4 py-2">
                  <Image src={car.image} alt={car.name} width={200} height={120} className="object-cover rounded" />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Engine</td>
              {selectedCars.map(car => <td key={car.id} className="border px-4 py-2">{car.engine}</td>)}
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Horsepower</td>
              {selectedCars.map(car => <td key={car.id} className="border px-4 py-2">{car.horsepower} hp</td>)}
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Top Speed</td>
              {selectedCars.map(car => <td key={car.id} className="border px-4 py-2">{car.topSpeed}</td>)}
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">0–100 km/h</td>
              {selectedCars.map(car => <td key={car.id} className="border px-4 py-2">{car.acceleration}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Performance Chart */}
      <div className="mt-12 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Horsepower Comparison</h2>
        <Chart type="bar" data={chartData} />
      </div>
    </section>
  );
}

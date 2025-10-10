import fs from "fs";
import path from "path";

// ✅ Absolute paths inside your project
const carsPath = path.join(process.cwd(), "app/data/cars.json");
const groupedPath = path.join(process.cwd(), "app/data/groupedcars.json");

// Load the raw cars.json
const cars = JSON.parse(fs.readFileSync(carsPath, "utf8"));

// Group cars by their actual brand
const grouped = cars.reduce((acc, car) => {
  const brand = car.brand?.trim() || "Unknown"; // Use real brand name
  if (!acc[brand]) acc[brand] = [];
  acc[brand].push(car);
  return acc;
}, {});

// Save the new grouped JSON
fs.writeFileSync(groupedPath, JSON.stringify(grouped, null, 2), "utf8");

console.log("✅ groupedcars.json created successfully!");

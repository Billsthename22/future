import fs from "fs";
import path from "path";

// ✅ Absolute paths based on your folder structure
const filePath = path.join(process.cwd(), "src/app/data/groupedcars.json");

// ✅ Read JSON
const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));

// ✅ Extract array inside "Brand"
const carsArray = raw.Brand || [];

// ✅ Infer brand name from car name
const getBrand = (car) => car.name?.split(" ")[0] || "Unknown";

// ✅ Group cars by brand
const grouped = carsArray.reduce((acc, car) => {
  const brand = getBrand(car);
  if (!acc[brand]) acc[brand] = [];
  acc[brand].push(car);
  return acc;
}, {});

// ✅ Overwrite groupedcars.json with new grouped data
fs.writeFileSync(filePath, JSON.stringify(grouped, null, 2), "utf8");

console.log("✅ groupedcars.json updated successfully!");

import mongoose from 'mongoose';
import { Product } from '../models/product.model';
import dotenv from 'dotenv';
import connectDB from '../config/db';
dotenv.config();
const products = [
    {
        name: "Premium Cotton Tee",
        description: "High-quality, 100% organic cotton t-shirt with a premium feel.",
        basePrice: 24.99,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60",
        category: "Apparel",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60" },
            { name: "White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60" }
        ],
        printableArea: { top: 150, left: 150, width: 200, height: 250 }
    },
    {
        name: "Classic Pullover Hoodie",
        description: "Warm and cozy hoodie, perfect for any season.",
        basePrice: 44.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60",
        category: "Apparel",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Navy", hex: "#000080", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60" },
            { name: "Grey", hex: "#808080", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60" }
        ],
        printableArea: { top: 120, left: 140, width: 220, height: 280 }
    },
    {
        name: "Eco-Friendly Tote Bag",
        description: "Durable and sustainable tote bag for your everyday needs.",
        basePrice: 14.99,
        image: "https://images.unsplash.com/photo-1594235412407-5ed03ec79a1f?w=800&auto=format&fit=crop&q=60",
        category: "Accessories",
        sizes: ["One Size"],
        colors: [
            { name: "Natural", hex: "#f5f5dc", image: "https://images.unsplash.com/photo-1594235412407-5ed03ec79a1f?w=800&auto=format&fit=crop&q=60" }
        ],
        printableArea: { top: 100, left: 100, width: 300, height: 350 }
    }
];
const seedDB = async () => {
    try {
        await connectDB();
        await Product.deleteMany({}); // Clear existing products
        await Product.insertMany(products);
        console.log("Database Seeded Successfully!");
        process.exit();
    }
    catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};
seedDB();
//# sourceMappingURL=seed.js.map
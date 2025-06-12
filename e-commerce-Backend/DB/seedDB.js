// seedScript.js
import mongoose from 'mongoose';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed
import slugify from 'slugify'; // Ensure you have slugify installed

// --- IMPORT YOUR ACTUAL MODELS ---
import Category from  "./models/category.model.js"
import Brand from "./models/brand.model.js"     // Adjust path as needed
import Product from "./models/product.model.js"    // Adjust path as needed
// --- END OF MODEL IMPORTS ---

// --- START: Configuration ---
const MONGO_URI = 'mongodb://127.0.0.1:27017/ecommerce';  // !! REPLACE !!
const API_PRODUCTS_URL = 'https://fakestoreapi.in/api/products?limit=150';
const CLEAR_EXISTING_PRODUCTS = true;
const DEFAULT_STOCK = 20;
// --- END: Configuration ---

// Helper function to find or create Category (this function will use the imported Category model)
async function findOrCreateCategory(categoryName) {
    // ... (rest of this function remains the same, it will use the imported Category model)
    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim() === '') {
        console.warn('Invalid category name received:', categoryName, '- Will not link category.');
        return null;
    }
    const nameTrimmed = categoryName.trim();
    const categorySlug = slugify(nameTrimmed, { lower: true, strict: true });

    try {
        let category = await Category.findOne({ slug: categorySlug });
        if (!category) {
            // console.log(`Category "${nameTrimmed}" not found, creating new one...`); // Optional log
            // The 'image' and 'images' fields in your actual Category model
            // will take their defaults or remain undefined if not set here.
            // The seed script isn't designed to populate category images from this API.
            category = new Category({
                name: nameTrimmed,
                slug: categorySlug,
            });
            await category.save();
            // console.log(`Created category: ${nameTrimmed} with slug: ${categorySlug}`); // Optional log
        }
        return category._id;
    } catch (error) {
        if (error.code === 11000 && error.message.includes('slug') ) {
            console.warn(`Slug conflict for category "${nameTrimmed}", attempting to find existing by name...`);
            const existingCategoryByName = await Category.findOne({ name: nameTrimmed });
            if(existingCategoryByName) return existingCategoryByName._id;
        }
        console.error(`Error finding or creating category "${nameTrimmed}":`, error.message);
        return null;
    }
}

// Helper function to find or create Brand (this function will use the imported Brand model)
async function findOrCreateBrand(brandName) {
    // ... (rest of this function remains the same, it will use the imported Brand model)
    if (!brandName || typeof brandName !== 'string' || brandName.trim() === '') {
        console.warn('Invalid brand name received:', brandName, '- Will not link brand.');
        return null;
    }
    const nameTrimmed = brandName.trim();
    const brandSlug = slugify(nameTrimmed, { lower: true, strict: true });

    try {
        let brand = await Brand.findOne({ slug: brandSlug });
        if (!brand) {
            // console.log(`Brand "${nameTrimmed}" not found, creating new one...`); // Optional log
            brand = new Brand({
                name: nameTrimmed,
                slug: brandSlug,
            });
            await brand.save();
            // console.log(`Created brand: ${nameTrimmed} with slug: ${brandSlug}`); // Optional log
        }
        return brand._id;
    } catch (error) {
         if (error.code === 11000 && error.message.includes('slug') ) {
            console.warn(`Slug conflict for brand "${nameTrimmed}", attempting to find existing by name...`);
            const existingBrandByName = await Brand.findOne({ name: nameTrimmed });
            if(existingBrandByName) return existingBrandByName._id;
        }
        console.error(`Error finding or creating brand "${nameTrimmed}":`, error.message);
        return null;
    }
}

// ... (The rest of your seedDatabase function and its call should work as is,
// because they will now use the correctly imported Category, Brand, and Product models) ...

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        if (CLEAR_EXISTING_PRODUCTS) {
            await Product.deleteMany({});
            console.log('Existing products cleared.');
        }

        console.log(`Fetching products from ${API_PRODUCTS_URL}...`);
        const response = await fetch(API_PRODUCTS_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        const apiResult = await response.json();

        if (apiResult.status !== "SUCCESS" || !apiResult.products || apiResult.products.length === 0) {
            console.log('No products found in API response or API status not SUCCESS.');
            if (apiResult.message) console.log('API Message:', apiResult.message);
            mongoose.disconnect();
            return;
        }
        const apiProducts = apiResult.products;
        console.log(`Fetched ${apiProducts.length} products from API.`);

        const productsToSave = [];

        for (const apiProduct of apiProducts) {
            if (!apiProduct.title || apiProduct.price == null) {
                console.warn(`Skipping product with missing title or price: ID ${apiProduct.id} Title: ${apiProduct.title}`);
                continue;
            }

            const categoryId = await findOrCreateCategory(apiProduct.category);
            const brandId = await findOrCreateBrand(apiProduct.brand);

            // Accessing schema paths for 'required' check needs the model to be defined.
            // Ensure Product.schema.paths.categoryId exists and has 'isRequired' property if you keep these checks.
            // Alternatively, manage this based on your application logic directly.
            const productModelSchema = Product.schema; // Get schema from imported model

            if (!categoryId && productModelSchema.paths.categoryId && productModelSchema.paths.categoryId.isRequired) {
                console.warn(`Skipping product "${apiProduct.title}" (API ID: ${apiProduct.id}) due to missing or failed category linking, and categoryId is required.`);
                continue;
            }
            if (!brandId && productModelSchema.paths.brandId && productModelSchema.paths.brandId.isRequired) {
                console.warn(`Skipping product "${apiProduct.title}" (API ID: ${apiProduct.id}) due to missing or failed brand linking, and brandId is required.`);
                continue;
            }

            const productData = new Product({ // Use new Product() to enable pre-save hooks
                name: apiProduct.title,
                slug: slugify(apiProduct.title, { lower: true, strict: true }), 
                description: apiProduct.description || 'No description available.',
                mainImage: `https://placehold.co/600x400?text=${encodeURIComponent(apiProduct.title.substring(0, 15))}`,
                colors: apiProduct.color ? [apiProduct.color.trim()] : [],
                sizes: [],
                price: parseFloat(apiProduct.price),
                discount: parseFloat(apiProduct.discount) || 0,
                stock: DEFAULT_STOCK,
                soldItems: 0,
                isPopular: apiProduct.popular === true,
                model: apiProduct.model,
                categoryName: apiProduct.category,
                categoryId: categoryId,
                brandId: brandId || null,
                sourceApiId: apiProduct.id,
            });
            // productsToSave.push(productData); // If using insertMany
            // If using individual saves to trigger pre-save hooks for each:
            try {
                await productData.save();
                productsToSave.push(productData); // Count successfully saved ones
            } catch (saveError) {
                console.error(`Error saving product "${apiProduct.title}" (API ID: ${apiProduct.id}):`, saveError.message);
            }
        }

        if (productsToSave.length > 0) {
            console.log(`${productsToSave.length} products were processed and saved (or attempted to save).`);
        } else {
            console.log('No products were prepared for saving.');
        }

    } catch (error) {
        console.error('Error during database seeding:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

seedDatabase();
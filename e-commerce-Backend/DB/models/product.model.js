import {Schema,model,Types} from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
    {
        name: { // From API 'title'
            type: String,
            required: [true, "Product name is required"],
            lowercase: true, // Your original preference
            minLength: [2, "Product name is too short"],
            trim: true,
        },
        slug: { // To be generated from name
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: { // From API 'description'
            type: String,
            minLength: [2, "Description is too short"], // Your original preference
            trim: true,
        },
        mainImage: { // From API 'image'
            type: String,
            // required: true, // Depending on data consistency
        },
        colors: { // API provides single 'color', store as array
            type: [String],
            default: [],
        },
        sizes: { // API doesn't provide, keep from your original schema
            type: [String],
            enum: ["s", "m", "l", "xl"], // Your original enum
            default: [],
        },
        price: { // Original price. From API 'price'
            type: Number,
            required: [true, "Original price is required"],
            min: 0,
        },
        discount: { // Discount percentage. From API 'discount'
            type: Number,
            default: 0,
            min: 0,
            max: 100, // Assuming API 'discount' is a percentage
        },
        finalPrice: { // Calculated: price * (1 - discount/100)
            type: Number,
            min: 0,
        },
        stock: { // Your 'amount' or 'quantity'. API doesn't provide.
            type: Number,
            default: 0, // Assign a default during seeding (e.g., 10, 50)
            min: 0,
        },
        soldItems: { // Not in API
            type: Number,
            default: 0,
            min: 0,
        },
        isPopular: { // From API 'popular'
            type: Boolean,
            default: false,
        },
        model: { // From API 'model'
            type: String,
            trim: true,
        },
         categoryName: { 
            type:String,
            ref: "Category",
            required: [true, "Category name is required"],
        },
        categoryId: { // From API 'category' string (requires lookup/creation)
            type: Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        subCategoryId: { // Not in this API
            type: Types.ObjectId,
            ref: "SubCategory",
            default: null, 
            // required: [true, "SubCategory is required"], // Make optional for this seed
        },
        brandId: { // From API 'brand' string (requires lookup/creation)
            type: Types.ObjectId,
            ref: "Brand",
            // required: [true, "Brand is required"], // Make true if you ensure mapping for all brands
        },
        createdBy: {
            type: Types.ObjectId,
            ref: "User",
            // Not required for seeding unless you assign a system user
        },
        updatedBy: {
            type: Types.ObjectId,
            ref: "User",
        },
        sourceApiId: { // Store original API 'id'
            type: Number, // API 'id' is a number
            // unique: true, // If IDs from this source are unique and you want to prevent duplicates
            // sparse: true, // If unique is true, allows multiple documents to omit this field
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
productSchema.pre('save', function(next) {
    if (this.isModified('price') || this.isModified('discount')) {
        if (typeof this.price === 'number') {
            const discountAmount = (typeof this.discount === 'number' && this.discount > 0 && this.discount <= 100)
                ? (this.price * (this.discount / 100))
                : 0;
            this.finalPrice = parseFloat((this.price - discountAmount).toFixed(2));
        }
    }
    next();
});
const productModel = model("Product", productSchema);

export default productModel

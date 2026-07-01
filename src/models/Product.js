import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for this product.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description.'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category.'],
    },
    image: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent compiling model multiple times if it's already compiled
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

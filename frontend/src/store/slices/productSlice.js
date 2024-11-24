import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, updateProduct } from "@/api/controller/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProducts(id);
      return response;
    } catch (error) {
      console.error("Error fetching products", error);
      return rejectWithValue("Failed to fetch products");
    }
  }
);

export const updateProductById = createAsyncThunk(
  "products/updateProductById",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      console.log("update reducer");
      return await updateProduct(productId, product);
    } catch (error) {
      console.error("Error updating product", error);
      return rejectWithValue("Failed to update product");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    selectedProduct: {},
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;

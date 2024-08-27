import Corps from "./corps";
import Products from "./products";

export async function syncModels() {
  try {
    await Corps.sync();
    await Products.sync();
  } catch (error) {
    console.error('Models not syncronized', error);
    throw error;
  }
}

export default syncModels;
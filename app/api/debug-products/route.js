//app\api\debug-products\route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Check one product by slug
    if (slug) {
      const product = await Product.findOne({ slug }).lean();

      if (!product) {
        return NextResponse.json(
          {
            source: "MongoDB",
            message: "Product not found",
            searchedSlug: slug,
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        source: "MongoDB",
        searchedSlug: slug,
        check: {
          mainName: product.name,
          englishName: product.translations?.en?.name,
          arabicName: product.translations?.ar?.name,
          hasTranslations: Boolean(product.translations),
          translationLanguages: Object.keys(product.translations || {}),
        },
        product,
      });
    }

    const totalProducts = await Product.countDocuments();

    const products = await Product.find({})
      .select("name slug price image category translations")
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({
      source: "MongoDB",
      totalProducts,
      totalReturned: products.length,
      products: products.map((product) => ({
        _id: product._id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        translationLanguages: Object.keys(product.translations || {}),
        arabicName: product.translations?.ar?.name,
        englishName: product.translations?.en?.name,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        source: "MongoDB",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
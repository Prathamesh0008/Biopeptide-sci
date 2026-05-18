import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export const revalidate = 300;

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({})
      .select(
        "id name slug category translations inStock stock image price size strength badge purity cas"
      )
      .sort({ category: 1, name: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Sidebar products error:", error);

    return NextResponse.json(
      {
        success: false,
        products: [],
        message: "Failed to load sidebar products",
      },
      { status: 500 }
    );
  }
}

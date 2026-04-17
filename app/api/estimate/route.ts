import { NextRequest, NextResponse } from 'next/server';
import { glassProducts } from '@/data/glassProducts';
import { getVendorsForProduct } from '@/data/vendors';
import { EstimateResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { productId, width, height, quantity } = await request.json();

    const product = glassProducts.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (!width || !height || !quantity || width <= 0 || height <= 0 || quantity <= 0) {
      return NextResponse.json({ error: 'Invalid dimensions or quantity' }, { status: 400 });
    }

    // Convert mm to sq.ft (1 sq.ft = 92,900 mm²)
    const areaMm2 = width * height;
    const areaSqFt = areaMm2 / 92903;
    const totalAreaSqFt = areaSqFt * quantity;

    const midRate = (product.priceMin + product.priceMax) / 2;
    const glassCost = totalAreaSqFt * midRate;

    // Installation estimate: ~15-25% of glass cost
    const installationCost = glassCost * 0.2;
    const totalCost = glassCost + installationCost;

    const vendors = getVendorsForProduct(productId).map(v => ({
      ...v,
      price: v.price || midRate,
    }));

    const result: EstimateResult = {
      glassType: product.glassType,
      thickness: product.thickness,
      width,
      height,
      quantity,
      areaSqFt: parseFloat(totalAreaSqFt.toFixed(2)),
      ratePerSqFt: midRate,
      glassCost: parseFloat(glassCost.toFixed(0)),
      installationCost: parseFloat(installationCost.toFixed(0)),
      totalCost: parseFloat(totalCost.toFixed(0)),
      vendors,
    };

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Estimate error:', error);
    return NextResponse.json({ error: 'Estimate calculation failed' }, { status: 500 });
  }
}

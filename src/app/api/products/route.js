export async function GET() {
  const products = [
    { id: 'p1', name: 'Match Ball',    price: 40,  category: 'Gear',       stock: 5 },
    { id: 'p2', name: 'Replica Jersey',price: 60,  category: 'Apparel',    stock: 3 },
    { id: 'p3', name: 'Shin Guards',   price: 18,  category: 'Gear',       stock: 10 },
    { id: 'p4', name: 'Cleats',        price: 120, category: 'Footwear',   stock: 2 },
    { id: 'p5', name: 'Fan Scarf',     price: 25,  category: 'Apparel',    stock: 8 },
    { id: 'p6', name: 'Water Bottle',  price: 12,  category: 'Accessories',stock: 12 },
    { id: 'p7', name: 'GK Gloves',     price: 45,  category: 'Gear',       stock: 4 },
    { id: 'p8', name: 'Training Cone Set', price: 22, category: 'Accessories', stock: 6 }
  ];

  return Response.json(products);
}

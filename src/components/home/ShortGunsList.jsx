import ProductCard from "../ProductCard";
export default function ShortGunsList({ products, onAdd }) {
    return products.map((product, idx) => (
        <ProductCard key={idx} {...product} onAdd={() => onAdd(product)} />
    ));
}
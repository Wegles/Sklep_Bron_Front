function ProductCard({ image, model, price, availability, caliber, ignition, isNew, description, onAdd }) {
  return (
    <div className="border rounded shadow p-4 flex flex-col">
      <div className="h-40 flex justify-center items-center mb-2 overflow-hidden bg-gray-50 rounded">
        <img
          src={image}
          alt={model}
          className="h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold">{model}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <ul className="text-sm text-gray-700 mb-2 space-y-1">
        <li>💰 Cena: <strong className="text-green-700">{price} zł</strong></li>
        <li>🔫 Kaliber: {caliber}</li>
        <li>⚡ Zapłon: {ignition}</li>
        <li>📦 Dostępność: {availability ? "Dostępna" : "Niedostępna"}</li>
        <li>🆕 Stan: {isNew ? "Nowa" : "Używana"}</li>
      </ul>
      <button
        onClick={onAdd}
        disabled={!availability}
        className={`mt-auto py-2 rounded text-white ${
          availability ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {availability ? "Dodaj do koszyka" : "Brak w magazynie"}
      </button>
    </div>
  );
}

export default ProductCard;
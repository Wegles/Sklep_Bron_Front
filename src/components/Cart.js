// Cart.js
function Cart({ items, onClose, onRemove }) {
  const total = items.reduce(
    (sum, i) => sum + i.quantity * parseFloat(i.price),
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-24">
      <div className="bg-white w-96 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Twój koszyk</h2>
        {items.length === 0 ? (
          <p className="mb-4">Koszyk jest pusty.</p>
        ) : (
          <ul className="space-y-4 mb-4">
            {items.map((i) => (
              <li key={i.model} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{i.model}</p>
                  <p className="text-sm text-gray-600">
                    {i.quantity} × {i.price} zł
                  </p>
                </div>
                <button
                  onClick={() => onRemove(i.model)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="text-lg font-semibold mb-4">
          Razem: {total.toFixed(2)} zł
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}

export default Cart;

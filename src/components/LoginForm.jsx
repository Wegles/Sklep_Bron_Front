function LoginForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Logowanie</h2>
        <input type="email" placeholder="Email" className="w-full border p-2 mb-2 rounded" />
        <input type="password" placeholder="Hasło" className="w-full border p-2 mb-4 rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-2">Zaloguj się</button>
        <button onClick={onClose} className="w-full text-sm text-gray-500 hover:underline">Anuluj</button>
      </div>
    </div>
  );
}

export default LoginForm;

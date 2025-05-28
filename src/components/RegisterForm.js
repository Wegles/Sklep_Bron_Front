import { useState } from "react";

function RegisterForm({ onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isLongEnough = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password === confirmPassword;

  const isPasswordValid = () => isLongEnough && hasUpperCase && hasNumber;

  const getColor = (condition) => (condition ? "text-green-600" : "text-red-500");

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Imię jest wymagane";
    if (!lastName.trim()) newErrors.lastName = "Nazwisko jest wymagane";
    if (!email.includes("@")) newErrors.email = "Niepoprawny email";
    if (!isPasswordValid()) newErrors.password = "Hasło nie spełnia wymagań";
    if (!passwordsMatch) newErrors.confirmPassword = "Hasła nie są zgodne";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Formularz przeszedł walidację (bez backendu)");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-[400px] scale-110">
        <h2 className="text-2xl font-bold mb-4">Rejestracja</h2>

        <input
          type="text"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.firstName && <p className="text-red-500 text-sm mb-2">{errors.firstName}</p>}

        <input
          type="text"
          placeholder="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.lastName && <p className="text-red-500 text-sm mb-2">{errors.lastName}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />

        {/* Live walidacja hasła */}
        <div className="text-sm mb-2 ml-1">
          <p className={getColor(isLongEnough)}>- min. 8 znaków</p>
          <p className={getColor(hasUpperCase)}>- przynajmniej jedna wielka litera</p>
          <p className={getColor(hasNumber)}>- przynajmniej jedna cyfra</p>
        </div>
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        <input
          type="password"
          placeholder="Powtórz hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 mb-1 rounded"
        />
        {!passwordsMatch && confirmPassword.length > 0 && (
          <p className="text-red-500 text-sm mb-2">Hasła nie są zgodne</p>
        )}
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded mb-2"
        >
          Zarejestruj się
        </button>
        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline"
        >
          Anuluj
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;

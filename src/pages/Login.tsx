import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Kirim request ke backend (ubah port sesuai backend kamu)
      const response = await axios.post("http://10.200.180.222:3000/api/auth/login", {
        username,
        password,
      });

      // Jika sukses login
      if (response.data.success) {
        const { token, user } = response.data.data;

        // Simpan token & data user ke localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Arahkan ke halaman home
        navigate("/home");
      } else {
        setError(response.data.message || "Login gagal");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan saat login");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex bg-white rounded-3xl shadow-xl overflow-hidden w-[900px] max-w-full">
        {/* BAGIAN KIRI - Background hijau */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-teal-500 to-teal-400 text-white p-10">
          <h1 className="text-4xl font-semibold mb-2">Selamat Datang!</h1>
          <p className="text-sm opacity-90">Posyandu Bunga Lily Gendeng</p>
        </div>

        {/* BAGIAN KANAN - Form Login */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-14">
          {/* Header untuk tampilan mobile */}
          <div className="md:hidden mb-6 text-center">
            <h1 className="text-2xl font-semibold text-teal-600 mb-1">
              Selamat Datang!
            </h1>
            <p className="text-sm text-gray-600">Posyandu Bunga Lily Gending</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-medium py-2 rounded-full hover:bg-teal-600 transition-all duration-200 shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

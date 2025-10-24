import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  HeartPulse,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [kaderName, setKaderName] = useState<string>("Kader");
  const [role, setRole] = useState<string>(""); // ✅ simpan role user
  const navigate = useNavigate();

  // Ambil data user login dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setKaderName(parsedUser.nama_lengkap || "Kader");
        setRole(parsedUser.role || ""); // ✅ ambil role
      } catch (err) {
        console.error("Error parsing user data:", err);
        setKaderName("Kader");
      }
    }
  }, []);

  // Fungsi logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://10.200.180.222:3000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/"); // kembali ke halaman login
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  // Fungsi navigasi
  const handleNavigation = (name: string) => {
    setOpen(false);
    if (name === "Dashboard") navigate("/home");
    else if (name === "Pasien") navigate("/pasien");
    else if (name === "Check Up") navigate("/checkup");
    else if (name === "Logout") handleLogout();
  };

  // ================================
  // MENU SIDEBAR (filter by role)
  // ================================
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    // hanya tampil jika role meja1
    ...(role === "meja1"
      ? [{ name: "Pasien", icon: <Users className="w-5 h-5" /> }]
      : []),
    { name: "Check Up", icon: <HeartPulse className="w-5 h-5" /> },
    { name: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-blue-50 to-white text-gray-800 relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40
          bg-teal-700 text-white border-r border-teal-800 shadow-2xl
          transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-5 border-b border-white/30">
          <h2 className="font-bold text-xl tracking-wide text-white drop-shadow-lg">
            POSYANDU
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-white/20 transition md:hidden"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigasi Sidebar */}
        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.name)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-white hover:bg-white/20 transition-all duration-200"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay Transparan */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 md:p-8 transition-all duration-500 ${
          open ? "blur-sm scale-[0.98]" : ""
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center gap-4 mb-10">
          {/* Tombol hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-teal-600 text-white rounded-md shadow-lg hover:bg-teal-700 transition"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Judul Dashboard */}
          <div>
            <h1 className="text-3xl font-bold text-teal-700">Dashboard</h1>
            <p className="text-gray-600">{kaderName}</p>
          </div>
        </div>

        {/* Statistik Kartu */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Balita", value: 34 },
            { label: "Ibu Hamil", value: 20 },
            { label: "Total", value: 54 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-4xl font-bold">{item.value}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tombol Filter */}
        <div className="flex justify-start mb-6">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition">
            Filter
          </button>
        </div>

        {/* Grafik */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="font-semibold mb-4 text-gray-700">
              Grafik Laporan Harian
            </h3>
            <div className="flex justify-center items-center h-48">
              <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                Chart
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="font-semibold mb-4 text-gray-700">
              Grafik Laporan Bulanan
            </h3>
            <div className="flex justify-center items-center h-48">
              <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                Chart
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          © 2025 Posyandu Digital. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  HeartPulse,
  LogOut,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkup = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"balita" | "ibuHamil">("balita");
  const [filterBulan, setFilterBulan] = useState("Semua Bulan");
  const [filterTahun, setFilterTahun] = useState(new Date().getFullYear());
  const [dataCheckup, setDataCheckup] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>(""); // ✅ Tambahkan state role

  const navigate = useNavigate();

  const bulanList = [
    "Semua Bulan",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tahunList = Array.from({ length: 5 }, (_, i) => 2023 + i);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const namaKader = user?.nama_lengkap || "Kader";

  // ✅ Ambil role user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setRole(parsed.role || "");
      } catch (err) {
        console.error("Gagal parsing user:", err);
      }
    }
  }, []);


  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://10.200.180.222:3000/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const handleNavigation = (name: string) => {
    setOpen(false);
    if (name === "Dashboard") navigate("/home");
    else if (name === "Pasien") navigate("/pasien");
    else if (name === "Check Up") navigate("/checkup");
    else if (name === "Logout") handleLogout();
  };

  const fetchCheckupData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const month =
        filterBulan === "Semua Bulan"
          ? ""
          : bulanList.indexOf(filterBulan).toString().padStart(2, "0");
      const year = filterTahun;
      const patientType = filter === "ibuHamil" ? "ibu_hamil" : "balita";

      const res = await axios.get("http://10.200.180.222:3000/api/checkup", {
        params: { month, year, patientType },
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setDataCheckup(responseData);
    } catch (error) {
      console.error("Gagal mengambil data checkup:", error);
      setDataCheckup([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckupData();
  }, [filter, filterBulan, filterTahun]);

  const filteredData = dataCheckup.filter((item) => {
    const patient = item.patient || {};
    const keyword = search.toLowerCase();

    if (filter === "balita") {
      return (
        patient.name?.toLowerCase().includes(keyword) ||
        patient.motherName?.toLowerCase().includes(keyword)
      );
    } else {
      return patient.name?.toLowerCase().includes(keyword);
    }
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-blue-50 to-white text-gray-800 relative">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40
          bg-teal-700 text-white border-r border-teal-800 shadow-2xl
          transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/20">
          <h2 className="font-bold text-xl tracking-wide">POSYANDU</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-white/20 transition md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
<nav className="flex flex-col space-y-2 p-4">
  {[
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    ...(role === "meja1"
      ? [{ name: "Pasien", icon: <Users className="w-5 h-5" /> }]
      : []), // ✅ hanya tampil untuk meja1
    { name: "Check Up", icon: <HeartPulse className="w-5 h-5" /> },
    { name: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ].map((item) => (
    <button
      key={item.name}
      onClick={() => handleNavigation(item.name)}
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-white/20 transition-all duration-200"
    >
      {item.icon}
      <span className="text-sm font-medium">{item.name}</span>
    </button>
  ))}
</nav>

      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 md:p-8 transition-all duration-500 overflow-x-auto ${
          open ? "blur-sm scale-[0.98]" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-teal-600 text-white rounded-md shadow-lg hover:bg-teal-700 transition"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div>
            <h1 className="text-3xl font-bold text-teal-700">
              Check Up {filter === "balita" ? "Balita" : "Ibu Hamil"}
            </h1>
            <p className="text-gray-600">{namaKader}</p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-4 mb-6">
          {/* Filter jenis */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("balita")}
              className={`px-5 py-2 rounded-full font-medium shadow transition-all duration-200 ${
                filter === "balita"
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white border border-teal-400 text-teal-600 hover:bg-teal-50"
              }`}
            >
              Balita
            </button>
            <button
              onClick={() => setFilter("ibuHamil")}
              className={`px-5 py-2 rounded-full font-medium shadow transition-all duration-200 ${
                filter === "ibuHamil"
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white border border-teal-400 text-teal-600 hover:bg-teal-50"
              }`}
            >
              Ibu Hamil
            </button>
          </div>

          {/* Filter Bulan & Tahun */}
          <div className="flex items-center gap-2 flex-wrap">
            <label htmlFor="bulan" className="text-gray-700 font-medium">
              Bulan:
            </label>
            <select
              id="bulan"
              value={filterBulan}
              onChange={(e) => setFilterBulan(e.target.value)}
              className="border border-teal-400 rounded-full px-4 py-2 text-gray-700 bg-white shadow-sm"
            >
              {bulanList.map((bulan) => (
                <option key={bulan} value={bulan}>
                  {bulan}
                </option>
              ))}
            </select>

            <label htmlFor="tahun" className="text-gray-700 font-medium ml-3">
              Tahun:
            </label>
            <select
              id="tahun"
              value={filterTahun}
              onChange={(e) => setFilterTahun(Number(e.target.value))}
              className="border border-teal-400 rounded-full px-4 py-2 text-gray-700 bg-white shadow-sm"
            >
              {tahunList.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 mb-6">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Cari ${
              filter === "balita"
                ? "nama ibu atau anak..."
                : "nama ibu hamil..."
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full outline-none text-gray-700"
          />
        </div>

        {/* Tabel */}
        <div className="w-full overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              {filter === "balita" ? (
                <tr className="bg-teal-700 text-white text-left">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Anak</th>
                  <th className="px-4 py-3">Nama Ibu</th>
                  <th className="px-4 py-3">RT</th>
                  <th className="px-4 py-3">JK</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              ) : (
                <tr className="bg-teal-700 text-white text-left">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Ibu Hamil</th>
                  <th className="px-4 py-3">RT</th>
                  <th className="px-4 py-3">JK</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              )}
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-500 italic">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-500 italic">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, i) => {
                  const patient = item.patient || {};
                  const status = item.completed || item.isDataComplete;

                  return filter === "balita" ? (
                    <tr
                      key={item.id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{patient.name}</td>
                      <td className="px-4 py-3">{patient.motherName || "-"}</td>
                      <td className="px-4 py-3">{patient.rt}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                            patient.gender === "P"
                              ? "bg-pink-100 text-pink-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {patient.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {status ? "Complete" : "Belum Lengkap"}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={item.id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{patient.name}</td>
                      <td className="px-4 py-3">{patient.rt}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                            patient.gender === "P"
                              ? "bg-pink-100 text-pink-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {patient.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {status ? "Complete" : "Belum Lengkap"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          © 2025 Posyandu Digital. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Checkup;

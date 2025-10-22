import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  HeartPulse,
  LogOut,
  Plus,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pasien = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"balita" | "ibuHamil">("balita");
  const navigate = useNavigate();

  const handleNavigation = (name: string) => {
    setOpen(false);
    if (name === "Dashboard") navigate("/home");
    else if (name === "Pasien") navigate("/pasien");
    else if (name === "Check Up") navigate("/checkup");
    else if (name === "Logout") navigate("/");
  };

  const dataBalita = [
    { id: 1, ibu: "Siti Asmara", anak: "Sita Fatimah Zaira", jk: "P", rt: 5 },
    { id: 2, ibu: "Ratna", anak: "Afan Ezra", jk: "L", rt: 2 },
    { id: 3, ibu: "Fatma Kunto", anak: "Albertus Domino", jk: "L", rt: 17 },
    { id: 4, ibu: "Gitanjali", anak: "Piera Laila", jk: "P", rt: 12 },
  ];

  const dataIbuHamil = [
    { id: 1, nama: "Dewi Ayu", usiaKandungan: "7 bulan", rt: 3 },
    { id: 2, nama: "Sulastri", usiaKandungan: "5 bulan", rt: 11 },
    { id: 3, nama: "Wulan", usiaKandungan: "8 bulan", rt: 8 },
  ];

  const filteredData =
    filter === "balita"
      ? dataBalita.filter(
          (item) =>
            item.ibu.toLowerCase().includes(search.toLowerCase()) ||
            item.anak.toLowerCase().includes(search.toLowerCase())
        )
      : dataIbuHamil.filter((item) =>
          item.nama.toLowerCase().includes(search.toLowerCase())
        );

  const handleRowClick = (id: number) => {
    navigate(`/detailpasien/${id}?type=${filter}`);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-blue-50 to-white text-gray-800 relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40
          bg-white/30 backdrop-blur-xl border-r border-white/30 shadow-2xl
          transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
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

        <nav className="flex flex-col space-y-2 p-4">
          {[
            {
              name: "Dashboard",
              icon: <LayoutDashboard className="w-5 h-5" />,
            },
            { name: "Pasien", icon: <Users className="w-5 h-5" /> },
            { name: "Check Up", icon: <HeartPulse className="w-5 h-5" /> },
            { name: "Logout", icon: <LogOut className="w-5 h-5" /> },
          ].map((item) => (
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

      {/* Overlay */}
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
              Data Pasien {filter === "balita" ? "Balita" : "Ibu Hamil"}
            </h1>
            <p className="text-gray-600">Kader Meja 2</p>
          </div>
        </div>

        {/* Filter & Tambah Data */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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

          {/* Tombol Tambah Data */}
          <button
            onClick={() => navigate(`/tambahpasien?type=${filter}`)}
            className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-teal-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" /> Tambah Data
          </button>
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
        <div className="overflow-x-auto">
          {filter === "balita" ? (
            <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-teal-700 text-white text-left">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Anak</th>
                  <th className="px-4 py-3">Nama Ibu</th>
                  <th className="px-4 py-3">RT</th>
                  <th className="px-4 py-3">JK</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any, i: number) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className="border-b last:border-none hover:bg-teal-50 cursor-pointer transition"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{item.anak}</td>
                    <td className="px-4 py-3">{item.ibu}</td>
                    <td className="px-4 py-3">{item.rt}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                          item.jk === "P"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.jk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-teal-700 text-white text-left">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Ibu Hamil</th>
                  <th className="px-4 py-3">Usia Kandungan</th>
                  <th className="px-4 py-3">RT</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any, i: number) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className="border-b last:border-none hover:bg-teal-50 cursor-pointer transition"
                  >
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{item.nama}</td>
                    <td className="px-4 py-3">{item.usiaKandungan}</td>
                    <td className="px-4 py-3">{item.rt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          © 2025 Posyandu Digital. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default Pasien;

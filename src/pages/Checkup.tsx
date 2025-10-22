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

const Checkup = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"balita" | "ibuHamil">("balita");
  const [filterBulan, setFilterBulan] = useState("Semua Bulan");
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

  const handleNavigation = (name: string) => {
    setOpen(false);
    if (name === "Dashboard") navigate("/home");
    else if (name === "Pasien") navigate("/pasien");
    else if (name === "Check Up") navigate("/checkup");
    else if (name === "Logout") navigate("/");
  };

  const dataBalita = [
    {
      id: 1,
      ibu: "Siti Asmara",
      anak: "Sita Fatimah Zaira",
      jk: "P",
      rt: 5,
      bulan: "Januari",
    },
    {
      id: 2,
      ibu: "Ratna",
      anak: "Afan Ezra",
      jk: "L",
      rt: 2,
      bulan: "Februari",
    },
    {
      id: 3,
      ibu: "Fatma Kunto",
      anak: "Albertus Domino",
      jk: "L",
      rt: 17,
      bulan: "Maret",
    },
    {
      id: 4,
      ibu: "Gitanjali",
      anak: "Piera Laila",
      jk: "P",
      rt: 12,
      bulan: "Januari",
    },
  ];

  const dataIbuHamil = [
    {
      id: 1,
      nama: "Dewi Ayu",
      usiaKandungan: "7 bulan",
      rt: 3,
      bulan: "Maret",
    },
    {
      id: 2,
      nama: "Sulastri",
      usiaKandungan: "5 bulan",
      rt: 11,
      bulan: "Februari",
    },
    { id: 3, nama: "Wulan", usiaKandungan: "8 bulan", rt: 8, bulan: "Januari" },
  ];

  const filteredData =
    filter === "balita"
      ? dataBalita.filter(
          (item) =>
            (filterBulan === "Semua Bulan" || item.bulan === filterBulan) &&
            (item.ibu.toLowerCase().includes(search.toLowerCase()) ||
              item.anak.toLowerCase().includes(search.toLowerCase()))
        )
      : dataIbuHamil.filter(
          (item) =>
            (filterBulan === "Semua Bulan" || item.bulan === filterBulan) &&
            item.nama.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-blue-50 to-white text-gray-800 relative">
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
            <p className="text-gray-600">Kader Meja 2</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-4 mb-6">
          {/* Jenis Filter */}
          <div className="flex flex-wrap gap-3">
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

          {/* Dropdown Bulan */}
          <div className="flex items-center gap-2 flex-wrap">
            <label htmlFor="bulan" className="text-gray-700 font-medium">
              Filter Bulan:
            </label>
            <select
              id="bulan"
              value={filterBulan}
              onChange={(e) => setFilterBulan(e.target.value)}
              className="border border-teal-400 rounded-full px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {bulanList.map((bulan) => (
                <option key={bulan} value={bulan}>
                  {bulan}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Tambah Data */}
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-teal-700 transition-all duration-200">
              <Plus className="w-4 h-4" /> Tambah Data
            </button>
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
                  <th className="px-4 py-3 whitespace-nowrap">No</th>
                  <th className="px-4 py-3 whitespace-nowrap">Nama Anak</th>
                  <th className="px-4 py-3 whitespace-nowrap">Nama Ibu</th>
                  <th className="px-4 py-3 whitespace-nowrap">RT</th>
                  <th className="px-4 py-3 whitespace-nowrap">JK</th>
                  <th className="px-4 py-3 whitespace-nowrap">Bulan</th>
                </tr>
              ) : (
                <tr className="bg-teal-700 text-white text-left">
                  <th className="px-4 py-3 whitespace-nowrap">No</th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    Nama Ibu Hamil
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    Usia Kandungan
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">RT</th>
                  <th className="px-4 py-3 whitespace-nowrap">Bulan</th>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredData.map((item: any, i: number) => (
                <tr
                  key={item.id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  {filter === "balita" ? (
                    <>
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
                      <td className="px-4 py-3">{item.bulan}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">{item.nama}</td>
                      <td className="px-4 py-3">{item.usiaKandungan}</td>
                      <td className="px-4 py-3">{item.rt}</td>
                      <td className="px-4 py-3">{item.bulan}</td>
                    </>
                  )}
                </tr>
              ))}
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

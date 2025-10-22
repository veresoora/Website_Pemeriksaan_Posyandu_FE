import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const dataBalitaAwal = [
  {
    id: 1,
    nama: "Rina",
    umur: "2 tahun",
    berat: "12 kg",
    tinggi: "85 cm",
    alamat: "Jl. Merpati No. 3",
    namaOrtu: "Siti Rahma",
  },
  {
    id: 2,
    nama: "Budi",
    umur: "3 tahun",
    berat: "14 kg",
    tinggi: "90 cm",
    alamat: "Jl. Mawar No. 5",
    namaOrtu: "Ahmad Yusuf",
  },
];

const dataIbuHamilAwal = [
  {
    id: 1,
    nama: "Siti",
    umur: "28 tahun",
    usiaKandungan: "6 bulan",
    berat: "60 kg",
    alamat: "Jl. Anggrek No. 7",
    tekananDarah: "110/70 mmHg",
  },
  {
    id: 2,
    nama: "Ayu",
    umur: "31 tahun",
    usiaKandungan: "8 bulan",
    berat: "65 kg",
    alamat: "Jl. Melati No. 9",
    tekananDarah: "115/75 mmHg",
  },
];

export default function DetailPasien() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil query parameter `type`
  const queryParams = new URLSearchParams(location.search);
  const rawType = queryParams.get("type");

  // Normalisasi type biar seragam
  const type =
    rawType?.toLowerCase() === "ibu" || rawType?.toLowerCase() === "ibuhamil"
      ? "ibuHamil"
      : "balita";

  // Simulasi data dari "database"
  const [dataBalita, setDataBalita] = useState(dataBalitaAwal);
  const [dataIbuHamil, setDataIbuHamil] = useState(dataIbuHamilAwal);

  // Tentukan data pasien berdasarkan type
  const pasien =
    type === "balita"
      ? dataBalita.find((item) => item.id === Number(id))
      : dataIbuHamil.find((item) => item.id === Number(id));

  // ======= HANDLER =======
  const handleHapus = () => {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    if (type === "balita") {
      setDataBalita(dataBalita.filter((item) => item.id !== Number(id)));
    } else {
      setDataIbuHamil(dataIbuHamil.filter((item) => item.id !== Number(id)));
    }

    alert("Data berhasil dihapus.");
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/editpasien/${id}?type=${type}`);
  };

  const handleAntrean = () => {
    navigate(`/antrean/${id}?type=${type}`);
  };

  // Jika data tidak ditemukan
  if (!pasien) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-700 bg-gray-50">
        <p className="mb-4 text-lg">Data pasien tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Kembali
        </button>
      </div>
    );
  }

  // ======= RENDER DETAIL =======
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Detail {type === "balita" ? "Balita" : "Ibu Hamil"}
        </h2>

        <div className="divide-y divide-gray-200">
          {Object.entries(pasien).map(([key, value]) => (
            <div key={key} className="py-2 flex justify-between">
              <span className="capitalize font-medium text-gray-600">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-gray-800">{String(value ?? "-")}</span>
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Kembali
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={handleAntrean}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Antrean
            </button>
            <button
              onClick={handleHapus}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

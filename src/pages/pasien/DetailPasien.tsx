import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DetailPasien() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [pasien, setPasien] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Ambil ?type dari URL
  const queryParams = new URLSearchParams(location.search);
  const rawType = queryParams.get("type");

  const type =
    rawType?.toLowerCase() === "ibu_hamil" || rawType?.toLowerCase() === "ibu"
      ? "ibu_hamil"
      : "balita";

  // ==========================
  // FETCH DETAIL PASIEN
  // ==========================
  useEffect(() => {
    const fetchDetailPasien = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://10.200.180.222:3000/api/pasien/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPasien(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil data pasien:", err);
        alert("Gagal mengambil data pasien.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailPasien();
  }, [id]);

  // ==========================
  // HANDLER BUTTON
  // ==========================

  // Hapus pasien
  const handleHapus = async () => {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus pasien ini?");
    if (!konfirmasi) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://10.200.180.222:3000/api/pasien/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Pasien berhasil dihapus.");
      navigate("/pasien");
    } catch (err) {
      console.error("Gagal menghapus pasien:", err);
      alert("Gagal menghapus pasien.");
    }
  };

  // Tambah ke antrean
  const handleAntrean = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://10.200.180.222:3000/api/pasien/add-to-queue`,
        {
          pasienId: id,
          tanggal: new Date().toISOString().slice(0, 10),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Pasien berhasil ditambahkan ke antrian hari ini.");
    } catch (err: any) {
      console.error("Gagal menambahkan ke antrean:", err);
      alert(
        err.response?.data?.message || "Gagal menambahkan pasien ke antrian."
      );
    }
  };

  // Edit pasien
  const handleEdit = () => {
    navigate(`/editpasien/${id}?type=${type}`);
  };

  // ==========================
  // RENDER
  // ==========================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Memuat data pasien...
      </div>
    );
  }

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

  // ==========================
  // RENDER DETAIL SESUAI TYPE
  // ==========================
  const renderField = (label: string, value: any) => (
    <div className="py-2 flex justify-between">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800 text-right">{value ?? "-"}</span>
    </div>
  );

  const renderDetail = () => {
    if (type === "balita") {
      return (
        <>
          {renderField("Nama Balita", pasien.name)}
          {renderField("Nama Ibu", pasien.motherName)}
          {renderField("RT", pasien.rt)}
          {renderField("Jenis Kelamin", pasien.gender === "L" ? "Laki-laki" : "Perempuan")}
          {renderField("Tanggal Lahir", pasien.birthDate)}
          {renderField("Alamat", pasien.address)}
          {renderField("Status KB", pasien.kb ? "Ya" : "Tidak")}
          {renderField("Status PUS", pasien.pus ? "Ya" : "Tidak")}
          {renderField("Status WUS", pasien.wus ? "Ya" : "Tidak")}
          {renderField("Imunisasi", pasien.imunisasi)}
        </>
      );
    } else if (type === "ibu_hamil") {
      return (
        <>
          {renderField("Nama Ibu Hamil", pasien.name)}
          {renderField("NIK", pasien.nik)}
          {renderField("Nama Suami", pasien.namaSuami)}
          {renderField("RT", pasien.rt)}
          {renderField("Usia (Tahun)", pasien.umurIbu)}
          {renderField("Nomor KK", pasien.noKK)}
          {renderField("Nomor HP", pasien.noTelp)}
          {renderField("Alamat", pasien.address)}
          {renderField("Gravida", pasien.gravida)}
          {renderField("Partus", pasien.partus)}
          {renderField("Abortus", pasien.abortus)}
          {renderField("Usia Kandungan (minggu)", pasien.usiaKandunganMinggu)}
          {renderField("HPM", pasien.hpm)}
          {renderField("HPL", pasien.hpl)}
          {renderField("Nomor Jaminan", pasien.nomorJaminan)}
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Detail {type === "balita" ? "Balita" : "Ibu Hamil"}
        </h2>

        <div className="divide-y divide-gray-200">{renderDetail()}</div>

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

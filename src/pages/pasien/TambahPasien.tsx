import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TambahPasien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // <-- ambil ID dari URL jika mode edit
  const params = new URLSearchParams(location.search);
  const type = params.get("type"); // "balita" atau "ibu_hamil"

  const isEdit = !!id; // true kalau mode edit

  const [form, setForm] = useState({
    name: "",
    motherName: "",
    namaSuami: "",
    nik: "",
    noKK: "",
    birthDate: "",
    gender: "",
    address: "",
    rt: "",
    imunisasi: "",
    kb: false,
    pus: false,
    wus: false,
    gravida: "",
    partus: "",
    abortus: "",
    jarakPersalinanSebelumnya: "",
    usiaKandunganMinggu: "",
    tglPemeriksaanPertama: "",
    hpm: "",
    hpl: "",
    nomorJaminan: "",
    noTelp: "",
  });

  const [loading, setLoading] = useState(false);

  // ===============================
  // 1️⃣ AMBIL DATA PASIEN SAAT EDIT
  // ===============================
  useEffect(() => {
    if (!isEdit) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://10.200.180.222:3000/api/pasien/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;

        setForm((prev) => ({
          ...prev,
          ...data, // isi otomatis field sesuai data API
        }));
      } catch (err) {
        console.error("Gagal mengambil data pasien:", err);
        alert("Gagal mengambil data pasien.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit, navigate]);

  // ===============================
  // 2️⃣ HANDLE CHANGE INPUT
  // ===============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===============================
  // 3️⃣ HANDLE SUBMIT (POST/PUT)
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const payload =
        type === "balita"
          ? {
              patientType: "balita",
              name: form.name,
              birthDate: form.birthDate,
              gender: form.gender,
              address: form.address,
              motherName: form.motherName,
              rt: form.rt,
              imunisasi: form.imunisasi,
              kb: form.kb,
              pus: form.pus,
              wus: form.wus,
            }
          : {
              patientType: "ibu_hamil",
              name: form.name,
              birthDate: form.birthDate,
              gender: form.gender,
              address: form.address,
              rt: form.rt,
              nik: form.nik,
              noKK: form.noKK,
              namaSuami: form.namaSuami,
              gravida: form.gravida,
              partus: form.partus,
              abortus: form.abortus,
              jarakPersalinanSebelumnya: form.jarakPersalinanSebelumnya,
              usiaKandunganMinggu: form.usiaKandunganMinggu,
              tglPemeriksaanPertama: form.tglPemeriksaanPertama,
              hpm: form.hpm,
              hpl: form.hpl,
              nomorJaminan: form.nomorJaminan,
              noTelp: form.noTelp,
            };

      if (isEdit) {
        // UPDATE (PUT)
        await axios.put(`http://10.200.180.222:3000/api/pasien/${id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("✅ Data pasien berhasil diperbarui!");
      } else {
        // CREATE (POST)
        await axios.post(`http://10.200.180.222:3000/api/pasien`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("✅ Data pasien berhasil disimpan!");
      }

      navigate(-1);
    } catch (err: any) {
      console.error("Error simpan pasien:", err);
      alert(err.response?.data?.message || "❌ Gagal menyimpan data pasien.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 4️⃣ RENDER FORM
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-6 text-gray-800 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>

        <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
          {isEdit
            ? `EDIT DATA ${type === "balita" ? "BALITA" : "IBU HAMIL"}`
            : `TAMBAH DATA ${type === "balita" ? "BALITA" : "IBU HAMIL"}`}
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "balita" ? (
              <>
                <InputField label="Nama Anak" name="name" value={form.name} onChange={handleChange} />
                <InputField label="Nama Ibu" name="motherName" value={form.motherName} onChange={handleChange} />
                <SelectField
                  label="Jenis Kelamin"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  options={[
                    { label: "Laki-laki", value: "L" },
                    { label: "Perempuan", value: "P" },
                  ]}
                />
                <InputField label="Tanggal Lahir" type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
                <InputField label="Alamat" name="address" value={form.address} onChange={handleChange} />
                <InputField label="RT" name="rt" value={form.rt} onChange={handleChange} />
                <InputField label="Imunisasi" name="imunisasi" value={form.imunisasi} onChange={handleChange} />
                <CheckboxField label="KB" name="kb" checked={form.kb} onChange={handleChange} />
                <CheckboxField label="PUS" name="pus" checked={form.pus} onChange={handleChange} />
                <CheckboxField label="WUS" name="wus" checked={form.wus} onChange={handleChange} />
              </>
            ) : (
              <>
                <InputField label="Nama Ibu" name="name" value={form.name} onChange={handleChange} />
                <InputField label="Nama Suami" name="namaSuami" value={form.namaSuami} onChange={handleChange} />
                <InputField label="NIK" name="nik" value={form.nik} onChange={handleChange} />
                <InputField label="No KK" name="noKK" value={form.noKK} onChange={handleChange} />
                <InputField label="Tanggal Lahir" type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
                <SelectField
                  label="Jenis Kelamin"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  options={[
                    { label: "Laki-laki", value: "L" },
                    { label: "Perempuan", value: "P" },
                  ]}
                />
                <InputField label="Alamat" name="address" value={form.address} onChange={handleChange} />
                <InputField label="RT" name="rt" value={form.rt} onChange={handleChange} />
                <InputField label="Gravida" name="gravida" value={form.gravida} onChange={handleChange} />
                <InputField label="Partus" name="partus" value={form.partus} onChange={handleChange} />
                <InputField label="Abortus" name="abortus" value={form.abortus} onChange={handleChange} />
                <InputField label="Jarak Persalinan Sebelumnya" name="jarakPersalinanSebelumnya" value={form.jarakPersalinanSebelumnya} onChange={handleChange} />
                <InputField label="Usia Kandungan (minggu)" name="usiaKandunganMinggu" value={form.usiaKandunganMinggu} onChange={handleChange} />
                <InputField label="Tanggal Pemeriksaan Pertama" type="date" name="tglPemeriksaanPertama" value={form.tglPemeriksaanPertama} onChange={handleChange} />
                <InputField label="HPM" type="date" name="hpm" value={form.hpm} onChange={handleChange} />
                <InputField label="HPL" type="date" name="hpl" value={form.hpl} onChange={handleChange} />
                <InputField label="Nomor Jaminan" name="nomorJaminan" value={form.nomorJaminan} onChange={handleChange} />
                <InputField label="No Telepon" name="noTelp" value={form.noTelp} onChange={handleChange} />
              </>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Menyimpan..." : isEdit ? "Perbarui" : "Simpan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ===============================
// COMPONENT INPUTS
// ===============================
const InputField = ({ label, name, value, onChange, type = "text" }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400"
      placeholder={`Masukkan ${label.toLowerCase()}...`}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400"
    >
      <option value="">Pilih {label.toLowerCase()}</option>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, name, checked, onChange }: any) => (
  <div className="flex items-center gap-2">
    <input type="checkbox" name={name} checked={checked || false} onChange={onChange} />
    <label className="text-sm text-gray-700">{label}</label>
  </div>
);

export default TambahPasien;

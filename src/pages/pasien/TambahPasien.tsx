import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const TambahPasien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type"); // "balita" atau "ibuHamil"

  const [form, setForm] = useState({
    namaIbu: "",
    namaAnak: "",
    suami: "",
    nik: "",
    noKk: "",
    tanggalLahir: "",
    usia: "",
    rtRw: "",
    imunisasi: "",
    kb: "",
    pus: "",
    wus: "",
    paritas: "",
    jarakPersalinan: "",
    uk: "",
    tglPemeriksaan: "",
    jenisKelamin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data disimpan:", form);
    alert("Data berhasil disimpan!");
    navigate(-1);
  };

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
          {type === "balita" ? "TAMBAH DATA BALITA" : "TAMBAH DATA IBU HAMIL"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "balita" ? (
            <>
              <InputField
                label="Nama Ibu"
                name="namaIbu"
                value={form.namaIbu}
                onChange={handleChange}
              />
              <InputField
                label="Nama Anak"
                name="namaAnak"
                value={form.namaAnak}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  name="jenisKelamin"
                  value={form.jenisKelamin}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <InputField
                label="Tanggal Lahir"
                type="date"
                name="tanggalLahir"
                value={form.tanggalLahir}
                onChange={handleChange}
              />
              <InputField
                label="Usia"
                name="usia"
                value={form.usia}
                onChange={handleChange}
              />
              <InputField
                label="RT/RW"
                name="rtRw"
                value={form.rtRw}
                onChange={handleChange}
              />
              <InputField
                label="Imunisasi"
                name="imunisasi"
                value={form.imunisasi}
                onChange={handleChange}
              />
              <InputField
                label="KB"
                name="kb"
                value={form.kb}
                onChange={handleChange}
              />
              <InputField
                label="PUS"
                name="pus"
                value={form.pus}
                onChange={handleChange}
              />
              <InputField
                label="WUS"
                name="wus"
                value={form.wus}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <InputField
                label="Nama Ibu"
                name="namaIbu"
                value={form.namaIbu}
                onChange={handleChange}
              />
              <InputField
                label="Suami"
                name="suami"
                value={form.suami}
                onChange={handleChange}
              />
              <InputField
                label="NIK"
                name="nik"
                value={form.nik}
                onChange={handleChange}
              />
              <InputField
                label="No KK"
                name="noKk"
                value={form.noKk}
                onChange={handleChange}
              />
              <InputField
                label="Tanggal Lahir"
                type="date"
                name="tanggalLahir"
                value={form.tanggalLahir}
                onChange={handleChange}
              />
              <InputField
                label="Usia"
                name="usia"
                value={form.usia}
                onChange={handleChange}
              />
              <InputField
                label="RT/RW"
                name="rtRw"
                value={form.rtRw}
                onChange={handleChange}
              />
              <InputField
                label="Paritas"
                name="paritas"
                value={form.paritas}
                onChange={handleChange}
              />
              <InputField
                label="Jarak Persalinan"
                name="jarakPersalinan"
                value={form.jarakPersalinan}
                onChange={handleChange}
              />
              <InputField
                label="UK"
                name="uk"
                value={form.uk}
                onChange={handleChange}
              />
              <InputField
                label="Tanggal Pemeriksaan"
                type="date"
                name="tglPemeriksaan"
                value={form.tglPemeriksaan}
                onChange={handleChange}
              />
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
              className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400"
      placeholder={`Masukkan ${label.toLowerCase()}...`}
    />
  </div>
);

export default TambahPasien;

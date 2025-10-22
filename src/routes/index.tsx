import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import PasienBalita from "../pages/pasien/Pasien";
import TambahPasien from "../pages/pasien/tambahpasien";
import DetailPasien from "../pages/pasien/DetailPasien";
import Checkup from "../pages/Checkup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pasien" element={<PasienBalita />} />
      <Route path="/tambahpasien" element={<TambahPasien />} />
      <Route path="/detailpasien/:id" element={<DetailPasien />} />
      <Route path="/checkup" element={<Checkup />} />
    </Routes>
  );
};

export default AppRoutes;

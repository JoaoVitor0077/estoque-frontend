import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Produtos from "./pages/Produtos";
import CadastrarProduto from "./pages/CadastrarProdutos";
import EditarProduto from "./pages/EditarProdutos";
// import Produtos from "./pages/Produtos"; // Página futura

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/cadastrar" element={<CadastrarProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  valor: number | string;
  quantidade: number;
}

// Estilos globais para garantir que a página preencha toda a tela
const setGlobalStyles = () => {
  // Aplicando estilos globais diretamente ao HTML e body
  document.documentElement.style.height = "100%";
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";
  
  document.body.style.height = "100%";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden"; // Previne scroll indesejado
  
  // Encontra o elemento raiz da aplicação React
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.height = "100%";
    rootElement.style.display = "flex";
    rootElement.style.flexDirection = "column";
  }
};

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Aplicar estilos globais quando o componente montar
    setGlobalStyles();
    carregarProdutos();
    
    // Limpar os estilos quando o componente desmontar
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/produtos");
      // Garantir que valores sejam números
      const produtosFormatados = response.data.map((produto: Produto) => ({
        ...produto,
        valor: typeof produto.valor === 'string' ? parseFloat(produto.valor) : produto.valor,
        quantidade: typeof produto.quantidade === 'string' ? parseInt(produto.quantidade, 10) : produto.quantidade
      }));
      setProdutos(produtosFormatados);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setError("Falha ao carregar produtos. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:5000/api/produtos/${id}`);
        carregarProdutos(); // Recarrega a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto. Tente novamente.");
      }
    }
  };

  // Função segura para formatar valores
  const formatarValor = (valor: number | string): string => {
    // Garante que o valor seja um número
    const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;
    
    // Verifica se é um número válido
    if (isNaN(valorNumerico)) {
      return "0.00";
    }
    
    return valorNumerico.toFixed(2);
  };

  // Estilos inline usando objetos JavaScript
  const styles = {
    // Estilo para garantir que o componente preencha toda a tela
    fullPage: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden" as const,
    },
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      backgroundColor: "#f8f9fa",
      width: "100%",
      height: "100%",
      color:"black"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      background: "linear-gradient(90deg,rgb(30, 90, 126),rgb(58, 161, 230))",
      zIndex: 10,
    },
    title: {
      color: "#FFFFF0",
      margin: "0",
      fontSize: "25px",
      fontWeight: "bold"
    },
    tableContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      padding: "20px",
      overflow: "hidden" as const,
    },
    tableWrap: {
      flex: 1,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden" as const
    },
    tableResponsive: {
      overflowX: "auto" as const,
      overflowY: "auto" as const,
      flex: 1
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      minWidth: "800px"
    },
    th: {
      padding: "15px",
      textAlign: "left" as const,
      borderBottom: "2px solid #e0e0e0",
      backgroundColor: "#3498db",
      color: "white",
      fontWeight: "600",
      position: "sticky" as const,
      top: 0,
      zIndex: 10
    },
    td: {
      padding: "15px",
      textAlign: "left" as const,
      borderBottom: "1px solid #e0e0e0"
    },
    noData: {
      textAlign: "center" as const,
      padding: "40px",
      color: "#7f8c8d",
      fontSize: "18px"
    },
    btnPrimary: {
      padding: "10px 15px",
      backgroundColor: "#FFD700",
      color: "#F5F5F5",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
    },
    btnEdit: {
      padding: "8px 15px",
      backgroundColor: "#1E90FF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "500",
      display: "inline-flex",
      alignItems: "center",
      transition: "all 0.3s ease",
      marginRight: "8px"
    },
    btnDelete: {
      padding: "8px 15px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "500",
      display: "inline-flex",
      alignItems: "center",
      transition: "all 0.3s ease"
    },
    actionsCell: {
      display: "flex",
      gap: "8px",
      flexWrap: "nowrap" as const
    },
    icon: {
      marginRight: "5px"
    },
    loadingOrError: {
      textAlign: "center" as const,
      padding: "30px",
      fontSize: "18px",
      color: "#555"
    }
  };

  // Estado para controlar o hover das linhas
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div style={styles.fullPage}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Lista de Produtos</h2>
          <Link to="/produtos/cadastrar">
            <button style={styles.btnPrimary}>
              <span style={styles.icon}>➕</span> Cadastrar Novo Produto
            </button>
          </Link>
        </div>
        
        <div style={styles.tableContainer}>
          <div style={styles.tableWrap}>
            {loading ? (
              <div style={styles.loadingOrError}>Carregando produtos...</div>
            ) : error ? (
              <div style={styles.loadingOrError}>{error}</div>
            ) : (
              <div style={styles.tableResponsive}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Nome</th>
                      <th style={styles.th}>Descrição</th>
                      <th style={styles.th}>Valor</th>
                      <th style={styles.th}>Quantidade</th>
                      <th style={styles.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.length > 0 ? (
                      produtos.map((produto) => (
                        <tr 
                          key={produto.id} 
                          style={{
                            backgroundColor: hoveredRow === produto.id ? "#f5f5f5" : "transparent"
                          }}
                          onMouseEnter={() => setHoveredRow(produto.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td style={styles.td}>{produto.id}</td>
                          <td style={styles.td}>{produto.nome}</td>
                          <td style={styles.td}>{produto.descricao}</td>
                          <td style={styles.td}>R$ {formatarValor(produto.valor)}</td>
                          <td style={styles.td}>{produto.quantidade}</td>
                          <td style={styles.td}>
                            <div style={styles.actionsCell}>
                              <Link to={`/produtos/editar/${produto.id}`}>
                                <button style={styles.btnEdit}>
                                  <span style={styles.icon}>✏️</span> Editar
                                </button>
                              </Link>
                              <button 
                                style={styles.btnDelete}
                                onClick={() => handleExcluir(produto.id)}
                              >
                                <span style={styles.icon}>🗑️</span> Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={styles.noData}>Nenhum produto encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
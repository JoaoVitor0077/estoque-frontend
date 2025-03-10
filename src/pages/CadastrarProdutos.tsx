import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CadastrarProduto = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("enviando dados...", {
        nome,
        descricao,
        valor: parseFloat(valor),
        quantidade: parseInt(quantidade),
    });
    
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/produtos", {
        nome,
        descricao,
        valor: parseFloat(valor),
        quantidade: parseInt(quantidade),
      });
      
      navigate("/produtos"); // Redireciona para a lista de produtos
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setErro("Não foi possível cadastrar o produto. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Estilos inline usando objetos JavaScript
  const styles = {
    pageReset: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box" as const,
      width: "100vw", // 100% da largura da viewport
      height: "100vh", // 100% da altura da viewport
      position: "absolute" as const,
      top: 0,
      left: 0
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column" as const,
      backgroundColor: "#f8f9fa",
      overflow: "auto" as const,
      padding: "0" // Removido o padding aqui
    },
    header: {
      width: "100%", // Ocupar toda a largura
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
      padding: "15px 10px",
      background: "linear-gradient(90deg,rgb(30, 90, 126),rgb(58, 161, 230))", // Gradiente azul
      color: "white", // Cor do texto em branco para destacar
      borderRadius: "0", // Removido o border-radius no topo
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" // Sombra suave para dar profundidade
    },
    title: {
      color: "#ffffff", // Alterado para branco para melhor contraste com o fundo azul
      margin: "0",
      fontSize: "28px",
      fontWeight: "bold"
    },
    formContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      padding: "60px",
      maxWidth: "800px",
      margin: "20px auto 0", // Adicionado margin-top para criar espaço após o header
      width: "100%",
      flexDirection: "column" as const, // Exibe os campos em coluna
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#2c3e50"
    },
    input: {
      width: "100%",
      maxWidth: "300px",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      transition: "border 0.3s ease",
      outline: "none",
      color: "Black",
      backgroundColor: "White"
    },
    inputWithIcon: {
      paddingLeft: "45px"
    },
    textarea: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      minHeight: "120px",
      resize: "vertical" as const,
      transition: "border 0.3s ease",
      backgroundColor:"white",
      color:"black",
      outline: "none"
    },
    iconContainer: {
      position: "relative" as const
    },
    icon: {
      position: "absolute" as const,
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#6c757d"
    },
    formRow: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px",
      flexDirection: "row" as const,
      flexWrap: "wrap" as const, // Mantém os campos lado a lado e evita sobreposição
      alignItems: "center", // Garante alinhamento adequado
      justifyContent: "center"
    },
    formColumn: {
      flex: 1,
      minWidth: "300px"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "30px"
    },
    btnCancel: {
      padding: "12px 20px",
      backgroundColor: "white",
      color: "#6c757d",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease"
    },
    btnSubmit: {
      padding: "12px 20px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease"
    },
    btnDisabled: {
      opacity: 0.7,
      cursor: "not-allowed" as const
    },
    loadingSpinner: {
      marginRight: "8px",
      animation: "spin 1s linear infinite",
      display: "inline-block"
    },
    errorContainer: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      padding: "15px",
      borderRadius: "4px",
      marginBottom: "20px",
      border: "1px solid #f5c6cb"
    }
  };

  return (
    <div style={styles.pageReset}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Cadastrar Produto</h2>
        </div>
        
        <div style={styles.formContainer}>
          {erro && (
            <div style={styles.errorContainer}>
              {erro}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="nome">Nome do Produto</label>
              <input
                style={styles.input}
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite o nome do produto"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="descricao">Descrição</label>
              <textarea
                style={styles.textarea}
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                placeholder="Digite a descrição do produto"
              />
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="valor">Valor (R$)</label>
                <div style={styles.iconContainer}>
                  <div style={styles.icon}>R$</div>
                  <input
                    style={{...styles.input, ...styles.inputWithIcon}}
                    type="number"
                    id="valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                  />
                </div>
              </div>
              
              <div style={styles.formColumn}>
                <label style={styles.label} htmlFor="quantidade">Quantidade</label>
                <input
                  style={styles.input}
                  type="number"
                  id="quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  required
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              <button
                type="button"
                onClick={() => navigate('/produtos')}
                style={styles.btnCancel}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.btnSubmit,
                  ...(loading ? styles.btnDisabled : {})
                }}
              >
                {loading ? (
                  <>
                    <span style={styles.loadingSpinner}>↻</span>
                    Cadastrando...
                  </>
                ) : 'Cadastrar Produto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastrarProduto;
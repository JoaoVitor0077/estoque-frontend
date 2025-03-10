import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Função para aplicar estilos globais
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

const EditarProduto = () => {
  const { id } = useParams(); // Captura o ID do produto na URL
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    valor: "",
    quantidade: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Estado para controlar a exibição do modal de confirmação
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Estado para mostrar mensagens de sucesso/erro da submissão
  const [submitStatus, setSubmitStatus] = useState<{message: string, isError: boolean} | null>(null);

  // Aplicar estilos globais e buscar os dados do produto pelo ID
  useEffect(() => {
    setGlobalStyles();
    
    const fetchProduto = async () => {
        if (!id) {
          setError("ID do produto não encontrado.");
          setLoading(false);
          return;
        }
      
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/produtos/${id}`);
          console.log("Produto carregado:", response.data);
          setProduto(response.data);
          setError(null);
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
          setError("Falha ao carregar produto. Verifique se o servidor está rodando.");
        } finally {
          setLoading(false);
        }
      };

    fetchProduto();
    
    // Limpar os estilos quando o componente desmontar
    return () => {
      document.body.style.overflow = "";
    };
  }, [id]);

  // Atualiza os valores dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
    console.log(`Campo ${name} atualizado para: ${value}`);
  };

  // Abrir modal de confirmação antes de enviar
  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto a ser atualizado:", produto);
    setShowConfirmation(true);
  };

  // Fechar modal de confirmação
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Enviar atualização para o backend
  const handleSubmit = async () => {
    setSubmitStatus(null);
    try {
      console.log("Enviando dados para o servidor:", {
        nome: produto.nome,
        descricao: produto.descricao,
        valor: parseFloat(produto.valor as string) || 0,
        quantidade: parseInt(produto.quantidade as string) || 0,
      });
      
      const response = await axios.put(`http://localhost:5000/api/produtos/${id}`, {
        nome: produto.nome,
        descricao: produto.descricao,
        valor: parseFloat(produto.valor as string) || 0,
        quantidade: parseInt(produto.quantidade as string) || 0,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Resposta do servidor:", response.data);
      setSubmitStatus({message: "Produto atualizado com sucesso!", isError: false});
      
      // Redirecionar após um breve delay para que o usuário veja a mensagem de sucesso
      setTimeout(() => {
        navigate("/produtos");
      }, 1500);
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      let errorMessage = "Erro ao atualizar. Tente novamente.";
      
      if (error.response) {
        console.error("Resposta de erro do servidor:", error.response.data);
        errorMessage = `Erro: ${error.response.status} - ${error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      
      setSubmitStatus({message: errorMessage, isError: true});
      setShowConfirmation(false);
    }
  };

  // Voltar para a lista de produtos
  const handleCancel = () => {
    navigate("/produtos");
  };

  // Estilos inline usando objetos JavaScript
  const styles = {
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
      color: "black"
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
    formContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      padding: "20px",
      overflow: "auto" as const,
    },
    formCard: {
      maxWidth: "1200px", // Aumentei de 800px para 1200px
      width: "95%", // Adicionar largura relativa para melhor responsividade
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      overflow: "hidden" as const
    },
    formHeader: {
      backgroundColor: "#3498db",
      color: "white",
      padding: "15px 20px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    formHeaderTitle: {
      margin: 0,
      flex: 1
    },
    formHeaderActions: {
      display: "flex",
      gap: "10px"
    },
    formBody: {
      padding: "20px"
    },
    formGroup: {
      marginBottom: "20px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#333"
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      transition: "border-color 0.3s",
      boxSizing: "border-box" as const,
      backgroundColor: "white",
      color: "black"
    },
    textarea: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      minHeight: "100px",
      resize: "vertical" as const,
      transition: "border-color 0.3s",
      boxSizing: "border-box" as const,
      backgroundColor: "white",
      color: "black"
    },
    formActions: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 20px 20px 20px",
      gap: "15px"
    },
    btnPrimary: {
      padding: "10px 15px",
      backgroundColor: "#4B0082",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "14px"
    },
    btnConfirm: {
      padding: "10px 15px",
      backgroundColor: "#2ecc71",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "14px"
    },
    btnCancel: {
      padding: "10px 15px",
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "14px"
    },
    loadingOrError: {
      textAlign: "center" as const,
      padding: "30px",
      fontSize: "18px",
      color: "#555"
    },
    icon: {
      marginRight: "5px"
    },
    modalOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "8px",
      width: "400px",
      maxWidth: "90%",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)"
    },
    modalHeader: {
      marginTop: 0,
      marginBottom: "20px",
      color: "#333",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center" as const
    },
    modalBody: {
      marginBottom: "20px",
      fontSize: "16px",
      lineHeight: 1.5,
      color: "#555"
    },
    modalActions: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px"
    },
    statusMessage: {
      padding: "10px 15px",
      margin: "15px 0",
      borderRadius: "4px",
      textAlign: "center" as const,
      fontWeight: "bold",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    }
  };

  // Componente do Modal de Confirmação
  const ConfirmationModal = () => {
    if (!showConfirmation) return null;
    
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <h3 style={styles.modalHeader}>Confirmar Alterações</h3>
          <div style={styles.modalBody}>
            <p>Você tem certeza que deseja salvar as alterações no produto <strong>{produto.nome}</strong>?</p>
            <p>Os dados atuais serão substituídos permanentemente.</p>
          </div>
          <div style={styles.modalActions}>
            <button 
              style={styles.btnCancel} 
              onClick={handleCloseConfirmation}
            >
              <span style={styles.icon}>❌</span> Cancelar
            </button>
            <button 
              style={styles.btnConfirm} 
              onClick={handleSubmit}
            >
              <span style={styles.icon}>✅</span> Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar mensagem de status (sucesso/erro)
  const StatusMessage = () => {
    if (!submitStatus) return null;
    
    const messageStyle = {
      ...styles.statusMessage,
      ...(submitStatus.isError ? styles.errorMessage : styles.successMessage)
    };
    
    return (
      <div style={messageStyle}>
        {submitStatus.message}
      </div>
    );
  };

  return (
    <div style={styles.fullPage}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Editar Produto</h2>
        </div>
        
        <div style={styles.formContainer}>
          {loading ? (
            <div style={styles.loadingOrError}>Carregando produto...</div>
          ) : error ? (
            <div style={styles.loadingOrError}>{error}</div>
          ) : (
            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <h3 style={styles.formHeaderTitle}>Editar Produto #{id}</h3>
                <div style={styles.formHeaderActions}>
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    style={styles.btnCancel}
                  >
                    <span style={styles.icon}>❌</span> Cancelar
                  </button>
                  <button 
                    type="button" 
                    onClick={handleOpenConfirmation}
                    style={styles.btnPrimary}
                  >
                    <span style={styles.icon}>💾</span> Salvar Alterações
                  </button>
                </div>
              </div>
              
              {submitStatus && <StatusMessage />}
              
              <form onSubmit={handleOpenConfirmation}>
                <div style={styles.formBody}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Nome:</label>
                    <input 
                      type="text" 
                      name="nome" 
                      value={produto.nome} 
                      onChange={handleChange} 
                      required 
                      style={styles.input}
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Descrição:</label>
                    <textarea 
                      name="descricao" 
                      value={produto.descricao} 
                      onChange={handleChange} 
                      required 
                      style={styles.textarea}
                      placeholder="Descrição detalhada do produto"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Valor (R$):</label>
                    <input 
                      type="number" 
                      name="valor" 
                      value={produto.valor} 
                      onChange={handleChange} 
                      required 
                      style={styles.input}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Quantidade em Estoque:</label>
                    <input 
                      type="number" 
                      name="quantidade" 
                      value={produto.quantidade} 
                      onChange={handleChange} 
                      required 
                      style={styles.input}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                {/* Botão de submit escondido para garantir que Enter funcione no formulário */}
                <button type="submit" style={{display: 'none'}}></button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Renderiza o modal de confirmação */}
      <ConfirmationModal />
    </div>
  );
};

export default EditarProduto;
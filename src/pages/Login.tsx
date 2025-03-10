import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Resetando estilos globais para garantir que ocupe toda a tela
const GlobalStyle = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

// Container principal - cobrindo 100% da largura e altura
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: white;
  padding: 1rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// Wrapper do formulário
const FormWrapper = styled.div`
  background: white;
  border: 1px solid #007bff; 
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.29);
  width: 100%;
  max-width: 400px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

// Link de cadastro estilizado
const SignupText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  
  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Inputs responsivos
const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

// Botão responsivo
const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
  
  &:hover {
    background: #0056b3;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      navigate("/produtos"); // Redireciona para a página de produtos após login
    } catch (err) {
      setError("Email ou senha inválidos.");
    }
  };

  return (
    <GlobalStyle>
      <LoginContainer>
        <FormWrapper>
          <Title>Login</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <Button type="submit">Entrar</Button>
          </form>
          <SignupText>
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
          </SignupText>
        </FormWrapper>
      </LoginContainer>
    </GlobalStyle>
  );
};

export default Login;
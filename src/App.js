import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import dompedro from "./img/dompedro.png";

function App() {
    const [cnpj, setCnpj] = useState("");
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");

    const buscarCNPJ = async () => {
        setErro("");
        setDados(null);

        const cnpjLimpo = cnpj.replace(/\D/g, "");

        if (cnpjLimpo.length !== 14) {
            setErro("CNPJ inválido! Deve conter 14 números.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:4000/cnpj/${cnpjLimpo}`
            );
            setDados(response.data);
        } catch (err) {
            console.error("Erro completo:", err);
            setErro(err.response?.data?.error || "Erro ao buscar CNPJ");
        }
    };

    return (
        <div className="App">
            <img src={dompedro} alt="" className="" />

            <h1>Consulta de CNPJ</h1>
            <input
                type="text"
                placeholder="Digite o CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
            />
            <button onClick={buscarCNPJ}>Buscar</button>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {dados && (
                <div className="resultado">
                    <h2>{dados.razao_social}</h2>
                    <p>
                        <strong>Nome Fantasia:</strong> {dados.nome_fantasia}
                    </p>
                    <p>
                        <strong>CNPJ:</strong> {dados.cnpj}
                    </p>
                    <p>
                        <strong>Inscrição Estadual:</strong>{" "}
                        {dados.inscricao_estadual}
                    </p>
                    <p>
                        <strong>Endereço:</strong> {dados.logradouro},{" "}
                        {dados.numero} - {dados.bairro}, {dados.municipio} -{" "}
                        {dados.uf}
                    </p>
                    <p>
                        <strong>CEP:</strong> {dados.cep}
                    </p>
                    <p>
                        <strong>Telefone:</strong> {dados.telefone}
                    </p>
                    <p>
                        <strong>Email:</strong> {dados.email}
                    </p>
                    <p>
                        <strong>CNAE Principal:</strong> {dados.cnae_principal}{" "}
                        - {dados.atividade_principal}
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;

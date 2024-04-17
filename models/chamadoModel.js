// Importa o módulo que contém a conexão com o banco de dados
const dbConnection = require("../db/dbConnection");

// Define a classe Model para manipular operações relacionadas às vagas de emprego no banco de dados
class ChamadoModel {
  async executeSQL(sql, parametros = []) {
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, parametros, (error, resposta) => {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  // Método para obter a lista de todas as vagas de emprego no banco de dados
  readList() {
    const sql = "SELECT id, nome, salario FROM chamados"; // Consulta SQL para selecionar todas as vagas de emprego
    return this.executeSQL(sql); // Executa a consulta SQL utilizando o método executeSQL e retorna o respostaado
  }

  // Método para obter uma vaga de emprego específica por ID no banco de dados
  read(id) {
    const sql = "SELECT id, nome, salario FROM chamados WHERE id = ?"; // Consulta SQL para selecionar uma vaga de emprego por ID
    return this.executeSQL(sql, id); // Executa a consulta SQL utilizando o método executeSQL e retorna o respostaado
  }

  // Método para criar uma nova vaga de emprego no banco de dados
  create(newJob) {
    const sql = "INSERT INTO chamados (nome, salario) VALUES (?, ?)"; // Consulta SQL corrigida para inserir uma nova vaga de emprego
    const values = [newJob.name, newJob.salary]; // Valores a serem inseridos na consulta SQL
    return this.executeSQL(sql, values); // Executa a consulta SQL utilizando o método executeSQL e retorna o respostaado
  }

  // Método para atualizar uma vaga de emprego existente por ID no banco de dados
  update(updatedJob, id) {
    const sql = "UPDATE chamados SET nome = ?, salario = ? WHERE id = ?"; // Consulta SQL para atualizar uma vaga de emprego por ID
    const values = [updatedJob.name, updatedJob.salary, id]; // Valores a serem inseridos na consulta SQL
    return this.executeSQL(sql, values); // Executa a consulta SQL utilizando o método executeSQL e retorna o respostaado
  }

  // Método para excluir uma vaga de emprego existente por ID no banco de dados
  delete(id) {
    const sql = "DELETE FROM chamados WHERE id = ?"; // Consulta SQL para excluir uma vaga de emprego por ID
    return this.executeSQL(sql, id); // Executa a consulta SQL utilizando o método executeSQL e retorna o respostaado
  }
}

// Exporta uma instância da classe Model para ser utilizada em outros arquivos do projeto
module.exports = new ChamadoModel();

// Importa o modelo de chamado (vaga de emprego) para acessar as operações CRUD relacionadas a empregos
const chamadoModel = require("../models/chamadoModel");

// Define a classe JobController, responsável por controlar as operações relacionadas a empregos
class ChamadoController {
  // Método para visualizar a pagina inicial
  viewRead(req, res) {
    return res.status(200).render("./index", { title: "Página Inicial" });
  }

  // Método para visualizar o formulário de criação de uma nova vaga de emprego
  viewCreate(req, res) {
    return res
      .status(200)
      .render("./helpDeskS1/chamado_create", { title: "Adicionar Vaga de Emprego" });
  }

  // Método para visualizar o formulário de atualização de uma vaga de emprego existente
  async viewUpdate(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função read() do modelo chamadoModel para obter a vaga de emprego com o ID fornecido
    const chamado = chamadoModel.read(id);
    try {
      const result = await chamado;
      return result.length == 0
        ? res.status(404).redirect("/")
        : res
            .status(200)
            .render("./chamado/chamado_update", {
              title: "Atualizar Vaga de Emprego",
              chamados: result,
            });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  // Método para listar todas as vagas de emprego
  async readList(req, res) {
    // Chama a função readList() do modelo chamadoModel para obter a lista de vagas de emprego
    const listaChamados = chamadoModel.readList();
    try {
      const result_1 = await listaChamados;
      return result_1.length == 0
        ? res
            .status(404)
            .render("./chamado/chamado_read", {
              title: "Chamados",
              chamados: result_1,
            })
        : res
            .status(200)
            .render("./chamado/chamado_read", {
              title: "Chamados",
              chamados: result_1,
            });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  // Método para ler uma vaga de emprego específica por ID
  async read(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função read() do modelo chamadoModel para obter a vaga de emprego com o ID fornecido
    const chamado = chamadoModel.read(id);
    try {
      const result = await chamado;
      return result.length == 0
        ? res
            .status(404)
            .render("./chamado/chamado_read", {
              title: "Vagas de Emprego",
              chamados: result,
            })
        : res
            .status(200)
            .render("./chamado/chamado_read", {
              title: "Vagas de Emprego",
              chamados: result,
            });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  // Método para criar uma nova vaga de emprego
  async create(req, res) {
    const novoChamado = req.body;
    const chamado = chamadoModel.create(novoChamado);
    try {
      const result = await chamado;
      return res
        .status(200)
        .send(
          "<script> alert('Vaga de Emprego criada com sucesso!'); window.location='/chamado' </script>"
        );
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  // Método para atualizar uma vaga de emprego existente por ID
  async update(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Obtém os dados atualizados da vaga de emprego do corpo da requisição
    const chamadoAtualizado = req.body;
    // Chama a função update() do modelo chamadoModel para atualizar a vaga de emprego com o ID fornecido
    const chamado = chamadoModel.update(chamadoAtualizado, id);
    try {
      const result = await chamado;
      return res
        .status(200)
        .send(
          "<script> alert('Vaga de Emprego atualizada com sucesso!'); window.location='../../chamado' </script>"
        );
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  // Método para excluir uma vaga de emprego existente por ID
  async delete(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função delete() do modelo chamadoModel para excluir a vaga de emprego com o ID fornecido
    const chamado = chamadoModel.delete(id);
    try {
      const result = await chamado;
      return res
        .status(200)
        .send(
          "<script> alert('Vaga de Emprego excluída com sucesso!'); window.location='../../chamado' </script>"
        );
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

// Exporta uma instância da classe JobController para ser utilizada em outros arquivos do projeto
module.exports = new ChamadoController();

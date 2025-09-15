const db = require('../../models');
const Restaurante = db.Restaurante;

// Criar um novo restaurante
exports.create = async (req, res) => {
  try {
    const { nome, cnpj, localizacao, caminhoCardapioPdf } = req.body;
    if (!nome || !cnpj) {
      return res.status(400).send({ message: 'Nome e CNPJ são obrigatórios.' });
    }
    const novoRestaurante = await Restaurante.create({ nome, cnpj, localizacao, caminhoCardapioPdf });
    res.status(201).send(novoRestaurante);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar o restaurante.', error: error.message });
  }
};

// Listar todos os restaurantes
exports.findAll = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.status(200).send(restaurantes);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar os restaurantes.', error: error.message });
  }
};

// Buscar um restaurante por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurante = await Restaurante.findByPk(id);
    if (restaurante) {
      res.status(200).send(restaurante);
    } else {
      res.status(404).send({ message: `Restaurante com ID=${id} não encontrado.` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o restaurante.', error: error.message });
  }
};

// Atualizar um restaurante por ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [num] = await Restaurante.update(req.body, {
      where: { id: id }
    });
    if (num == 1) {
      res.send({ message: 'Restaurante atualizado com sucesso.' });
    } else {
      res.send({ message: `Não foi possível atualizar o restaurante com ID=${id}. Talvez não tenha sido encontrado.` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar o restaurante.', error: error.message });
  }
};

// Deletar um restaurante por ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Restaurante.destroy({
      where: { id: id }
    });
    if (num == 1) {
      res.send({ message: 'Restaurante deletado com sucesso.' });
    } else {
      res.send({ message: `Não foi possível deletar o restaurante com ID=${id}. Talvez não tenha sido encontrado.` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao deletar o restaurante.', error: error.message });
  }
};


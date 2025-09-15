const db = require('../../models');
const Restaurante = db.Restaurante;
const Pedido = db.Pedido; 
const { Op } = require('sequelize');

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

// Calcular tempo médio de preparo
exports.getTempoMedio = async (req, res) => {
  try {
    const restauranteId = req.params.id;
    const ultimosPedidos = await Pedido.findAll({
      where: {
        restauranteId: restauranteId,
        status: 'PRONTO',
        dataHoraCriacao: { [Op.ne]: null },
        dataHoraPronto: { [Op.ne]: null }
      },
      order: [['dataHoraPronto', 'DESC']],
      limit: 10
    });

    // Filtra pedidos com datas válidas (dataHoraPronto >= dataHoraCriacao)
    const pedidosValidos = ultimosPedidos.filter(pedido => {
      const inicio = new Date(pedido.dataHoraCriacao).getTime();
      const fim = new Date(pedido.dataHoraPronto).getTime();
      return fim >= inicio;
    });

    if (pedidosValidos.length === 0) {
      return res.status(200).send({ tempoMedioMinutos: 0, message: 'Não há pedidos válidos para calcular o tempo médio.' });
    }

    const totalSegundos = pedidosValidos.reduce((acc, pedido) => {
      const inicio = new Date(pedido.dataHoraCriacao).getTime();
      const fim = new Date(pedido.dataHoraPronto).getTime();
      const diferenca = (fim - inicio) / 1000; 
      return acc + diferenca;
    }, 0);

    const tempoMedioSegundos = totalSegundos / pedidosValidos.length;
    const tempoMedioMinutos = Math.round(tempoMedioSegundos / 60);

    res.status(200).send({ tempoMedioMinutos });

  } catch (error) {
    res.status(500).send({ message: 'Erro ao calcular o tempo médio.', error: error.message });
  }
};


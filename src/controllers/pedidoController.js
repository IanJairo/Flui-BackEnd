const db = require('../../models');
const Pedido = db.Pedido;
const Restaurante = db.Restaurante;
const Cliente = db.Cliente;
const Inscricao = db.Inscricao;

exports.inscrever = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: 'O e-mail é obrigatório para a inscrição.' });
    }

    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).send({ message: 'Pedido não encontrado.' });
    }

    const [cliente] = await Cliente.findOrCreate({
      where: { email: email }
    });

    const novaInscricao = await Inscricao.create({
      clienteId: cliente.id,
      pedidoId: pedido.id,
      status: 'PENDENTE'
    });

    res.status(201).send({ message: 'Inscrição realizada com sucesso!', inscricao: novaInscricao });

  } catch (error) {
    res.status(500).send({ message: 'Erro ao processar a inscrição.', error: error.message });
  }
};


exports.create = async (req, res) => {
  try {
    const { numeroComanda, restauranteId } = req.body;
    if (!numeroComanda || !restauranteId) {
      return res.status(400).send({ message: 'O número da comanda e o ID do restaurante são obrigatórios.' });
    }

    const novoPedido = await Pedido.create({
      numeroComanda,
      restauranteId,
  status: 'PREPARANDO',
      dataHoraCriacao: new Date()
    });

    res.status(201).send(novoPedido);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar o pedido.', error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [{
        model: Restaurante,
  as: 'restaurante',
  attributes: ['id', 'nome']
      }],
  order: [['dataHoraCriacao', 'DESC']]
    });
    res.status(200).send(pedidos);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar os pedidos.', error: error.message });
  }
};

exports.findProntos = async (req, res) => {
  try {
    const pedidosProntos = await Pedido.findAll({
      where: {
        status: 'PRONTO'
      },
      include: [{
        model: Restaurante,
        as: 'restaurante',
        attributes: ['id', 'nome']
      }],
  order: [['dataHoraPronto', 'DESC']],
  limit: 7
    });
    res.status(200).send(pedidosProntos);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar pedidos prontos.', error: error.message });
  }
};


exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id, {
      include: [{ 
        model: Restaurante, 
  as: 'restaurante'
      }]
    });
    if (pedido) {
      res.status(200).send(pedido);
    } else {
      res.status(404).send({ message: `Pedido com ID=${id} não encontrado.` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o pedido.', error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).send({ message: 'O novo status é obrigatório.' });
    }

    const updateData = { status };

    if (status.toUpperCase() === 'PRONTO') {
      updateData.dataHoraPronto = new Date();
    }

    const [num] = await Pedido.update(updateData, {
      where: { id: id }
    });

    if (num == 1) {
      if (status.toUpperCase() === 'PRONTO') {
        const inscricoes = await Inscricao.findAll({
          where: {
            pedidoId: id,
            status: 'PENDENTE'
          },
          include: [Cliente]
        });

        for (const inscricao of inscricoes) {
          const emailCliente = inscricao.Cliente.email;
          
          console.log(`[NOTIFICAÇÃO]: Enviando e-mail para ${emailCliente} sobre o Pedido ID ${id} que está pronto!`);

          await inscricao.update({ status: 'ENVIADA' });
          await inscricao.update({ status: 'ENVIADA' });
        }
      }
      
      res.send({ message: 'Status do pedido atualizado com sucesso.' });
    } else {
      res.send({ message: `Não foi possível atualizar o pedido com ID=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar o status do pedido.', error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Pedido.destroy({
      where: { id: id }
    });
    if (num == 1) {
      res.send({ message: 'Pedido deletado com sucesso.' });
    } else {
      res.send({ message: `Não foi possível deletar o pedido com ID=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao deletar o pedido.', error: error.message });
  }
};


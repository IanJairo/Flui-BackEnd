const db = require('../../models');
const Restaurante = db.Restaurante;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar um novo restaurante
exports.register = async (req, res) => {
  try {
    const { nome, cnpj, localizacao, password } = req.body;
    if (!nome || !cnpj || !password) {
      return res.status(400).send({ message: 'Nome, CNPJ e senha são obrigatórios.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const novoRestaurante = await Restaurante.create({
      nome,
      cnpj,
      localizacao,
      password: hashedPassword
    });
    // Não retornar a senha na resposta
    novoRestaurante.password = undefined;
    res.status(201).send({ message: 'Restaurante registrado com sucesso!', restaurante: novoRestaurante });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao registrar restaurante.', error: error.message });
  }
};

// Login de um restaurante
exports.login = async (req, res) => {
  try {
    const { cnpj, password } = req.body;
    const restaurante = await Restaurante.findOne({ 
      where: { cnpj: cnpj },
      // CORREÇÃO: Força a inclusão do campo de senha na consulta
      attributes: { include: ['password'] } 
    });

    if (!restaurante || !restaurante.password) {
      return res.status(404).send({ message: 'Restaurante não encontrado ou senha não configurada.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, restaurante.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: 'Senha inválida!' });
    }

    const token = jwt.sign({ id: restaurante.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({
      id: restaurante.id,
      nome: restaurante.nome,
      cnpj: restaurante.cnpj,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao fazer login.', error: error.message });
  }
};


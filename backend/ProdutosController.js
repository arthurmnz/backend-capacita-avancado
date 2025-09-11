const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

exports.criarProduto = async (req, res) => {
    const {nome, preco, categoria, descricao, img} = req.body
    
    const novoprodutoCriado = await prisma.produto.create({
        data: {
            nome: nome,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            img: img
        }
    });
    
    let msg = `O produto ${nome} criado com sucesso!`
    console.log(msg)
    res.status(201).json(novoprodutoCriado);
};

exports.listarProdutos = async (req, res) => {
    

    const produtosDoBancoDeDados = await prisma.produto.findMany();
    console.log(produtosDoBancoDeDados);
    res.status(200).json(produtosDoBancoDeDados);
};

exports.buscarProdutoPorId = async (req, res) => {
    const {id} = req.params;
    
    const produtoDoBanco = await prisma.produto.findFirst({
        where:{
            id: parseInt(id)
        }
    })
    
    let msg = `produto com id ${id} buscado com sucesso!`
    console.log(msg)
    res.status(200).send(produtoDoBanco);
};

exports.atualizarProduto = async (req, res) => {
    const {id} = req.params;
    const {nome, preco, categoria, descricao, img} = req.body

    const produtoAtualizado = await prisma.produto.update({
        where:{
            id: parseInt(id)
        },
        data:{
            nome: nome,
            preco: preco,
            categoria: categoria,
            descricao: descricao,
            img: img
        }
    })

    let msg = `produto com id ${id} atualizado com sucesso!`
    console.log(msg)
    res.status(200).send(produtoAtualizado);
};

exports.deletarProduto = async (req, res) => {
    const {id} = req.params;

    const produtoDeletado = await prisma.produto.delete({
        where:{
            id: parseInt(id)
        }
    })

    let msg = `produto com id ${id} deletado com sucesso!`
    console.log(msg)
    res.status(200).send(produtoDeletado);
};
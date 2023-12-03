const mongoose = require('mongoose')
const Cadastro = require('../models/cadastros')



const criarCadastros = async (req, res) => {
    console.log(req.body)

    const cadastro = new Cadastro({
        _id: new mongoose.Types.ObjectId(),
        item: req.body.item,
        valor: req.body.valor,
        criadoEm: req.body.criadoEm
    })

    const cadastroJaExiste = await Cadastro.findOne({nome: req.body.nome})
    if(cadastroJaExiste) {
        return res.status(409).json({error: "Item já cadastrado!"})
    }

    try {
        const novoCadastro = await cadastro.save()
        res.status(201).json(novoCadastro)
    }catch (err) {
        res.status(500).json({message: err.message})
    }

}

const mostraCadastros = async(req, res) =>{
    try {
        const cadastros = await Cadastro.find()
    return res.status(200).json(cadastros)
}catch(err){
    res.status(500).json({message: err.message})

}


}

const atualizaCadastros = async (req,res) =>{
    const encontraCadastro = await Cadastro.findById(req.params.id)
    if(encontraCadastro == null){
        return res.status(404).json({message: 'Cadastro não encontrado'})

    }
    if (req.body.item != null) {
        encontraCadastro.nome = req.body.item
    }

    try{

    const cadastroAtualizado = await encontraCadastro.save()
        res.status(200).json(cadastroAtualizado)
    
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

const deletaCadastros = async (req, res)=>{
    try {
        const cadastros = await Cadastro.findById(req.params.id)
        if (cadastros == null) {
        return res.status(404).json({ message: 'item não encontrado'})
        }
    
        await cadastros.remove()
        res.json({ message: 'item deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

}

module.exports = {
    criarCadastros,
    mostraCadastros,
    atualizaCadastros,
    deletaCadastros
}
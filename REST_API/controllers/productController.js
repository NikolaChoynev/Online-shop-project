const { productModel, userModel } = require('../models');
const { bsonToJson } = require('../controllers/auth');



function getProducts(req, res, next) {
    productModel.find({})
        .populate('ownerId buyers')
        .then(products => res.status(200).json(products))
        .catch(next);
}

function getProduct(req, res, next) {
    const { productId } = req.params;

    productModel.findById(productId)
        .populate({
            path: 'comments',
            populate: {
                path: 'ownerId'
            }
        })
        .populate('ownerId')
        .exec()
        .then(product => res.status(200).json(product))
        .catch(next);
}

function createProduct(req, res, next) {
    const { productName, description, price, imageUrl } = req.body;
    const { _id: ownerId } = req.user;


    productModel.create({ productName, description, price, imageUrl, ownerId })
        .then(product =>
            userModel.updateOne({ _id: ownerId }, { $addToSet: { products: product._id } })
                .then(res.status(200).json(product)))
        .catch(next)
        .catch(next);
}

function editProduct(req, res, next) {
    const { productName, description, price, imageUrl } = req.body;
    const { productId } = req.params;

    productModel.findOneAndUpdate({ _id: productId }, { productName, description, price, imageUrl }, { runValidators: true, new: true })
        .populate('ownerId')
        .then(product => res.status(200).json(product))
        .catch(next);
}

function deleteProdict(req, res, next) {
    const { productId } = req.params;

    productModel.findOneAndDelete({ _id: productId })
        .then(deletedProduct => res.status(200).json(deletedProduct))
        .catch(next);
}

function buyProduct(req, res, next) {
    const { productId } = req.params;
    const { _id: userId } = req.user;

    productModel.findById({ _id: productId })
        .then(product => {
            const ownerId = bsonToJson(product.ownerId)
            const jUserId = bsonToJson(userId)
            if (ownerId === jUserId) {
                res.status(401).json({ message: 'Not allowed!' })
            }else if(product.buyers.includes(userId)){
                res.status(201).json({ message: 'You allredy have it!'})
            } else {
                return Promise.all([
                    productModel.findOneAndUpdate({ _id: productId }, { $addToSet: { buyers: userId } }, { new: true }),
                    userModel.findOneAndUpdate({ _id: userId }, { $push: { bought: productId } })
                ])
                    .then(([updatedProduct, _]) =>{
                        res.status(200).json({ message: 'You bought it succsefully! '});
                    })
                    .catch(next);
            }
        })
        .catch(next);

}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    editProduct,
    deleteProdict,
    buyProduct
}
const { userModel, productModel, commentModel } = require('../models');

function newComment(text, ownerId, productId) {
    return commentModel.create({ text, ownerId, productId })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: ownerId }, { $push: { comments: comment._id } }),
                productModel.findByIdAndUpdate({ _id: productId }, { $push: { comments: comment._id } })
            ])
        })
}


function createComment(req, res, next) {
    const { productId } = req.params;
    const { _id: ownerId } = req.user;
    const { text } = req.body;

    commentModel.create({ text, ownerId, productId })
    newComment(text, ownerId, productId)
        .then(([_, updatedProduct]) => res.status(200).json(updatedProduct))
        .catch(next);
}

function editComment(req, res, next) {
    const { commentId } = req.params;
    const { text } = req.body;
    const { _id: ownerId } = req.user;

    commentModel.findOneAndUpdate({ _id: commentId, ownerId }, { text }, { new: true })
        .then(updatedComment => {
            if (updatedComment) {
                res.status(200).json(updatedComment);
            } else {
                res.stats(401).json({ message: 'Now allowed!' });
            }
        })
        .catch(next)
}

function deleteComment(req, res, next) {
    const { commentId, productId } = req.params;
    const { _id: ownerId } = req.user;

    Promise.all([
        commentModel.findOneAndDelete({ _id: commentId, ownerId }),
        userModel.findOneAndUpdate({ _id: ownerId }, { $pull: { comments: commentId } }),
        productModel.findOneAndUpdate({ _id: productId }, { $pull: { comments: commentId } })
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: 'Now allowed!' });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user

    commentModel.findById({ _id: commentId })
        .then(comment => {
            if(comment.likes.includes(userId)){
                commentModel.updateOne({ _id: commentId }, {$pull: { likes: userId } }, { new: true })
                .then(() => res.status(200).json({ message: 'Unliked successful!' }))
                .catch(next);
                
            } else {
                commentModel.updateOne({ _id: commentId }, {$push: { likes: userId } }, { new: true })
                .then(() => res.status(200).json({ message: 'Liked successful!' }))
                .catch(next);
            }
        })
        .catch(next);

}

module.exports = {
    createComment,
    editComment,
    deleteComment,
    like
}
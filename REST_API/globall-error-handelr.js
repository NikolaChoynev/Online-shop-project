function errorHandler(err, req, res, next) {
    if(err.status===333){
        res.status(333)
        .json({ message: 'ErrorHandler: not allowed!' })
    }else{
        console.error(err.stack)
        // console.log(err)
        res.status(500)
            .json({ message: err.stack })
    }
}

module.exports = errorHandler;
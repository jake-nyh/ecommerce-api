//not found
const notFound = (req, res, next)=>{
    const err = new Error(`Not found : ${req.originalUrl}`)
    res.status(404)
    next(err)
}

//error handler
const errorHandler = (err, req, res, next)=>{
    console.log(err)
    console.log(res.statusCode)
    const statusCode = res.statusCode == 200? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        massage : err.massage,
        stack : err.stack
    })
}

module.exports = {
    notFound,
    errorHandler
}
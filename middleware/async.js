const asyncWrapper = (fn) =>{
    return async(res, req, next) => {
        try {
            await fn(res, req, next)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = asyncWrapper
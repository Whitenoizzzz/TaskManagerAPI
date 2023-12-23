// asyncWrapper function return the async function and eliminates the need of try and catch block 
// in every route. And this returned function has access to fn due to concept called closures
const asyncWrapper = (fn)=>{
    return async(req,res,next)=> {
    try {
        await fn(req,res,next);
    } catch (error) {
        next(error)
    }
}
}

module.exports = asyncWrapper
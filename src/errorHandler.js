
export const badRequest = (err, req,res, next) => {
    if(err.status === 400){
        res.status(400).send({message:err.errors})
    } else {
        next(err)
    }
}

export const unauthorised = (err, req,res, next) => {
    if(err.status === 401){
        res.status(401).send({message:'unauthorised'})
    } else {
        next(err)
    }
}

export const notFound = (err, req,res, next) => {
    if(err.status === 404){
        res.status(404).send({message:'page not found'})
    } else {
        next(err)
    }
}

export const genericError = (err, req,res, next) => {
    if(err.status === 500){
        res.status(500).send({message:'generic server errors'})
    } else {
        next(err)
    }
}



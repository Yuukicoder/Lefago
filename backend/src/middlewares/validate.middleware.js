import createHttpError from "http-errors";
export const validate = (schema) =>{

    return (req, res, next) => {
       const result = schema.safeParse(req.body);
       if(!result.success){
        console.log(result.error.issues);
        console.log("Body", req.body);
        const message = result.error.issues[0].message;
        return next(createHttpError(400, message))
       }
       req.body = result.data;
       next();
    };
}
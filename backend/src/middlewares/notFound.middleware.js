export const notFoundMiddleWare = async (err,req, res, next) => {
  res.status(404).json(
    {
        success: false,
        message: "API route not found"
    }
  )
};
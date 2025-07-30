// 1) promise approach

export const asyncHandler = (requestHandler) =>{
  return (req, res, next) =>{
    Promise.resolve(requestHandler(req, res, next)).catch((error)=> next(error))
  }
}

// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }

// 2) try catch approach

// export const asyncHandler = (requestHandler) => async (req, res, next)=>{
//   try {
//     return await requestHandler(req, res, next)
//   } catch (error) {
//     return res.status(error.code || 500).json(
//       {
//         success : false,
//         message : error.message
//       }
//     )
//   }
// }

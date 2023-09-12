"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt, { JwtPayload, Secret } from "jsonwebtoken";
// import config from "../config";
// interface DecodedToken extends JwtPayload {
//   userId: string;
//   role: string;
// }
// const authorization = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized user" });
//   }
//   try {
//     const decodedToken: DecodedToken = jwt.verify(
//       token,
//       config.jwt_secret_key as Secret
//     );
//     if (decodedToken.role !== req.body.role) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Forbidden. Access denied." });
//     }
//     req.body.userId = decodedToken.userId;
//     req.body.role = decodedToken.role;
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };
// export default authorization;

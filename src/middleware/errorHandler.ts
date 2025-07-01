 
import type { Request, Response, NextFunction } from "express"

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error("Error:", error)

  // Default error response
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  })
}

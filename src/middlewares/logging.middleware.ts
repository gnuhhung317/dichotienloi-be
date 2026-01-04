import { Request, Response, NextFunction } from "express";

/**
 * Middleware để log request/response
 * Tạm thời để debug
 */
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Log request
  console.log("\n========== REQUEST ==========");
  console.log(`[${new Date().toISOString()}]`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`Path: ${req.path}`);
  
  if (req.query && Object.keys(req.query).length > 0) {
    console.log(`Query:`, req.query);
  }
  
  if (req.params && Object.keys(req.params).length > 0) {
    console.log(`Params:`, req.params);
  }
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`Body:`, req.body);
  }
  
  if (req.headers.authorization) {
    console.log(`Authorization: ${req.headers.authorization.substring(0, 20)}...`);
  }
  
  // Capture response
  const originalSend = res.send;
  
  res.send = function (data: any) {
    const duration = Date.now() - startTime;
    
    // Log response
    console.log("\n========== RESPONSE ==========");
    console.log(`Status: ${res.statusCode}`);
    console.log(`Duration: ${duration}ms`);
    
    // Log response body nếu là JSON
    if (typeof data === "string") {
      try {
        const jsonData = JSON.parse(data);
        console.log(`Body:`, jsonData);
      } catch {
        console.log(`Body:`, data);
      }
    } else {
      console.log(`Body:`, data);
    }
    
    console.log("================================\n");
    
    return originalSend.call(this, data);
  };
  
  next();
};

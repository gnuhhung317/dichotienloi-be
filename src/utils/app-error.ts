export class AppError extends Error {
  code: string;
  status: number;

  constructor(codeObj: { code: string; message: string; status: number }) {
    super(codeObj.message);
    this.code = codeObj.code;
    this.status = codeObj.status;
  }
}

export const throwError = (codeObj: {
  code: string;
  message: string;
  status: number;
}) => {
  throw new AppError(codeObj);
};

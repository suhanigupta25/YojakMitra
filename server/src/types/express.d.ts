namespace Express {
  interface Request {
    user?: {
      userId: string;
      email: string;
    };
  }
}

//YAYA does npm run dev not work? pnpm is faster and less bug prone, under the hood dono same
//hogya ? commit the changes to git
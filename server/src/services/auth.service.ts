import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User,{RegisteredUser} from "../models/user";

interface TokenPayload {
  userId: string;
  email: string;
}

interface Token{
  accessToken: string;
  refreshToken :string;
}

export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshSecret :string;
  private readonly refreshExpiresIn :string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || '';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

    this.refreshSecret = process.env.REFRESH_SECRET || "";
    this.refreshExpiresIn = process.env.REFRESH_EXPIRES_IN || "7d";
    if (!this.jwtSecret || this.refreshSecret) {
      throw new Error('JWT secrets must be defined in environment variables');
    }
  }

    private generateTokens(payload: TokenPayload): Token{
        const accessToken = jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.jwtExpiresIn,
        });
        const refreshToken = jwt.sign(payload, this.refreshSecret, {
            expiresIn: this.refreshExpiresIn,
        });
        return { accessToken,refreshToken};
    }

    public verifyAccessToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, this.jwtSecret) as TokenPayload;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    public verifyRefreshToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, this.refreshSecret) as TokenPayload;
        } catch (error) {
            throw new Error("Invalid or expired refresh token");
        }
    }

    public async getProfile(userId : string){
        try{
            const profileData=await User.findById(userId);
            return profileData;
        }
        catch(error :any){
            throw new Error("Unable to find profile");
        }
    }

    private hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
  }

    private comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
  }

    async registerUser(userData :RegisteredUser){
        const existingUser=await User.findOne({username: userData.username});
        if(!existingUser){
            throw new Error("Already registed");
        }
        else{
            const hash=await this.hashPassword(userData.password);
            return User.create({...userData,password: hash});
        }
    }

    async loginUser(username: string, password:string){
        const existingUser=await User.findOne({username});
        if(!existingUser){
            throw new Error("Invalid Credentials");
        }
        const hash=await this.hashPassword(password);
        const isSamePassword=await this.comparePassword(password,hash);
        if(!isSamePassword){
            throw new Error("Invalid Credentials");
        }
        const payload: TokenPayload = {
            userId: existingUser.id,
            email: existingUser.email
        };

        const tokens = this.generateTokens(payload);
        return tokens;
        
    }

}



//routes-> deciding whihc url pe konsa function chlega
//controlller -> client aur service ke btwn 
//        client se data lena and service ko dena
//service -> logic(password hash,ai call ,db operation)
//model->db repr user.create ,findone
//schema->doc ka structure(rules)
//midlleware->gatekeepr btwn user and controller
//view->react so no need here
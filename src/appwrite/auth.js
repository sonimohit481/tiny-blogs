import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    try {
      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

      this.account = new Account(this.client);
    } catch (error) {
      throw new Error(`Failed to initialize AuthService: ${error.message}`);
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        console.log(
          "🚀 ~ AuthService ~ createAccount ~ userAccount:",
          userAccount
        );
        return await this.login({ email, password });
      } else {
        throw new Error("Failed to create user account");
      }
    } catch (error) {
      throw new Error(`Failed to create account: ${error.message} asdf`);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw new Error(`Failed to log in: ${error.message}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw new Error(`Failed to get current user: ${error.message}`);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw new Error(`Failed to logout: ${error.message}`);
    }
  }
}

const authService = new AuthService();

export default authService;

import { UserService } from "../services/userService.js";

export class UserController {
  userService = new UserService();

  async userRegis(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await this.userService.userRegistration(
        name,
        email,
        password,
      );
      if (user) {
        res.status(201).json({
          message: "Registration is succesfull!",
          user,
        });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  async userLogin(req, res) {
    const { email, password } = req.body;

    try {
      const userlogin = await this.userService.Login(email, password);

      res.status(200).json({
        message: "Login is successful!",
        user: userlogin,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getUserProfile = async (req, res) => {
    try {
      const getUser = await this.userService.getUserProfile(req.user.id);

      res.status(200).json(getUser);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  updateProfile = async (req, res) => {
    const userid = req.user.id;
    const updateData = req.body;
    try {
      const user = await this.userService.updateProfile(userid, updateData);
      if (user) {
        res.status(200).json({
          message: "You succesfully updated profile!",
          newUser: user,
        });
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  deleteUser = async (req, res) => {
    const userid = req.user.id;
    try {
      const user = await this.userService.deleteUser(userid);
      if (user) {
        res.status(200).json({ message: "User successfully deleted!" });
      }
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
}

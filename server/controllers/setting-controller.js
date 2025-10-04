import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
const changePassword = async (req, res) => {
  try {
    const { userId, oldPass, newPass } = req.body;
   
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong old Password" });
    }
    const hashPassword = await bcrypt.hash(newPass, 10);
    const newUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { password: hashPassword }
    );
    
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "setting error" });
  }
};
export { changePassword };

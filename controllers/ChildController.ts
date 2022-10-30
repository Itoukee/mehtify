import { reverseChild } from "~~/services/JeffService";

export const Jeff = (req, res, next) => {
  try {
    const reversedChild = reverseChild(req.body.child);
    return res.status(200).send("Miam les enfants " + reversedChild);
  } catch (error) {
    console.error(error);
  }
};

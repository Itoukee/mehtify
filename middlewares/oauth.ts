export const isConnected = (req, res, next) => {
  try {
    // Si connecté
    if (req.body.child) next();
    else return res.status(401).send("Ntm fdp");
  } catch (error) {
    console.error(error);
  }
};

import { magicAdmin } from "../../lib/db/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "../../lib/db/hasura";


export default async function login(req, res) {
    if (req.method === "POST") {
      try {
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substr(7) : "";
        
        // invoke magic

        const metadata = await magicAdmin.users.getMetadataByToken(didToken);
        console.log({ metadata });
        // create jwt

        const token = jwt.sign(
            {
            ...metadata,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": `${metadata.issuer}`,
            },
            },
            "thisisasecretthisisasecrett1234"
        );
        

        const isNewUserQuery = await isNewUser(token, metadata.issuer);
        isNewUserQuery && (await createNewUser(token, metadata));
        setTokenCookie(token, res);
        res.send({ done: true });
    } catch (error) {
      console.error("Something went wrong logging in", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
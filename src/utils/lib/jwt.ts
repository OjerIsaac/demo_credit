import jwt, { JwtPayload } from "jsonwebtoken";

export default class JWT {
  /**
   * Extract user id from a valid access token.
   */
  static verifyAccessToken(token: string): string | null {
    try {
      let payload = jwt.verify(
        token,
        String(process.env.JWT_SECRET)
      ) as JwtPayload;
      return payload.id;
    } catch (e) {
      return null;
    }
  }

  /**
   * Generate access token for app setup
   */
  static generateAccessToken(id: number, name: string, expiresIn: string): string {
    let data: JwtPayload = {
      id: Number(id),
      name: String(name),
    };

    return jwt.sign(data, String(process.env.JWT_SECRET), {
      expiresIn,
    });
  }
}
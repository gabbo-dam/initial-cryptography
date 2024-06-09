import * as crypto from "crypto";

type PRNG = "bytes" | "int" | "uuid";

const prng = (
  type: PRNG,
  size: number,
  min: number,
  max: number,
  encodign: BufferEncoding
) => {
  switch (type) {
    case "bytes":
      return crypto.randomBytes(size).toString(encodign);
    case "int":
      return crypto.randomInt(min, max);
    case "uuid":
      return crypto.randomUUID();
  }
};

export default prng;

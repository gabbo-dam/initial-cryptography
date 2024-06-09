import yargs, { demandOption, describe } from "yargs";
import prng from "./prng";
import cipher from "./cipher";
import decipher from "./decipher";
import hash from "./hash";

const encoding = {
  alias: "enc",
  choices: [
    "ascii",
    "utf8",
    "utf-8",
    "utf16le",
    "utf-16le",
    "ucs2",
    "ucs-2",
    "base64",
    "base64url",
    "latin1",
    "binary",
    "hex",
  ] as const,
  default: "hex",
} as const;

const input = {
  alias: "i",
  type: "string",
  demandOption: true,
} as const;

const output = {
  alias: "o",
  type: "string",
  demandOption: true,
};

const { argv } = yargs

  .options({})
  //@ts-ignore
  .command({
    command: "prng",
    description: "Generar un numero aleatorio",
    handler: ({ type, size, min, max, encodign }) => {
      console.log(prng(type, size, min, max, encodign));
    },
    builder: {
      type: {
        choices: ["bytes", "int", "uuid"] as const,
        description: "",
        demandOption: true,
      },
      size: {
        alias: "s",
        description: "Tamaño de la aleatoriedad",
        default: 16,
      },
      min: {
        type: "number",
        default: 0,
      },
      max: {
        type: "number",
        default: 100,
      },
    },
  })
  //@ts-ignore
  .command({
    command: "cipher",
    describe: "Encrypt a file",
    handler: ({ password, salt, size, input, output }) => {
      cipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to encrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to encrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        ...input,
        description: "The file to encrypt",
      },
      output: {
        ...output,
        description: "The file to output the encrypted file to",
      },
    },
  })
  //@ts-ignore
  .command({
    command: "decipher",
    describe: "Decrypt a file",
    handler: ({ password, salt, size, input, output }: any) => {
      decipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to encrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to encrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        ...input,
        description: "The file to encrypt",
      },
      output: {
        ...output,
        description: "The file to output the encrypted file to",
      },
    },
  })
  .command({
    command: "hash",
    describe: "Hash a file",
    handler: ({ algorithm, encoding, input }) => {
      console.log(hash(algorithm, encoding, input));
    },
    builder: {
      algorithm: {
        alias: "a",
        description: "The algorithm to use",
        type: "string",
        demandOption: true,
        default: "sha256",
      },
      input: {
        ...input,
        description: "The file to hash",
      },
      encoding,
    },
  })

  .demandCommand(1, "You need at least one command before moving on")
  .help();

console.log(argv);

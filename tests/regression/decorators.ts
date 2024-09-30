import { promises as fs } from "fs";

import generateArtifactsDirPath from "../helpers/artifacts-dir";
import { generateCodeFromSchema } from "../helpers/generate-code";
import createReadGeneratedFile, {
  ReadGeneratedFile,
} from "../helpers/read-file";

describe("decorators", () => {
  let outputDirPath: string;
  let readGeneratedFile: ReadGeneratedFile;

  beforeEach(async () => {
    outputDirPath = generateArtifactsDirPath("regression-decorators");
    await fs.mkdir(outputDirPath, { recursive: true });
    readGeneratedFile = createReadGeneratedFile(outputDirPath);
  });

  describe("on model", () => {
    it("should generate decorator on model", async () => {
      const schema = /* prisma */ `
      /// @@TypeGraphQL.decorator(name: "TypeGraphQL.Authorized", args: "'admin'")
      model User {
        intIdField  Int     @id @default(autoincrement())
      }
    `;

      await generateCodeFromSchema(schema, { outputDirPath });
      const userModelTSFile = await readGeneratedFile("/models/User.ts");

      expect(userModelTSFile).toMatchSnapshot("User");
    });

    it("should generate decorator on model with one argument admin", async () => {
      const schema = /* prisma */ `
      /// @@TypeGraphQL.decorator(name: "TypeGraphQL.Authorized", args: "['admin']")
      model User {
        intIdField  Int     @id @default(autoincrement())
      }
    `;

      await generateCodeFromSchema(schema, { outputDirPath });
      const userModelTSFile = await readGeneratedFile("/models/User.ts");

      expect(userModelTSFile).toMatchSnapshot("User");
    });

    it("should generate decorator on model with two arguments admin and participant", async () => {
      const schema = /* prisma */ `
      /// @@TypeGraphQL.decorator(name: "TypeGraphQL.Authorized", args: ["'admin'", "'participant'"])
      model User {
        intIdField  Int     @id @default(autoincrement())
      }
    `;

      await generateCodeFromSchema(schema, { outputDirPath });
      const userModelTSFile = await readGeneratedFile("/models/User.ts");

      expect(userModelTSFile).toMatchSnapshot("User");
    });
  });

  describe("on field", () => {
    it("should generate decorator on field", async () => {
      const schema = /* prisma */ `
      model User {
        /// @@TypeGraphQL.decorator(name: "TypeGraphQL.Authorized", args: "'admin'")
        intIdField  Int     @id @default(autoincrement())
      }
    `;

      await generateCodeFromSchema(schema, { outputDirPath });
      const userModelTSFile = await readGeneratedFile("/models/User.ts");

      expect(userModelTSFile).toMatchSnapshot("User");
    });
  });
});

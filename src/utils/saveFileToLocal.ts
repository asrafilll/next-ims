import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";

async function saveFile(file: File, folderName: string): Promise<string> {
  const fileExtension = file.name.split(".").pop();
  const uniqueFilename = `${randomUUID()}_${Date.now()}.${fileExtension}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const saveDir = path.join(process.cwd(), "public", folderName);

  // Ensure the directory exists
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }

  fs.writeFileSync(path.join(saveDir, uniqueFilename), buffer);

  return `/${folderName}/${uniqueFilename}`;
}

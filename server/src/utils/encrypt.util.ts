import * as bcrypt from 'bcrypt';

export default async function EncryptValue(value: string) {
  const saltOrRounds = process.env.saltEncryption || 16;
  return await bcrypt.hash(value, saltOrRounds);
}

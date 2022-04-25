import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { createToken } from '../../../src/utils/userAuthToken';
import { serialize } from 'cookie';
import hash from '../../../src/utils/helpers/hashHelper';

type Data = {
  name: string;
};
type User = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return;
  }

  const { username, password }: User = req.body;

  const client = await MongoClient.connect(
    `mongodb+srv://kadoraw:bxKfHk84RnWfP3t@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
  const db = client.db('whattodo');
  const collection = db.collection('Users');

  const user = await collection.findOne({
    username: username,
  });

  if (!user) {
    res.status(401).json({ username: null, password: false } as any);
    return;
    //TODO: Throw error
  }

  const isUser = user.password === password;

  if (!isUser) {
    res.status(401).json({ username: user.username, password: isUser } as any);
    //TODO: Throw error
    return;
  }

  const token = await createToken(user.username);
  const serializer = serialize('token', token, {
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader('Set-Cookie', serializer);
  res.status(200).json({ message: 'Success!' } as any);
}
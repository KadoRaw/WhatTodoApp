import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { MongoClient } from 'mongodb';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookie = req.headers.authorization;
  const token = cookie ? cookie.split(' ')[1] : '';
  const username = req.body;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.34tyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
  const db = client.db(process.env.MONGO_DB_DATABASENAME);
  const tokenCollection = db.collection('Tokens');

  const userTokens = (await tokenCollection.findOne({
    username: username,
  })) as any;

  const updatedTokens = userTokens.tokens.filter((x: any) => x.token !== token);

  await tokenCollection.updateOne(
    { username: username },
    { $set: { tokens: updatedTokens } }
  );

  res.status(200).json({ message: 'Success!' } as any);
}

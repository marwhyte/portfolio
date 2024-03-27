import { NextApiRequest, NextApiResponse } from 'next';

import { SuperfaceClient } from '@superfaceai/one-sdk';

const sdk = new SuperfaceClient({
  sdkAuthToken: process.env.SUPERFACE_API_KEY,
});

type Body = {
  email: string;
  message: string;
};

function formValid(body: Body) {
  return body.email && body.message;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!formValid(body)) {
    res.status(422).end();
    return;
  }

  const profile = await sdk.getProfile('communication/send-email@2.2.0');
  const message = `
    Email: ${body.email}
    Message: ${body.message} 
    `;
  const result = await profile.getUseCase('SendEmail').perform(
    {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: 'Message from contact form',
      text: message,
    },
    {
      provider: 'postmark',
      security: {
        server_token: {
          apikey: process.env.POSTMARK_API_KEY,
        },
      },
    }
  );

  try {
    const data = result.unwrap();
    console.log(data);
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

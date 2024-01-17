// pages/api/organizations/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createOrganization } from '../../../lib/api'; // Import your API logic

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, imageUrl } = req.body; // Adjust according to your form data
      const newOrganization = await createOrganization(name, imageUrl);

      res.status(201).json(newOrganization);
    } catch (error) {
      console.error('Error creating organization:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

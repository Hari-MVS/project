import { list } from '@vercel/blob';

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'gallerypage/', // your folder path
    });
    
    return Response.json({ images: blobs });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
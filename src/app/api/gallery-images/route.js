import { list } from '@vercel/blob';

export async function GET() {
  try {
    const token = process.env.vsignfiles_READ_WRITE_TOKEN; // exact env var name

    if (!token) {
      throw new Error("VSIGNFILES_READ_WRITE_TOKEN not set in environment");
    }

    const { blobs } = await list({
      prefix: 'gallerypage/', // make sure this matches your folder in storage
      token,
    });

    // Only return real images (skip folder entries)
    const images = blobs.filter((b) => b.size > 0 && !b.url.endsWith("/"));

    return new Response(JSON.stringify({ images }), { status: 200 });
  } catch (error) {
    console.error("Gallery API error:", error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch images' }),
      { status: 500 }
    );
  }
}

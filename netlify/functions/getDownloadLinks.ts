import { Handler } from '@netlify/functions';
import ytdl from 'ytdl-core';

export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== 'GET' || !event.queryStringParameters || !event.queryStringParameters.url)
    return {
      statusCode: 405,
      body: 'Method Not Allowed or Empty Body',
      headers: { Allow: 'GET' },
    };

  try {
    const info = await ytdl.getInfo(event.queryStringParameters.url);

    const audios: any[] = [];
    const videos: any[] = [];

    info.formats
      .filter((format: any) => format.hasAudio)
      .forEach((format: any) =>
        format.mimeType.includes('audio')
          ? audios.push(format)
          : videos.push(format)
      );

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'SUCCESS',
        data: {
          title: info.videoDetails.title,
          thumbnail:
            info.videoDetails.thumbnails[
              info.videoDetails.thumbnails.length - 1
            ].url,
          duration: info.videoDetails.lengthSeconds,
          audios,
          videos,
        },
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
    };
  }
};

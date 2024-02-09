import { environment } from "environments/environment.development";

type GeneratedImage = Image | null;

interface Image {
  url: string,
  alt: string
}

export const imageVariationUseCase = async (
  baseImage: string,
): Promise<GeneratedImage> => {

  try {
    console.log(baseImage)
    const resp = await fetch(`${environment.backendApi}/image-variation`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({ baseImage })

    });

    const { url, revised_prompt: alt } = await resp.json();

    //console.log('url: ' + url);
    return { url, alt };

  } catch (error) {
    console.log(error);
    return null;
  }

}

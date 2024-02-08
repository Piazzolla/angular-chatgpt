import { environment } from "environments/environment.development";

type GeneratedImage = Image | null;

interface Image {
  url: string,
  alt: string
}

export const imageGenerationUseCase = async (
  prompt:string,
  originalImage?: string,
  maskImage?: string
  ):Promise<GeneratedImage> => {

    try {

      const resp = await fetch(`${ environment.backendApi}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',

        },
        body: JSON.stringify({
          prompt,
          originalImage,
          maskImage,
        })

      });

      const {url, revised_prompt:alt} = await resp.json();

      console.log('url: ' + url);
      return {url, alt};

    } catch (error) {
      console.log(error);
      return null;
    }

}

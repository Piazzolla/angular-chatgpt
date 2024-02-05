import { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment.development";

export const translateUseCase = async (prompt:string, lang:string) => {

  try {
    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt, lang})
    });
    if( !resp.ok ) throw new Error('No se pudo realizar la traduccion');

    const { content } = await resp.json() as TranslateResponse;

    return {
      ok: true,
      message: content
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo realizar la traduccion'
    }
  }
}

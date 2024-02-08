 import { Injectable } from '@angular/core';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { audioToTextUseCase, imageGenerationUseCase, orthographyUseCAse, textToAudioUseCase } from 'app/core';
import { from } from 'rxjs';
import { translateUseCase } from '@use-cases/translate/translate.use-case';

 @Injectable({providedIn: 'root'})
  export class OpenAiService {
    checkOrthography( prompt:string ) {
      return from(orthographyUseCAse(prompt)) ;
    }

    prosCons( prompt:string ) {
      return from(prosConsUseCase(prompt)) ;
    }

    prosConsStream( prompt:string, abortSignal: AbortSignal ) {
      return prosConsStreamUseCase(prompt, abortSignal);
    }

    translate( prompt: string, lang: string) {
      return from( translateUseCase( prompt, lang));
    }


    textToAudio( prompt: string, voice: string) {
      return from( textToAudioUseCase( prompt, voice));
    }

    audioToText( file: File, prompt?: string) {
      return from( audioToTextUseCase( file, prompt));
    }

    imageGeneration( prompt: string, originalImage?: string, maskImage?: string) {
      return from( imageGenerationUseCase(prompt, originalImage, maskImage))
    }
  }

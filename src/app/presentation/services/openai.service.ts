 import { Injectable } from '@angular/core';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { orthographyUseCAse } from 'app/core';
import { from } from 'rxjs';

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
 }

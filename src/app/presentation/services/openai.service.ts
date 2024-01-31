 import { Injectable } from '@angular/core';
import { orthographyUseCAse } from 'app/core';
import { from } from 'rxjs';

 @Injectable({providedIn: 'root'})
  export class OpenAiService {
    checkOrthography( prompt:string ) {
      return from(orthographyUseCAse(prompt)) ;
    }
 }

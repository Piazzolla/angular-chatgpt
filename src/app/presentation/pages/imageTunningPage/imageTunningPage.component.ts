import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { GptMessageEditableImageComponent } from "../../components/chat-bubbles/gptMessageEditableImage/gptMessageEditableImage.component";

@Component({
    selector: 'app-image-generation-page',
    standalone: true,
    templateUrl: './imageTunningPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        GptMessageEditableImageComponent
    ]
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([
    //para no estar generando todo el tiempo imagenes
    {
      isGpt: true,
      text: 'dummy image',
      imageInfo: {
        alt: 'dummy image',
        url: 'http://localhost:3000/gpt/image/1707419659130'
      }
    }
  ]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string|undefined>(undefined);
  public maskImage = signal<string|undefined>(undefined);


  handleMessage(prompt: string) {

    this.isLoading.set(true);
    this.messages.update(prev => [...prev, { isGpt: false, text: prompt }]);

    this.openAiService.imageGeneration(prompt, this.originalImage(), this.maskImage()).subscribe(resp => {

      this.isLoading.set(false);
      if (!resp) return;

      this.messages.update(prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp
        }
      ]);
    })
  }

  handleImageChange(newImage: string, originalImage: string){
    this.originalImage.set(originalImage);
    //TODO: mask
    this.maskImage.set(newImage);
    //console.log({newImage, originalImage})


  }


  generateVariation(){
    this.isLoading.set(true);
    //console.log(this.originalImage());
    this.openAiService.imageVariation(this.originalImage()!).subscribe( resp => {

      this.isLoading.set(false);
      if (!resp) return;

      //console.log(resp);
      this.messages.update( prev => [...prev,
        {
          isGpt: true,
          imageInfo: resp,
          text: resp?.alt
        }

      ])
    })

  }


}

//http://localhost:3000/gpt/image/1707415903714


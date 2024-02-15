import { environment } from "environments/environment.development";

export const createThreadUseCase = async() => {
  try {
    console.log('fetch');
    const resp = await fetch(`${environment.assistantApi}/create-thread`, {
      method: 'POST'
    });

    const { id } = await resp.json() as { id: string};

    return id;

  } catch (error) {
    throw new Error('Error creating thread ID');

  }
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";

export class RestClient {
  private base = API_BASE_URL;
  private static instance: RestClient;

  constructor() {
    if (!RestClient.instance) {
      RestClient.instance = this;
    }
    return RestClient.instance;
  }

  async get<ResponseType>(url: string, options?: RequestInit) {
    const response = await fetch(`${this.base}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      ...options,
    });

    const responseData: ResponseType = await response.json();

    return {
      responseData,
      fetchResponse: response,
    };
  }
}

export const restClient = new RestClient();

import PlutoAxios from "./pluto";
import Axios, { AxiosResponse, Canceler, CancelToken } from "axios";
import { SuggestionKeyword } from "../model/suggestion";
import { CompletionKeyword } from "../components/home/records";

const CancelToken = Axios.CancelToken;
let cancel: Canceler | null = null;

class CompletionAPI extends PlutoAxios {
  public async getSuggestionKeyword(query: string, cancelToken: CancelToken): Promise<SuggestionKeyword> {
    const rawResponse: AxiosResponse = await this.get(`/suggest`, {
      params: {
        q: query,
      },
      cancelToken,
    });

    const keyword: SuggestionKeyword = rawResponse.data.data;

    return keyword;
  }

  public async getKeywordCompletion(query: string) {
    if (!!cancel) {
      cancel();
    }

    const getCompleteKeywordResponse: AxiosResponse = await this.get("/complete", {
      params: {
        q: query,
      },
      cancelToken: new CancelToken(function executor(c: Canceler) {
        cancel = c;
      }),
    });

    const completionKeywords: CompletionKeyword[] = getCompleteKeywordResponse.data.data;

    cancel = null;

    return completionKeywords;
  }
}

const completionAPI = new CompletionAPI();

export default completionAPI;

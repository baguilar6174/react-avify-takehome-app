export interface APIError<Data = Record<string, string>> {
	// TODO: validate api error type
	code: string | undefined;
	message: string;
	data: Data;
}

export interface GenerationData {
  data: Data;
}

export interface Data {
  from:          string;
  to:            string;
  generationmix: Generationmix[];
}

export interface Generationmix {
  fuel: string;
  perc: number;
}


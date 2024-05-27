import { AxiosError } from 'axios';
import { API } from '../lib/api';
import { type GenerationData } from '../types';

export class GenerationService {
	static fetchData = async (): Promise<GenerationData> => {
		try {
			const { data } = await API.get<GenerationData>('/generation');
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			}
			console.log(error);
			throw new Error('Service error get');
		}
	};
}

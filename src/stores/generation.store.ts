import { type StateCreator, create } from 'zustand';
import { type APIError, type GenerationData } from '../types';
import { devtools } from 'zustand/middleware';
import { GenerationService } from '../services/generation.service';

interface State {
	generationdata?: GenerationData;
	isLoading: boolean;
	error?: APIError;
}

interface Actions {
	fetchGenerationData: () => Promise<void>;
}

type Store = State & Actions;

const generationAPI: StateCreator<Store> = (set, get) => ({
	generationdata: undefined,
	isLoading: false,
	fetchGenerationData: async () => {
		const state = get();
		set({ ...state, isLoading: true });
		try {
			const { data } = await GenerationService.fetchData();
			set({ isLoading: false, generationdata: { data } });
		} catch (error) {
			// TODO: errors control
			set({ isLoading: false, generationdata: undefined, error: { code: 'dfdfd', data: { error: 'F' }, message: 'Errr' } });
		}
	}
});

export const useGenerationDataStore = create<Store>()(devtools(generationAPI));

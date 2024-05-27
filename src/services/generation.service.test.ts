import { AxiosError } from 'axios';
import { API } from '../lib/api';
import { GenerationService } from './generation.service';
import { type GenerationData } from '../types';

// Mock del módulo API
jest.mock('../lib/api');

describe('tests in generation.service.ts', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchData must return the data when the request is successful.', async () => {
        const mockData: GenerationData = {
            data: {
                from: '2019-08-12T12:30Z',
                to: '2019-08-12T13:00Z',
                generationmix: [
                    {
                        fuel: 'biomass',
                        perc: 4.8
                    },
                    {
                        fuel: 'coal',
                        perc: 2.5
                    },
                    {
                        fuel: 'imports',
                        perc: 8.7
                    },
                    {
                        fuel: 'gas',
                        perc: 46.5
                    },
                    {
                        fuel: 'nuclear',
                        perc: 16.1                        
                    }
                ]
            }
        };
        (API.get as jest.Mock).mockResolvedValue({ data: mockData });
        const result = await GenerationService.fetchData();
        expect(result).toEqual(mockData);
        expect(API.get).toHaveBeenCalledWith('/generation');
    });

    test('fetchData should log an error and throw an exception when an Axios error occurs.', async () => {
        const mockError = new AxiosError('Request failed');
        mockError.response = { data: 'Error data' } as any;
        (API.get as jest.Mock).mockRejectedValue(mockError);
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await expect(GenerationService.fetchData()).rejects.toThrow('Service error get');
        expect(consoleLogSpy).toHaveBeenCalledWith('Error data');
        expect(API.get).toHaveBeenCalledWith('/generation');
        consoleLogSpy.mockRestore();
    });

    test('fetchData must throw a generic exception when a non-Axios error occurs.', async () => {
        (API.get as jest.Mock).mockRejectedValue(new Error('Generic error'));
        await expect(GenerationService.fetchData()).rejects.toThrow('Service error get');
        expect(API.get).toHaveBeenCalledWith('/generation');
    });
});

import {IAggregation} from '@/types/Aggregation';

export interface Paginated<T> {
    aggregations: IAggregation;
    currentPage: number;
    hits: T[];
    total: number;
}

export interface Params {
    f?: Record<string, string[]>;
    pagenum?: number;
    perpage?: number;
    q?: string;
}

export default abstract class Service<C = never> {
    /**
     * The endpoint that is used to make HTTP requests.
     */
    abstract endpoint: string;

    /**
     * Casts the given data to a desired result.
     */
    cast(data: never): C {
        return data;
    }

    /**
     * Retrieves multiple resources.
     */
    async get(params: Params, method: string = 'GET'): Promise<Paginated<C>> {
        const response = await useFetch(
            this.endpoint,
            {
                baseURL: useRuntimeConfig().public.apiEndpoint,
                method,
                body: params,
            },
        );

        // Get the main body from the response to extract the data.
        const {aggregations, hits: result} = response.data.value;

        // Convert the returned hits to class instances.
        const hits = result.hits.map(item => this.cast(item));

        return {
            aggregations,
            currentPage: params.pagenum || 1,
            hits,
            total: result.total,
        } as Paginated<C>;
    }
}

import {IAggregation} from '@/types/Aggregation';

export interface Paginated<T> {
    aggregations: IAggregation;
    currentPage: number;
    totalPages: number;
    hits: T[];
    total: number;
}

export interface Params {
    aggs?: boolean;
    f?: Record<string, string[]>;
    pagenum?: number;
    perpage?: number;
    q?: string;
}

export default abstract class Service<C = any> {
    /**
     * The endpoint that is used to make HTTP requests.
     */
    abstract endpoint: string;

    /**
     * Casts the given data to a desired result.
     */
    cast(data: any): C {
        return data;
    }

    /**
     * Retrieves multiple resources.
     * Assignment note: normally a function called 'get' would also use the 'GET' request method
     * but for this use case we only need to make 1 request which happens to be a 'POST' but still
     * acts as a 'GET' request. For more info, see 'assignment-feedback.md'.
     */
    async get(params: Params, method: string = 'POST'): Promise<Paginated<C>> {
        const response = await useFetch(
            this.endpoint,
            {
                baseURL: useRuntimeConfig().public.apiEndpoint,
                method,
                body: params,
                watch: false,
            },
        );

        // Get the main body from the response to extract the data.
        const {aggregations, hits: result} = response.data.value;

        // Convert the returned hits to class instances.
        const hits = result.hits.map(item => this.cast(item));

        // Calculate the total pages (10 is the default page size).
        const totalPages = Math.ceil(result.total / (params.perpage || 10));

        return {
            aggregations,
            currentPage: params.pagenum || 1,
            totalPages,
            hits,
            total: result.total,
        } as Paginated<C>;
    }
}

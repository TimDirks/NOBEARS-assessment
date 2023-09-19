import Service, {Params} from '@/services/Service';
import {ref, watch} from 'vue';

const defaultPaginated = {
    aggregations: {},
    currentPage: 0,
    totalPages: 0,
    hits: [],
    total: 0,
};

const defaultParams = {
    aggs: true,
    pagenum: 1,
    perpage: 10,
    f: {},
    q: '',
};

/**
 * The usePaginate composable can be seen as a wrapper around the normal 'get' function from the useService composable.
 * This composable adds pagination features by keeping track of which page should be fetched, how many hits per page
 * and returns the hits of the current page.
 * It does this by calling the normal 'get' function with added parameters to get the desired result.
 *
 * @param service
 * @param customParams
 */
const usePaginate = <S extends Service>(service: S, customParams: Params = {}) => {
    const {result: paginated, run, state} = useService(service, 'get');

    paginated.value = structuredClone(defaultPaginated) as Awaited<ReturnType<S['get']>>;

    const params = ref<Params>({
        ...defaultParams,
        ...structuredClone(customParams),
    });

    // Reset the pagination values to their default.
    const clear = (clearAggregations: boolean = false) => {
        paginated.value = clearAggregations
            ? structuredClone(defaultPaginated)
            : {
                ...structuredClone(defaultPaginated),
                aggregations: paginated.value.aggregations,
            };

        params.value.pagenum = 1;
    };

    // Go to a specific page number.
    const goToPage = (page: number) => {
        if (page < 0) {
            return;
        }

        params.value.pagenum = page;

        return run(params.value);
    };

    // Go to the previous page.
    const prevPage = () => {
        // Don't try to go to an out-of-range page
        if (params.value.pagenum < 1) {
            return;
        }

        goToPage(params.value.pagenum - 1);
    };

    // Go to the next page.
    const nextPage = () => {
        goToPage(params.value.pagenum + 1);
    };

    // Function to basically return all the pagination variables to their default.
    const refresh = (clearAggregations: boolean = false) => {
        clear(clearAggregations);

        Object.keys(state)
            .forEach(k => state[k] = false);

        return goToPage(1);
    };

    // Function to return all the pagination variables to their default.
    const reset = () => {
        params.value = structuredClone(defaultParams);

        refresh(true);
    };

    // Whenever any of the filters change, the pagination needs to be triggered again with clean values.
    watch(
        () => params.value.f,
        () => {
            refresh();
        },
        {
            deep: true,
        },
    );

    watch(
        () => params.value.q,
        () => {
            refresh(true);
        },
    );

    return {
        clear,
        goToPage,
        nextPage,
        paginated,
        params,
        prevPage,
        refresh,
        reset,
        state,
        run,
    };
};

export default usePaginate;

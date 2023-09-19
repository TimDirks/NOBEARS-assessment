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
    pagenum: 1,
    perpage: 10,
    f: {},
    q: '',
};

const usePaginate = <S extends Service>(service: S, customParams: Params = {}) => {
    const {result: paginated, run, state} = useService(service, 'get');

    paginated.value = structuredClone(defaultPaginated) as Awaited<ReturnType<S['get']>>;

    const items = ref<Awaited<ReturnType<S['get']>>['hits']>([] as Awaited<ReturnType<S['get']>>['hits']);

    const params = ref<Params>({
        ...defaultParams,
        ...structuredClone(customParams),
    });

    const clear = () => {
        items.value = [];

        paginated.value = structuredClone(defaultPaginated);

        params.value.pagenum = 0;
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

    const refresh = () => {
        clear();

        Object.keys(state)
            .forEach(k => state[k] = false);

        return nextPage();
    };

    watch(
        () => params.value.f,
        refresh,
        {
            deep: true,
        },
    );

    watch(
        () => params.value.q,
        refresh,
    );

    watch(
        () => paginated.value?.hits,
        (hits) => {
            items.value = [
                ...items.value,
                ...hits,
            ];
        },
    );

    return {
        clear,
        goToPage,
        items,
        nextPage,
        paginated,
        params,
        prevPage,
        refresh,
        state,
        run,
    };
};

export default usePaginate;

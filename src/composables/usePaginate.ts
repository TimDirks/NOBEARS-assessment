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

    paginated.value = defaultPaginated as Awaited<ReturnType<S['get']>>;
    // paginated.value = structuredClone(defaultPaginated) as Awaited<ReturnType<S['get']>>;

    const items = ref<Awaited<ReturnType<S['get']>>['hits']>([] as Awaited<ReturnType<S['get']>>['hits']);

    const params = ref<Params>({
        ...defaultParams,
        ...customParams,
        // ...structuredClone(customParams),
    });

    const clear = () => {
        items.value = [];

        paginated.value = defaultPaginated;
        // paginated.value = structuredClone(defaultPaginated);

        params.value.pagenum = 0;
    };

    const paginate = () => {
        params.value.pagenum++;

        return run(params.value);
    };

    const refresh = () => {
        clear();

        Object.keys(state)
            .forEach(k => state[k] = false);

        return paginate();
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
            console.log('Truiggers');
            items.value = [
                ...items.value,
                // ...structuredClone(items.value),
                ...hits,
                // ...structuredClone(hits),
            ];
        },
    );

    return {
        clear,
        items,
        paginate,
        paginated,
        params,
        refresh,
        state,
        run,
    };
};

export default usePaginate;

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

        params.value.currentPage = 0;
    };

    const paginate = () => {
        params.value.currentPage++;

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
            items.value = [
                ...structuredClone(items.value),
                ...structuredClone(hits),
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
    };
};

export default usePaginate;

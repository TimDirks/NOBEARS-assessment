import {ref} from 'vue';

const useService = <
    S extends Record<string, never>,
    M extends keyof S,
    >(service: S, method: M) => {
    const state = reactive({
        error: false,
        loading: false,
        success: false,
    });

    const result = ref<Awaited<ReturnType<S[M]>>>();

    const run = async(...args: never[]): Promise<Awaited<ReturnType<S[M]>>> => {
        state.error = false;

        state.loading = true;

        state.success = false;

        try {
            result.value = await service[method](...args);

            state.success = true;

            return result.value;
        } catch (e) {
            state.error = true;

            throw e;
        } finally {
            state.loading = false;
        }
    };

    return {
        result,
        run,
        state,
    };
};

export default useService;

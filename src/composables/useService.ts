import {reactive, ref} from 'vue';

/**
 * The useService composable can be seen as a wrapper around the normal Service HTTP functions.
 * This composable exposes more information about the request, e.g. whether it's loading, errored or succeeded.
 * Assignment note: This might seem overkill for this use case as a Service currently only has 1 HTTP function
 * but this enables us to easily expand on that, creating more HTTP functions which should all work with this
 * composable out of the box.
 *
 * @param service
 * @param method
 */
const useService = <
    S extends Record<string, never>,
    M extends keyof S,
    >(service: S, method: M) => {
    // Create a state object which can be used in the UI to show the request states.
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

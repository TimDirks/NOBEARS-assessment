// Helper function to transform the Paginate Params to the route query.
const setRouteQueryParams = ({q, f}) => {
    const router = useRouter();

    const created = new URLSearchParams({q, ...f});
    console.log(created.toString());

    // Loop over the filter object and transform the keys to separate object properties.
    const filterOptions = Object.keys(f)
        .filter(key => f[key].length)
        .reduce((acc, key) => ({
            ...acc,
            [key]: f[key].join(),
        }), {});

    const query = {
        ...(!!q) && {q},
        ...filterOptions,
    };

    // Replace the router query with the newly created query params.
    router.replace({
        query,
    });
};

export default setRouteQueryParams;

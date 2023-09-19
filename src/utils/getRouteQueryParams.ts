// Helper function to extract the Paginate Params from the route query.
const getRouteQueryParams = () => {
    const routeQuery = useRoute().query;

    // Get the search value and put the remainder in a filters object.
    const {q, ...filterOptions} = routeQuery;

    // Loop over the filter options and split the values to form an array.
    const preppedFilterOptions = Object.entries(filterOptions)
        .reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value.split(','),
        }), {});

    return {
        ...(!!q) && {q},
        ...(Object.keys(preppedFilterOptions).length) && {f: preppedFilterOptions},
    };
};

export default getRouteQueryParams;

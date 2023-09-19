# Thoughts about the assignment

During the development of this assignment I've had some thoughts about the entire setup and structure of the project.
In this document I wanted to write down some points I'd bring up with the Project Team/Project Owner had this been an actual project for a client.

Please do take these thoughts with a grain of salt, I wasn't there when some of these decisions were made so there might be valid arguments why certain features are the way they are.

## The API setup

There are a couple of things I'd propose to change on the API side, some small and some big.

### Using a `POST` to fetch Jobs

I've always been a big fan of using the HTTP methods for what they are most likely used. In this assignment I need to call a `POST` request to fetch items whilst this usually gets done in a `GET`.
I could understand that the filter object is quite big which may look more readable in a `POST` body than as `GET` query parameters, still I would prefer the use of `GET` instead.

### Aggregations ambiguity

In the response body of `POST /jobs` the filters are returned in the `aggregations` object as `<filterName>: <filterObject>`.
I believe this would be more suitable as an array of filter objects. An array would allow easier looping over the filters and it's much less overhead should a filter get added/removed.
If I want to fetch the filters now, I have to either predefine what keys to look for in the `aggregations` or use an ambiguous `[key: string]: <filterObject>` property to still allow flexible adding/removing filters.

Furthermore, the `aggregations` don't keep their order as soon as you make the `POST` request with passed filters. This results in the UI having to order the different filter options which should've been something the API handled in my opinion.

### Missing pagination information

When the jobs are fetched, in the body query we can supply pagination details to get a specific selection of jobs.
Whilst the API does return how many total jobs match the search query, it's never returned how many pages this would equal or even on what page the user currently is.
This means the UI has to keep track of these details and continually has to calculate how many pages the result list has.

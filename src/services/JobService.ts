interface JobData {
    hits: Record<string, never>;
}

class Job {
    endpoint = 'jobs';

    async fetch(): Promise<Job> {
        return await useFetch(
            this.endpoint,
            {
                baseURL: useRuntimeConfig().apiEndpoint,
                body: {},
                method: 'POST',
            },
        );
    }
}

export {Job, JobData};

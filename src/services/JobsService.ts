import Service from '@/services/Service';

interface LocationData {
    text: string;
    place: string;
    province: string;
}

interface JobData {
    slug: string;
    label?: string;
    title: string;
    subtitle: string;
    location: LocationData;
    intro: string;
    sector: string[];
    category: string[];
}

class Job implements JobData {
    category: string[];
    intro: string;
    location: LocationData;
    sector: string[];
    slug: string;
    subtitle: string;
    title: string;

    constructor(data?: JobData) {
        if (!data) {
            return;
        }

        Object.assign(this, data);
    }
}

class JobsService extends Service<Job> {
    endpoint = 'jobs';

    cast(data: never): Job {
        const {_source: source} = data;

        if (!source || !source.website) {
            return;
        }

        return new Job(source.website);
    }
}

export {
    Job,
    JobData,
    JobsService,
};

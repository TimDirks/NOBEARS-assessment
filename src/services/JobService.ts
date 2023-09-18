import Service from '@/services/Service';

interface LocationData {
    text: string;
    place: string;
    province: string;
}

interface JobData {
    label?: string;
    title: string;
    subtitle: string;
    location: LocationData;
    intro: string;
    sector: string[];
    category: string[];
}

class Job extends Service<JobData> {
    endpoint = 'jobs';
}

export {Job, JobData};

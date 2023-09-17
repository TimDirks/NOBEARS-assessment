import {Bucket} from './BucketService';

interface MetaData {
    label: string;
    label_singular: string;
    pname: string;
}

interface FilterData {
    name?: string;
    meta: MetaData;
    buckets: Bucket[];
}

class Filter {
    name?: string;
    meta: MetaData;
    buckets: Bucket[];
}

export {Filter, FilterData};

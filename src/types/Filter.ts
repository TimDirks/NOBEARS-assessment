interface IMeta {
    label: string;
    label_singular: string;
    pname: string;
}

interface IBucket {
    doc_count: number;
    key: string;
    position?: number;
}

interface IFilter {
    meta: IMeta;
    buckets: IBucket[];
}

export {
    IBucket,
    IFilter,
};

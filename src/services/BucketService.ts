interface BucketData {
    doc_count: number;
    key: string;
    position: number;
}

interface Bucket extends BucketData {}

export {Bucket, BucketData};

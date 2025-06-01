export type FilterType = "contains" | "equals";

export type Filter = {
    key: string;
    value: string | number;
    type: FilterType;
};

export type PaginatedMetadata = {
    total: number;
    limit: number;
    page: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type PaginatedResponse<T> = {
    data: T[];
    meta: PaginatedMetadata;
}

export type PaginationRequest = {
    page: number;
    limit: number;
    filters?: Filter[];
}
interface PaginationParam {
    _limit: number;
    _page: number;
    _total: number;
}

export interface IDDetail {
    _id?: string;
}

export interface ListResponse<T> {
    payload: T[];
    paginate: PaginationParam;
    status: number;
}

export interface Response<T> {
    payload: T;
    status: number;
}

// export interface DetailResponse<T> {
//     payload: T;
//     status: number;
// }
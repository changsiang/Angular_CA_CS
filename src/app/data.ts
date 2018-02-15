import { Result } from "./result";
import { Pagination } from "./pagination";

export interface Data{
    data: Result[];
    pagination: Pagination;
}
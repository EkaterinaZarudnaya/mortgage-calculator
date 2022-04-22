import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface BanksItem {
  name: string;
  id: number;
  rate: number;
  maxloan: number;
  minpay: number;
  term: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: BanksItem[] = [
  {id: 1, name: 'Bank1', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 2, name: 'Bank2', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 3, name: 'Bank3', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 4, name: 'Bank4', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 5, name: 'Bank5', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 6, name: 'Bank1', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 7, name: 'Bank2', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 8, name: 'Bank3', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 9, name: 'Bank4', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 10, name: 'Bank5', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 11, name: 'Bank1', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 12, name: 'Bank2', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 13, name: 'Bank3', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 14, name: 'Bank4', rate: 15, maxloan: 200000, minpay:1000, term:24},
  {id: 15, name: 'Bank5', rate: 15, maxloan: 200000, minpay:1000, term:24},
];

/**
 * Data source for the Banks view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BanksDataSource extends DataSource<BanksItem> {
  data: BanksItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BanksItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BanksItem[]): BanksItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BanksItem[]): BanksItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

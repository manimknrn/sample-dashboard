import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralTableComponent } from '../shared/components/general-table/general-table.component';
import { TableColumn } from '../shared/models/table.column';
import { TableBtn } from '../shared/models/table-button';
import { TradeService } from '../../services/trade.service';
import { Trade } from '../shared/models/trade.model';
import { TradeSettlementService } from '../../services/trade-settlement.service';

@Component({
  selector: 'app-manage-trades',
  templateUrl: './manage-trades.component.html',
  styleUrls: ['./manage-trades.component.scss'],
  imports: [MatTableModule, GeneralTableComponent, FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  providers: [
    TradeService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageTradesComponent implements OnInit {
  data!: Trade[]
  pageList = {
    currentPage: 0,
    pageSize: 10
  };
  currentPage = 0;
  totalDataCount = 0;
  sortColumn = '';
  sortDirection = 'asc';
  columns!: TableColumn[];
  buttons!: TableBtn[];
  actionHeader: string = '';
  filterPlaceholder: string = '';
  dataSource = [];
  settlementService = inject(TradeSettlementService)

  constructor(private tradeService: TradeService, public dialog: MatDialog, readonly router: Router) {
    this.columns = [
      { columnDef: 'id', header: 'ID', cell: (element: Trade) => `${element.id}` },
      { columnDef: 'stockSymbol', header: 'Stock Symbol', cell: (element: Trade) => `${element.stockSymbol}` },
      { columnDef: 'quantity', header: 'Quantity', cell: (element: Trade) => `${element.quantity}` },
      { columnDef: 'price', header: 'Price', cell: (element: Trade) => `${element.price}` },
      { columnDef: 'notes', header: 'Comments', cell: (element: Trade) => `${element.notes}` },
      { columnDef: 'settlementDate', header: 'Settlement Date', cell: (element: Trade) => `${element.settlementDate}` },
      { columnDef: 'paymentMethod', header: 'Payment Method', cell: (element: Trade) => `${element.paymentMethod}` },
      { columnDef: 'transactionFee', header: 'Transaction Fee', cell: (element: Trade) => `${element.transactionFee}` }
    ];

    this.buttons = [
      { styleClass: 'submit', icon: 'edit', payload: (element: Trade) => `${element.id}`, action: 'edit', tooltip: 'Edit', enable: true },
      { styleClass: 'submit', icon: 'delete', payload: (element: Trade) => `${element.id}`, action: 'delete', tooltip: 'Delete', enable: true },
    ]

    this.actionHeader = 'New Trade';
  }

  ngOnInit() {
    this.render(this.pageList, ''); // Await the call if needed
  }

  render(value: any, searchFilter?: string) {
    const localStorageData: any = localStorage.getItem('tradeSettlementData');
    if (localStorageData?.length > 0) {
      this.data = JSON.parse(localStorageData);
      this.totalDataCount = this.data.length;
    } else {
      this.tradeService.getTrades().subscribe((res: any) => {
        this.data = !!res ? res : [];
        localStorage.setItem('tradeSettlementData', JSON.stringify(this.data));
        this.totalDataCount = res.length;
      });
    }

    if(this.data.length === 0) {
      this.data = JSON.parse(localStorageData);
      this.totalDataCount = this.data.length;
    }
  }


  loadData(value: any) {
    let val = {
      currentPage: value.currentPage,
      pageSize: value.pageSize
    }
    this.pageList.pageSize = value.pageSize;
    this.render(val, '')
  }

  buttonClick(result: string[]) {
    if (result[0] == 'delete') {
      this.deleteTrade(+result[1]);
    } else if (result[0] == 'edit') {
      this.editTrade(+result[1]);
    }
  }


  deleteTrade(id: number): void {
    window.alert('Are you sure, You want to delete this record!');
    let existingData = this.data;
    existingData = existingData.filter((item: Trade) => Number(item.id) !== id); // Remove the entry with the given id
    this.data = existingData;
    this.totalDataCount = existingData.length;
    localStorage.setItem('tradeSettlementData', JSON.stringify(existingData));
    this.tradeService.deleteTrade(id).subscribe((res: any) => {
      this.render('');
    })
  }

  editTrade(id: number): void {
    this.tradeService.getTradeById(id).subscribe((res: any) => {
      this.router.navigate(['/trade-settle'], { state: { data: res } });
    })
  }

  actionFeature(event: any) {
    this.router.navigateByUrl('/trade-settle');
  }
}

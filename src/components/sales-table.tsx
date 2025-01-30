"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, ClipboardCopy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const data: Venda[] = [
  {
    id: "m5gr84i9",
    total: 3160,
    status: "concluída",
    cliente: "ken99@yahoo.com",
    data: "2023-06-01",
    itens: 5,
  },
  {
    id: "3u1reuv4",
    total: 242,
    status: "concluída",
    cliente: "Abe45@gmail.com",
    data: "2023-06-02",
    itens: 3,
  },
  {
    id: "derv1ws0",
    total: 837,
    status: "processando",
    cliente: "Monserrat44@gmail.com",
    data: "2023-06-03",
    itens: 7,
  },
  {
    id: "5kma53ae",
    total: 874,
    status: "concluída",
    cliente: "Silas22@gmail.com",
    data: "2023-06-04",
    itens: 4,
  },
  {
    id: "bhqecj4p",
    total: 721,
    status: "falhou",
    cliente: "carmella@hotmail.com",
    data: "2023-06-05",
    itens: 6,
  },
]

export type Venda = {
  id: string
  total: number
  status: "pendente" | "processando" | "concluída" | "falhou"
  cliente: string
  data: string
  itens: number
}

const columns: ColumnDef<Venda>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID da Venda",
    cell: ({ row }) => <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={() => navigator.clipboard.writeText(row.original.id)}>
              <ClipboardCopy size={20} className="text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <span className="whitespace-nowrap text-muted-foreground font-bold">
            {row.getValue("id")}
          </span>
          <TooltipContent>
            <p>Copiar ID da Venda</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className={clsx(
        row.original.status === 'concluída' && 'text-green-400 bg-green-400/10 ring-green-500/50',
        row.original.status === 'processando' && 'text-yellow-400 bg-yellow-400/10 ring-yellow-500/50',
        row.original.status === 'pendente' && 'text-blue-400 bg-blue-400/10 ring-blue-500/50',
        row.original.status === 'falhou' && 'text-red-400 bg-red-400/10 ring-red-500/50',
        'whitespace-nowrap order-first flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset sm:order-none'
      )}>
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: () => "Total",
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"))

      // Formatar o total como valor em real
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(total)

      return <div className="font-medium whitespace-nowrap">{formatted}</div>
    },
  },
  {
    accessorKey: "itens",
    header: "Itens",
    cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("itens")}</div>,
  },
  {
    accessorKey: "cliente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase whitespace-nowrap">{row.getValue("cliente")}</div>,
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("data")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>Ver cliente</DropdownMenuItem>
            <DropdownMenuItem>Ver detalhes da venda</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function SalesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Pesquisar ID da Venda..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className="rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}

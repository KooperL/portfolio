//  // @ts-nocheck

// import React from 'react';
// import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
// import { DateTime } from 'luxon';
// import uidResolve from '../utils/uidResolve';
// import Users from '../Users';
// import {Link} from "react-router-dom";
// import Modal from './ModalOld/Modal';

// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length
//   const [value, setValue] = React.useState(globalFilter)
//   const onChange = useAsyncDebounce(value => {
//     setGlobalFilter(value || undefined)
//   }, 200)

//   return (
//     <div className='flex flex-row'>
//       <div className='px-2 rounded bg-gray-200'>
//         Search:{' '}
//       </div>
//       <div className='w-full pl-3 '>
//         <input
//           className='w-full'
//           value={value || ""}
//           onChange={e => {
//             setValue(e.target.value);
//             onChange(e.target.value);
//           }}
//           placeholder={`${count} records...`}
//           style={{
//             fontSize: '1.1rem',
//             border: '0',
//           }}
//         />
//       </div>
//     </div>
//   )
// }

// function DefaultColumnFilter({
//   column: { filterValue, preFilteredRows, setFilter },
// }) {
//   const count = preFilteredRows.length

//   return (
//     <input
//       value={filterValue || ''}
//       onChange={e => {
//         setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   )
// }

// // function fuzzyTextFilterFn(rows, id, filterValue) {
// //   return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
// // }
// // fuzzyTextFilterFn.autoRemove = val => !val

// function Table(props) {
//   // const filterTypes = React.useMemo(
//   //   () => ({
//   //     // Add a new fuzzyTextFilterFn filter type.
//   //     fuzzyText: fuzzyTextFilterFn,
//   //     // Or, override the default text filter to use
//   //     // "startWith"
//   //     text: (rows, id, filterValue) => {
//   //       return rows.filter(row => {
//   //         const rowValue = row.values[id]
//   //         return rowValue !== undefined
//   //           ? String(rowValue)
//   //               .toLowerCase()
//   //               .startsWith(String(filterValue).toLowerCase())
//   //           : true
//   //       })
//   //     },
//   //   }),
//   //   []
//   // )

//   const defaultColumn = React.useMemo(
//     () => ({
//       // Let's set up our default Filter UI
//       Filter: DefaultColumnFilter,
//     }),
//     []
//   )
//   // let data = React.useMemo(() => [
//   //   {
//   //     col1: 'aasdasd',
//   //     col2: 'World',
//   //   },
//   //   {
//   //     col1: 'react-table',
//   //     col2: 'rocks',
//   //   },
//   //   {
//   //     col1: 'whatever',
//   //     col2: 'you want',
//   //   },
//   // ], []);
//   let data = props.data;

//   let columns = React.useMemo(() => [
//     {
//       Header: 'Column 1',
//       accessor: 'col1', // accessor is the "key" in the data
//     },
//     {
//       Header: 'Column 2',
//       accessor: 'col2',
//     },
//   ], [])
//   columns = props.columns;
//   // console.log(data)

//   const tableInstance = useTable(
//     { columns,
//       data,
//       initialState: {
//         sortBy: [
//           {
//             id: 'col2',
//             desc: true
//           }
//         ]
//       },
//       defaultColumn, // Be sure to pass the defaultColumn option
//       // filterTypes,
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//   );
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state,
//     visibleColumns,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//   } = tableInstance;
//   return (
//     <div className="outline-1 outline rounded-b-lg w-5/6 shadow-2xl">
//       <GlobalFilter
//         preGlobalFilteredRows={preGlobalFilteredRows}
//         globalFilter={state.globalFilter}
//         setGlobalFilter={setGlobalFilter}
//       />
//       <table {...getTableProps()} className="w-full">
//         <thead className="bg-gray-900 text-white" >
//           {// Loop over the header rows
//           headerGroups.map(headerGroup => (
//             // Apply the header row props
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {// Loop over the headers in each row
//               headerGroup.headers.map(column => (
//                 // Apply the header cell props
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {// Render the header
//                   column.render('Header')}
//                   {column.isSorted ? (column.isSortedDesc ? ' ↓':' ↑'):' ·'}
//                   {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
//                 </th>
//               ))}
//             </tr>
//           ))}
//           <tr>
//             <th
//               colSpan={visibleColumns.length}
//               style={{
//                 textAlign: 'left',
//               }}
//             >
//             </th>
//           </tr>
//         </thead>
//         {/* Apply the table body props */}
//         <tbody {...getTableBodyProps()}>
//           {// Loop over the table rows
//           rows.map((row, idx) => {
//             // Prepare the row for display
//             prepareRow(row)
//             return (
//               // Apply the row props
//               <tr {...row.getRowProps()}
//               className={`${(idx%2==0)?"bg-gray-200":""}`}>
//                 {// Loop over the rows cells
//                 row.cells.map(cell => {
//                   // Apply the cell props
//                   if (cell.column.Header.slice(-2) == '🕙') {
//                     return (
//                       <td className="p-2" {...cell.getCellProps()}>
//                         {// Render the cell contents
//                         DateTime.fromSeconds(Number(cell.value)).toLocaleString(DateTime.DATETIME_MED).split(' ').slice(0,2).join(' ')}
//                       </td>
//                     );
//                   } else if(cell.column.Header.slice(-2) == '👤') {
//                     return (
//                       // uidResolve(cell.value)
//                       <td className="p-2" {...cell.getCellProps()}>
//                         <Link to={{pathname: `/lookup?uid=${cell.value[1]}`, state: {uid:cell.value[1]}}}>
//                           <div className='text-purple-900 p-1 bg-purple-200 rounded text-center'>
//                             {cell.value[0]}
//                             </div>
//                         </Link>
//                       </td>
//                     );
//                   } else if(cell.column.Header.slice(-2) == '🔑') {
//                     return (
//                       // uidResolve(cell.value)
//                       <td className="p-2" {...cell.getCellProps()}>
//                         <span className='text-xs tracking-tighter'>
//                           {cell.value}
//                         </span>
//                       </td>
//                     );
//                   } else if(cell.column.Header.slice(-2) == '👥') {
//                     const textSmall = () => {
//                       return (<div className='w-full bg-purple-400 rounded-lg'>
//                         <div className='p-1 py-2 flex flex-wrap  justify-center items-center flex-shrink-0'>
//                           {cell.value.slice(0, 5).map((link, indexLink) => (
//                             <Link to={{pathname: '/lookup?uid='+link[1], state: {uid:link[1]}}} key={indexLink}>
//                               <div className='link-text text-purple-900 bg-purple-200 rounded text-xs tracking-tighter text-center leading-none p-0.5' key={indexLink} >
//                                 {link[0]}
//                               </div>
//                             </Link>
//                           ))}
//                           </div>
//                           <div className='text-xs'>
//                             {cell.value.length>5?'(...)':''}
//                           </div>
//                         </div>
//                       )
//                     }
//                     const text = () => {
//                       return (
//                         <div className="">
//                         <div className='w-full flex flex-wrap  justify-center items-center flex-shrink-0'>
//                           {cell.value.map((link, indexLink) => (
//                             <Link to={{pathname: `/lookup?uid=${link[1]}`, state: {uid:link[1]}}} key={indexLink}>
//                               <div className="link-text text-purple-900 bg-purple-200 rounded tracking-tighter text-center leading-none p-1" key={indexLink} >
//                                 {link[0]}
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                       )
//                     }
//                     return (
//                       <td className="p-2" {...cell.getCellProps()}>
//                         <Modal
//                         text={text()}
//                         textSmall={textSmall()} />
//                       </td>
//                     );
//                   } else if(cell.column.Header.slice(-2) == '📄') {
//                     return (
//                       <td className="p-2" {...cell.getCellProps()}>
//                         <a href={cell.value[1]} className='text-blue-900 p-1 bg-blue-200 rounded text-xs tracking-tighter'>
//                           {cell.value[0]}
//                         </a>
//                       </td>
//                     );
//                   } else if(cell.column.Header.slice(-2) == '✏️') {
//                     const text = () => {return (
//                       <p className='tracking-tighter leading-5 text-justify'>
//                       {cell.render('Cell')}
//                     </p>
//                     )}
//                     const textSmall = () => {return (
//                       <p className='text-xs tracking-tighter leading-5 text-justify'>
//                       {cell.value.slice(0,100)} {cell.value.length>100?'(...)':''}
//                     </p>
//                     )}
//                     return (
//                       <td className="p-2" {...cell.getCellProps()}>
//                         <Modal
//                         text={text()}
//                         textSmall={textSmall()} />
//                       </td>
//                     );
//                   } else {
//                       return (
//                         <td className="p-2" {...cell.getCellProps()}>
//                           {// Render the cell contents
//                           cell.render('Cell')}
//                         </td>
//                       );
//                     };
//                   })}
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

export default {}

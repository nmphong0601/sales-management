import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from './Index.module.scss';

const PaginationTable = (props) => {
  const {
    columns,
    data,
    totalItems,
    page,
    pageSize,
    onPageChange,
    onRowDelete,
    onRowEdit,
    customActions,
    tableProps,
  } = props;
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = Math.ceil(totalItems / pageSize);
  const CustomActions = customActions;

  const handleClick = (idx) => {
    if (idx >= 1 && idx <= totalPages) {
      setCurrentPage(idx);
      onPageChange && onPageChange(idx);
    }
  };

  const handleEditClick = (id) => {
    onRowEdit && onRowEdit(id);
  };

  const handleDeleteClick = (id) => {
    onRowDelete && onRowDelete(id);
  };

  return (
    <div>
      <table
        className={`${styles['responsive-table']} ${tableProps.className}`}
      >
        <thead className={`${tableProps?.tHead?.className || ''}`}>
          <tr className={`${tableProps?.tHead?.tr?.className || ''}`}>
            <th className={`${tableProps?.tHead?.th?.className || ''}`}>#</th>
            {columns?.map((col, index) => {
              return (
                <th
                  key={index}
                  className={`${tableProps?.tHead?.th?.className || ''}`}
                >
                  {col.title}
                </th>
              );
            })}
            <th className={`${tableProps?.tHead?.th?.className || ''}`}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className={`${tableProps?.tBody?.className || ''}`}>
          {data?.map((element, index) => (
            <tr
              key={index}
              className={`${tableProps?.tBody?.tr?.className || ''}`}
            >
              <th
                scope="row"
                className={`pivoted ${tableProps?.tBody?.td?.className || ''}`}
              >
                <div className="td-before">#</div>
                {index + 1}
              </th>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`pivoted ${
                    tableProps?.tBody?.td?.className || ''
                  }`}
                >
                  <div className="td-before">{col.title}</div>
                  {element[col.field]}
                </td>
              ))}
              <td className={`pivoted`}>
                <div className="td-before">Thao tác</div>
                <div className="flex justify-center">
                  {onRowDelete && (
                    <button
                      onClick={(e) => handleDeleteClick(element?.Id)}
                      title="Xóa"
                      className="inline-flex items-center space-x-1 px-1 h-full w-max"
                    >
                      <MdDelete size={18} className="text-nmp-base" />
                      <span>Xóa</span>
                    </button>
                  )}
                  {onRowEdit && (
                    <button
                      onClick={(e) => handleEditClick(element?.Id)}
                      title="Sửa"
                      className="inline-flex items-center space-x-1 border-l border-l-nmp-white px-1 w-max"
                    >
                      <MdEdit className="text-nmp-base" />
                      <span>Sửa</span>
                    </button>
                  )}
                  {CustomActions && <CustomActions data={element} />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center">
        <div className="cursor-pointer p-2" onClick={(e) => handleClick(1)}>
          Trang đầu
        </div>
        <div
          className="cursor-pointer p-2"
          onClick={(e) => handleClick(currentPage - 1)}
        >
          Trang trước
        </div>
        {[...Array(totalPages)].map((page, idx) => {
          return (
            <div
              key={idx}
              className={`cursor-pointer p-2 ${
                currentPage === idx + 1 ? 'bg-nmp-primary' : ''
              }`}
              onClick={(e) => handleClick(idx + 1)}
            >
              {idx + 1}
            </div>
          );
        })}
        <div
          className="cursor-pointer p-2"
          onClick={(e) => handleClick(currentPage + 1)}
        >
          Trang sau
        </div>
        <div
          className="cursor-pointer p-2"
          onClick={(e) => handleClick(totalPages)}
        >
          Trang cuối
        </div>
      </div>
    </div>
  );
};

PaginationTable.propTypes = {
  tableProps: PropTypes.object,
};

PaginationTable.defaultProps = {
  tableProps: {
    className: '',
    tHead: {
      className: '',
      tr: {
        className: '',
      },
      th: {
        className: '',
      },
    },
    tBody: {
      className: '',
      tr: {
        className: '',
      },
      td: {
        className: '',
      },
    },
  },
};

export default PaginationTable;

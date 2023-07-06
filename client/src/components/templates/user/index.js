import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pagedItems, removeItem } from 'actions/userActions';

import Button from 'components/atoms/Button';
import PaginationTable from 'components/molecules/Table';

const displayColumns = [
  { title: 'Họ và tên', field: 'f_Name' },
  { title: 'Email', field: 'f_Email' },
];

const UserManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pagingInfor = useSelector((state) => state.user.pagingInfor);
  const users = useSelector((state) => state.user.items);

  useEffect(() => {
    dispatch(pagedItems({ page: 1, pageSize: 5 }));
  }, [dispatch]);

  const pageChange = (pageIndex) => {
    dispatch(pagedItems({ ...pagingInfor, page: pageIndex }));
  };

  const addUser = () => {
    navigate('/user/detail/new');
  };

  const editUser = (id) => {
    navigate(`/user/detail/${id}`);
  };

  const removeUser = (id) => {
    dispatch(removeItem(id));
    pageChange(pagingInfor.page);
  };

  return (
    <div>
      <div className="mb-4">
        <Button className="w-max" onClick={(e) => addUser()}>
          Add User
        </Button>
      </div>
      <PaginationTable
        tableProps={{
          className: 'mb-4',
          tHead: {
            th: {
              className: 'text-left last:text-center',
            },
          },
          tBody: {
            tr: {
              className: 'odd:bg-nmp-dark-secondary',
            },
          },
        }}
        columns={displayColumns}
        data={users}
        page={pagingInfor.page}
        pageSize={pagingInfor.pageSize}
        totalItems={pagingInfor.totalItems}
        onPageChange={(pageIndex) => pageChange(pageIndex)}
        onRowDelete={(id) => removeUser(id)}
        onRowEdit={(id) => editUser(id)}
      />
    </div>
  );
};

export default UserManagement;

import { useCallback, useEffect, useMemo, useState } from 'react';
import Table from '../../../components/ui/Table';
import Paginator from '../../../components/ui/Paginator';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';
import { fetchCountData } from '../../../services/filter.service';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import API_BASE_URL from '../../../config';

export default function EmployeeList(props: any) {
  const { departmentId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'phone',
      name: 'Phone',
      sequence: 2,
    },
    {
      id: 'jobTitle',
      name: 'Job Title',
      sequence: 3,
    },
    {
      id: 'status',
      name: 'Status',
      sequence: 4,
    },
    {
      id: 'parent',
      name: 'Supervisor',
      sequence: 5,
    },
  ]);

  const modelName = 'Employee';

  const filterData: FilterRequest = useMemo(() => {
    return {
      modelName,
      filters: [
        {
          logicalOperator: 'AND',
          conditions: [
            {
              field: 'departmentId',
              operator: 'equals',
              values: departmentId,
            },
          ],
        },
      ],
      selectFields: [
        'id',
        'departmentId',
        'name',
        'phone',
        'jobTitle.name',
        'status',
        'parent.img',
        'parent.name',
      ],
      sortField: 'id',
      sortOrder: 'asc',
      page: currentPage,
      perPage: 5,
      groupByField: undefined,
      groupByAggregates: [],
      aggregates: [],
    };
  }, [departmentId, currentPage]);
  const { data, isLoading } = useFilterData(filterData);
  const [totalItems, setTotalItems] = useState(0);

  const handleUpdateCount = useCallback(() => {
    fetchCountData(filterData).then((count: number) => {
      setTotalItems(count);
    });
  }, [filterData]);

  useEffect(() => {
    handleUpdateCount();
  }, [handleUpdateCount]);

  const convertEnumText = (enumText: string): string => {
    const words = enumText.toLowerCase().split('_');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
  };

  const handleStatusBadgeColor = (status: string) => {
    let color = '';
    switch (status) {
      case 'ACTIVE':
        color = 'green';
        break;
      case 'ON_LEAVE':
        color = 'orange';
        break;
      case 'TERMINATED':
        color = 'red';
        break;
      default:
        break;
    }
    return color;
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1>Associated Employees</h1>
      </div>
      <Table
        columns={columns}
        optionalColumns={[]}
        handleColumnChange={() => null}
      >
        {data?.records?.map((item: any, index: number) => (
          <tr
            className="group border-b border-b-gray-200 hover:bg-serene-50"
            key={item.id}
          >
            <td className="py-4 px-6">{index + 1}</td>
            <td className="flex items-center py-4 px-6 whitespace-nowrap">
              <Avatar
                icon={<div>{item.name[0]}</div>}
                src={item.img && API_BASE_URL + item.img}
              />
              <div className="pl-3">
                <div>{item.name}</div>
                <div className="text-gray-500 text-[11px]">{item.email}</div>
              </div>
            </td>
            <td className="py-4 px-6 space-y-1 whitespace-nowrap">
              <div>{item.phone}</div>
            </td>
            <td className="py-4 px-6">{item.jobTitle?.name}</td>
            <td className="py-4 px-6">
              <Badge
                value={convertEnumText(item.status)}
                color={handleStatusBadgeColor(item.status)}
              />
            </td>
            <td className="flex items-center py-4 px-6 whitespace-nowrap">
              <Avatar
                icon={<div>{item.parent?.name[0]}</div>}
                src={item.parent?.img && API_BASE_URL + item.parent.img}
              />
              <div className="pl-3">
                <div>{item.parent?.name}</div>
                <div className="text-gray-500 text-[11px]">
                  {item.parent?.email}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </Table>
      <Paginator
        itemsPerPage={5}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

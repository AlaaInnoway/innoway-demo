import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Select from '../../components/form/Select';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useFilterData from '../../hooks/useFetchData';
import API_BASE_URL from '../../config';
import Paginator from '../../components/ui/Paginator';
import { fetchCountData } from '../../services/filter.service';
import Table from '../../components/ui/Table';
import fetchDataByModel from '../../utils/fetch';
import useDisableFocus from '../../hooks/useDisableFocus';
import exportDataToFile from '../../utils/export';
import Dropdown from '../../components/ui/Dropdown';
import Badge from '../../components/ui/Badge';

export default function SalespersonList() {
  const [openModal, setOpenModal] = useState(false);
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  useDisableFocus(exportMenuRef, setOpenExportMenu);

  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Name',
      sequence: 1,
    },
    {
      id: 'salesTeam',
      name: 'Sales Team',
      sequence: 2,
    },
    {
      id: 'leads',
      name: 'Leads',
      sequence: 3,
    },
    {
      id: 'opportunities',
      name: 'Opportunities',
      sequence: 4,
    },
    {
      id: 'archived',
      name: 'Status',
      sequence: 5,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.id)
  );

  const toggleColumnVisibility = (column: any) => {
    if (columns.some((col) => col.id === column.id)) {
      // If the column is already visible, hide it
      setColumns(columns.filter((col) => col.id !== column.id));
    } else {
      // If the column is not visible, show it and maintain the sequence order
      const updatedVisibleColumns = [...columns];
      updatedVisibleColumns.splice(column.sequence - 1, 0, column);
      setColumns(updatedVisibleColumns);
    }
  };

  useEffect(() => {
    setVisibleColumns(columns.map((col) => col.id));
  }, [columns]);

  const breadcrumbs = [
    {
      name: 'Salesperson',
      path: '/sales/salesperson'
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Name' },
    { id: 'email', name: 'Email' },
    { id: 'salesTeam.name', name: 'Sales Team' },
    { id: 'archived', name: 'Status' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'User',
    filters: [],
    selectFields: [
      'id',
      'name',
      'img',
      'email',
      'salesTeam.name',
      'leads.id',
      'leads.name',
      'opportunities.id',
      'opportunities.name',
      'archived',
    ],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: currentPage,
    perPage: 5,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };
  const { data, isLoading } = useFilterData(filterData);
  const [totalItems, setTotalItems] = useState(0);

  const handleUpdateCount = () => {
    fetchCountData(filterData).then((count: number) => {
      setTotalItems(count); // Update the totalItems state
    });
  };
  useEffect(() => {
    handleUpdateCount();
  });

  const [salesTeams, setSalesTeams] = useState(new Array(0));

  useEffect(() => {
    // get organizations
    fetchDataByModel('SalesTeam').then((result) => {
      setSalesTeams(result?.records);
    });
  }, []);

  const exportRequest: FilterRequest = {
    modelName: 'User',
    filters: [],
    selectFields: ['id', 'name', 'img', 'email', 'salesTeam.name', 'archived'],
    sortField: sortedField.id,
    sortOrder: 'asc',
    page: 1,
    perPage: 1000000,
    groupByField: undefined,
    groupByAggregates: [],
    aggregates: [],
  };

  const exportActionMenus = [
    {
      id: 1,
      name: 'Export to Excel',
      handleClick: () => exportDataToFile(exportRequest, 'xlsx'),
    },
    {
      id: 2,
      name: 'Export to CSV',
      handleClick: () => exportDataToFile(exportRequest, 'csv'),
    },
  ];

  return (
    <Container>
      <ControlPanel>
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          <PrimaryButton onClick={() => setOpenModal(!openModal)}>
            <PlusCircleIcon width={20} height={20} />
            <span>Add</span>
          </PrimaryButton>
          <div ref={exportMenuRef} className="relative">
            <SecondaryButton
              onClick={() => setOpenExportMenu(!openExportMenu)}
            >
              <ArrowDownTrayIcon
                width={20}
                height={20}
                className="text-gray-600"
              />
              <span>Export</span>
              <ChevronDownIcon
                width={12}
                height={12}
                className={`text-current text-gray-600 cursor-pointer duration-700 ${
                  openExportMenu && 'rotate-180'
                }`}
              />
            </SecondaryButton>
            {openExportMenu && (
              <Dropdown items={exportActionMenus} positionRight fullWidth />
            )}
          </div>
        </div>
      </ControlPanel>
      <ControlPanel>
        <div className="flex items-center space-x-4">
          <Select
            openMaxWidth
            customClass="bg-serene-100 text-serene-700 font-medium border-0 space-x-2"
            items={salesTeams}
            value={{ id: 0, name: 'Sales Team' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Name' },
              { id: 2, name: 'Email' },
              { id: 3, name: 'Status' },
            ]}
            value={{ id: 0, name: 'More' }}
            handleChange={() => null}
            icon={<AdjustmentsVerticalIcon width={14} height={14} />}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-0">
            <div className="text-[10px] font-medium text-gray-500">
              Sort By :{' '}
            </div>
            <Select
              openMaxWidth
              openFromRight
              customClass="border-0 font-medium text-gray-700 space-x-2"
              items={sortedFieldItems}
              value={
                sortedFieldItems.filter((item) => {
                  return item.id === sortedField.id;
                })[0]
              }
              handleChange={(item: any) => setSortedField(item)}
            />
          </div>
        </div>
      </ControlPanel>
      <Card>
        <div className="space-y-2">
          <Table
            columns={columns}
            optionalColumns={optionalColumns}
            handleColumnChange={toggleColumnVisibility}
          >
            {data?.records?.map((user: any, index: number) => (
              <tr
                className={`group hover:bg-serene-50 ${
                  index + 1 !== data?.records?.length &&
                  'border-b border-b-gray-200'
                }`}
                key={user.id}
              >
                <td className="py-4 px-6">
                  {index + 1 + (currentPage - 1) * 5}
                </td>
                <td className="flex items-center py-4 px-6 whitespace-nowrap">
                  <Avatar
                    icon={<div>{user.name[0]}</div>}
                    src={user.img && API_BASE_URL + user.img}
                  />
                  <div className="pl-3">
                    <div>{user.name}</div>
                    <div className="text-gray-500 text-[11px]">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>{user.salesTeam?.name}</div>
                </td>
                <td className="py-4 px-6">
                  <div className='flex items-center space-x-1 flex-wrap'>
                    {user.leads?.map((lead: any) => (
                      <Badge key={lead.id} value={lead.name} color="orange" />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className='flex items-center space-x-1 flex-wrap'>
                    {user.opportunities?.map((opportunity: any) => (
                      <Badge key={opportunity.id} value={opportunity.name} color="purple" />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {user.archived ? (
                    <Badge value="Inactive" color="red" />
                  ) : (
                    <Badge value="Active" color="green" />
                  )}
                </td>
                <td />
              </tr>
            ))}
          </Table>
          <Paginator
            itemsPerPage={5}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </Container>
  );
}

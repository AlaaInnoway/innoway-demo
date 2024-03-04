/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import ControlPanel from '../../layout/ControlPanel';
import { SecondaryButton } from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Select from '../../components/form/Select';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { FilterRequest } from '../../interfaces/filter-request.interface';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import Dialog from '../../components/ui/Dialog';
import Toast from '../../components/ui/Toast';
import useFilterData from '../../hooks/useFetchData';
import API_BASE_URL from '../../config';
import Paginator from '../../components/ui/Paginator';
import { fetchCountData } from '../../services/filter.service';
import Table from '../../components/ui/Table';
import DropdownAction from '../../components/ui/DropdownAction';
import fetchDataByModel from '../../utils/fetch';
import { getAndUpdateDashboardItems } from '../../services/dashboard-items.service';
import useDisableFocus from '../../hooks/useDisableFocus';
import exportDataToFile from '../../utils/export';
import Dropdown from '../../components/ui/Dropdown';
import Badge from '../../components/ui/Badge';

export default function OrderList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', type: '' });
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  useDisableFocus(exportMenuRef, setOpenExportMenu);

  const [columns, setColumns] = useState<any[]>([
    {
      id: 'name',
      name: 'Reference',
      sequence: 1,
    },
    {
      id: 'contact',
      name: 'Contact',
      sequence: 2,
    },
    {
      id: 'opportunity',
      name: 'Opportunity',
      sequence: 3,
    },
    {
      id: 'totalAmount',
      name: 'Total Amount',
      sequence: 4,
    },
    {
      id: 'createdAt',
      name: 'Created Date',
      sequence: 5,
    },
    {
      id: 'user',
      name: 'Salesperson',
      sequence: 8,
    },
    {
      id: 'salesTeam',
      name: 'Sales Team',
      sequence: 9,
    },
    {
      id: 'stage',
      name: 'Stage',
      sequence: 10,
    },
  ]);
  const [optionalColumns, setOptionalColumns] = useState([
    {
      id: 'validityPeriod',
      name: 'Validity Period',
      sequence: 6,
    },
    {
      id: 'expiredAt',
      name: 'Expired Date',
      sequence: 7,
    },
  ]);
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

  const navigate = useNavigate();

  const breadcrumbs = [
    {
      name: 'Orders',
      path: '/sales/order',
    },
  ];

  const sortedFieldItems = [
    { id: 'id', name: 'Recent' },
    { id: 'name', name: 'Reference' },
    { id: 'opportunity.name', name: 'Opportunity' },
    { id: 'user.name', name: 'Salesperson' },
    { id: 'salesTeam', name: 'Sales Team' },
    { id: 'createdAt', name: 'Created Date' },
    { id: 'stage.sequence', name: 'Stage' },
  ];

  const [sortedField, setSortedField] = useState({ id: 'id', name: 'Recent' });

  // Sample data and pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const filterData: FilterRequest = {
    modelName: 'Order',
    filters: [],
    selectFields: [
      'id',
      'name',
      'organization.img',
      'organization.name',
      'individual.img',
      'individual.name',
      'opportunity.name',
      'totalAmount',
      'createdAt',
      'validityPeriod',
      'expiredAt',
      'user.img',
      'user.name',
      'salesTeam',
      'stage',
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
  const queryKey = 'filterData';

  // delete
  const { deleteRecord } = useDeleteRecord(queryKey);

  const handleDelete = async (id: number) => {
    const record = {
      modelName: 'order', // Replace with the desired model name
      id,
    };

    try {
      await deleteRecord(record);
      // await updateTotalItems();
      setOpenDialog(!openDialog);
      setOpenToast(!openToast);
      // Handle toast success or further actions
      setToastData({
        title: 'Sale Order have been deleted successfully',
        type: 'success',
      });
      // get dashboards by modelName & update them
      getAndUpdateDashboardItems('order');
    } catch (error) {
      // Handle error
    }
  };

  const [contacts, setContacts] = useState(new Array(0));
  const [opportunities, setOpportunities] = useState(new Array(0));
  const [users, setUsers] = useState(new Array(0));
  const [stages, setStages] = useState(new Array(0));

  useEffect(() => {
    // get organizations
    fetchDataByModel('organization', ['id', 'name', 'type']).then(
      (resultOrganizations) => {
        // get individuals
        fetchDataByModel('individual', ['id', 'name', 'type']).then(
          (resultIndividuals) => {
            setContacts([
              ...resultOrganizations.records,
              ...resultIndividuals.records,
            ]);
          }
        );
      }
    );
    // get opportunities
    fetchDataByModel('opportunity').then((result) => {
      setOpportunities(result?.records);
    });
    // get users
    fetchDataByModel('user', ['id', 'name', 'img', 'salesTeam']).then((result) => {
      setUsers(result?.records);
    });
    // get stages
    fetchDataByModel(
      'stage',
      ['id', 'name', 'children'],
      [
        {
          logicalOperator: 'AND',
          conditions: [
            {
              field: 'parentId',
              operator: 'equals',
              values: null,
            },
            {
              field: 'workflow.modelName',
              operator: 'equals',
              values: 'Order',
            },
          ],
        },
      ]
    ).then((result) => {
      setStages(result?.records);
    });
  }, []);

  const orderActionMenus = [
    {
      id: 1,
      name: 'View',
      icon: <EyeIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/sales/order/${id}`),
    },
    {
      id: 2,
      name: 'Edit',
      icon: <PencilSquareIcon width={16} height={16} />,
      handleClick: (id: number) => navigate(`/sales/order/${id}?edit=true`),
    },
    {
      id: 3,
      name: 'Remove',
      icon: <XMarkIcon width={16} height={16} />,
      handleClick: (id: number) => {
        setSelectedId(id);
        setOpenDialog(!openDialog);
      },
    },
  ];

  const exportRequest: FilterRequest = {
    modelName: 'Order',
    filters: [],
    selectFields: [
      'id',
      'name',
      'organization.name',
      'individual.name',
      'opportunity.name',
      'totalAmount',
      'createdAt',
      'validityPeriod',
      'expectedAt',
      'user.name',
      'salesTeam',
      'stage.name',
    ],
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
            items={contacts}
            value={{ id: 0, name: 'Contact' }}
            handleChange={() => null}
            hasAvatars
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={opportunities}
            value={{ id: 0, name: 'Opportunity' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={users}
            value={{ id: 0, name: 'Salesperson' }}
            handleChange={() => null}
            hasAvatars
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={stages}
            value={{ id: 0, name: 'Stage' }}
            handleChange={() => null}
          />
          <Select
            openMaxWidth
            customClass="bg-white space-x-2"
            items={[
              { id: 1, name: 'Sales Team' },
              { id: 2, name: 'Total Amount' },
              { id: 3, name: 'Created Date' },
              { id: 4, name: 'Expired Date' },
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
      {openToast && <Toast title={toastData.title} type={toastData.type} />}
      {openDialog && (
        <Dialog
          title="Confirmation"
          message="Are you really want to delete this sale order?"
          open={openDialog}
          discardButton="No"
          confirmButton="Yes"
          onDiscard={() => setOpenDialog(!openDialog)}
          onConfirm={() => handleDelete(selectedId)}
        />
      )}
      <Card>
        <div className="space-y-2">
          <Table
            columns={columns}
            optionalColumns={optionalColumns}
            handleColumnChange={toggleColumnVisibility}
          >
            {data?.records?.map((order: any, index: number) => (
              <tr
                className={`group hover:bg-serene-50 ${
                  index + 1 !== data?.records?.length &&
                  'border-b border-b-gray-200'
                }`}
                key={order.id}
              >
                <td className="py-4 px-6">
                  {index + 1 + (currentPage - 1) * 5}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>{order.name}</div>
                </td>
                {order.organization && (
                  <td className="flex items-center py-4 px-6">
                    <Avatar
                      icon={
                        <BuildingOfficeIcon className="text-serene-600" />
                      }
                      src={
                        order.organization.img &&
                        API_BASE_URL + order.organization.img
                      }
                    />
                    <div className="pl-3">{order.organization?.name}</div>
                  </td>
                )}
                {order.individual && (
                  <td className="flex items-center py-4 px-6">
                    <Avatar
                      icon={<div>{order.individual?.name[0]}</div>}
                      src={
                        order.individual.img &&
                        API_BASE_URL + order.individual.img
                      }
                    />
                    <div className="pl-3">{order.individual?.name}</div>
                  </td>
                )}
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>{order.opportunity?.name}</div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div>$ {order.totalAmount}</div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </td>
                {visibleColumns.includes('validityPeriod') && (
                  <td className="py-4 px-6">
                    <div>{order.validityPeriod} days</div>
                  </td>
                )}
                {visibleColumns.includes('expiredAt') && (
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div>
                      {order.expiredAt &&
                        new Date(order.expiredAt).toLocaleDateString()}
                    </div>
                  </td>
                )}
                <td className="py-4 px-6">
                  <Avatar
                    icon={<div>{order.user?.name[0]}</div>}
                    src={order.user.img && API_BASE_URL + order.user.img}
                    title={order.user?.name}
                  />
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {order.salesTeam}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <Badge
                    value={order.stage?.name}
                    color={order.stage?.color}
                  />
                </td>
                <td>
                  <DropdownAction
                    actionMenu={orderActionMenus}
                    recordId={order.id}
                  />
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
        </div>
      </Card>
    </Container>
  );
}

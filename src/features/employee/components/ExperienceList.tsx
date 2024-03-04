import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useItemList from '../../../hooks/useItemList';
import { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Paginator from '../../../components/ui/Paginator';
import { FilterRequest } from '../../../interfaces/filter-request.interface';
import useFilterData from '../../../hooks/useFetchData';
import { fetchCountData } from '../../../services/filter.service';
import { ExperienceItem, NewExperienceItem } from './ExperienceItem';

export default function ExperienceList(props: any) {
  const { employeeId, editable, config } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<any[]>([
    {
      id: 'company',
      name: 'Company',
      sequence: 1,
    },
    {
      id: 'jobTitle',
      name: 'Job Title',
      sequence: 2,
    },
    {
      id: 'startDate',
      name: 'Start Date',
      sequence: 3,
    },
    {
      id: 'endDate',
      name: 'End Date',
      sequence: 4,
    },
  ]);

  const modelName = 'Experience';

  const initialItem = {
    id: undefined,
    employee: {
      connect: {
        id: employeeId,
      },
    },
    company: '',
    jobTitle: {
      connect: {
        id: 0,
      },
    },
    startDate: undefined,
    endDate: undefined,
  };

  const filterData: FilterRequest = useMemo(() => {
    return {
      modelName,
      filters: [
        {
          logicalOperator: 'AND',
          conditions: [
            {
              field: 'employeeId',
              operator: 'equals',
              values: employeeId,
            },
          ],
        },
      ],
      selectFields: [
        'id',
        'company',
        'jobTitle.id',
        'jobTitle.name',
        'startDate',
        'endDate',
      ],
      sortField: 'id',
      sortOrder: 'asc',
      page: currentPage,
      perPage: 5,
      groupByField: undefined,
      groupByAggregates: [],
      aggregates: [],
    };
  }, [employeeId, currentPage]);
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

  const {
    newLineEnabled,
    editedItem,
    newItem,
    items,
    enableNewLine,
    handleItemFieldChange,
    handleItemSelectChange,
    handleEditedItemFieldChange,
    handleEditedItemSelectChange,
    handleSaveChanges,
    handleDiscardChanges,
    handleEditItem,
    handleSaveEditedItem,
    handleCancelEdit,
    handleDeleteItem,
  } = useItemList(modelName, data?.records, initialItem);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1>Experiences</h1>
        <IconButton
          disabled={editable || editedItem?.id}
          onClick={enableNewLine}
          customClass="group"
        >
          <PlusCircleIcon
            width={16}
            height={16}
            className="stroke-serene-500 group-hover:stroke-gray-900"
          />
          <span className="text-xs text-serene-500 group-hover:text-gray-900">
            Add experience
          </span>
        </IconButton>
      </div>
      <Table
        columns={columns}
        optionalColumns={[]}
        handleColumnChange={() => null}
      >
        {newLineEnabled && (
          <NewExperienceItem
            newItem={newItem}
            editable={editable}
            config={config}
            onChangeField={handleItemFieldChange}
            onChangeSelect={handleItemSelectChange}
            onSave={handleSaveChanges}
            onDiscard={handleDiscardChanges}
          />
        )}
        {items?.map((item: any, index: number) => (
          <ExperienceItem
            key={item.id}
            index={index + 1 + (currentPage - 1) * 5}
            item={item}
            editedItem={editedItem}
            count={totalItems}
            editable={editable || newLineEnabled}
            config={config}
            onEdit={handleEditItem}
            onSaveEdit={handleSaveEditedItem}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDeleteItem}
            onChangeField={handleEditedItemFieldChange}
            onChangeSelect={handleEditedItemSelectChange}
          />
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
